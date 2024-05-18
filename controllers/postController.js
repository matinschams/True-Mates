const { Post } = require('../models');
const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const path = require('path');
require('dotenv').config();

const storage = new Storage({
  keyFilename: path.join(__dirname, '../config/service-account.json'),
  projectId: process.env.GCP_PROJECT_ID,
});
const bucket = storage.bucket(process.env.GCP_BUCKET_NAME);

module.exports = {
  createPost: async (req, res, next) => {
    try {
      upload.single('photo')(req, res, async err => {
        if (err) {
          return res.status(400).json({ error: 'Failed to upload photo' });
        }
        const { description } = req.body;
        const { file } = req;
        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream();

        blobStream.on('error', err => {
          res.status(500).json({ message: err.message });
        });

        blobStream.on('finish', async () => {
          try {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            const post = await Post.create({
              description,
              photo: publicUrl,
              userId: req.user.id,
            });
            res.status(201).json(post);
          } catch (error) {
            res.status(500).json({ error: 'Failed to create post' });
          }
        });

        blobStream.end(file.buffer);
      });
    } catch (error) {
      return next({
        log: `Error found in postController.createPost ${error}`,
        status: 500,
        message: { err: 'An error occurred' },
      });
    }
  },
};
