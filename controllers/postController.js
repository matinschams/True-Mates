const { Post } = require('../models');
const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const path = require('path');
const getTimeDifference = require('../middlewares/calculateTime');
require('dotenv').config();

const upload = multer({
  dest: 'uploads/',
  limits: { files: 5 },
});

const storage = new Storage({
  keyFilename: path.join(__dirname, '../config/service-account.json'),
  projectId: process.env.GCP_PROJECT_ID,
});
const bucket = storage.bucket(process.env.GCP_BUCKET_NAME);

module.exports = {
  createPost: async (req, res, next) => {
    try {
      upload.array('photos', 5)(req, res, async err => {
        if (err) {
          return res.status(400).json({ error: 'Upload Failed' });
        }

        const { description } = req.body;
        const photos = [];

        for (const file of req.files) {
          const blob = bucket.file(file.originalname);
          const blobStream = blob.createWriteStream();

          blobStream.on('error', err => {
            return res.status(500).json({ message: err.message });
          });

          await new Promise((resolve, reject) => {
            blobStream.on('finish', () => {
              const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
              photos.push(publicUrl);
              resolve();
            });
            blobStream.end(file.buffer);
          });
        }

        const post = await Post.create({
          description,
          photos,
          userId: req.user.id,
        });
        res.status(201).json(post);
      });
    } catch (error) {
      return next({
        log: `Error found in postController.createPost ${error}`,
        status: 500,
        message: { err: 'An error occurred' },
      });
    }
  },

  editPost: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ error: 'Post does not exist' });
      }
      if (post.userId !== req.user.id) {
        return res
          .status(403)
          .json({ error: 'Editing can only be done on your own posts' });
      }
      post.description = description;
      await post.save();
      res.json(post);
    } catch (error) {
      return next({
        log: `Error found in postController.editPost ${error}`,
        status: 500,
        message: { err: 'An error occurred' },
      });
    }
  },

  getPosts: async (req, res, next) => {
    try {
      const posts = await Post.findAll();
      const postsWithTimeDiff = posts.map(post => {
        const timeDiff = getTimeDifference(post.createdAt);
        return { ...post.toJSON(), timeDiff };
      });
      res.json(postsWithTimeDiff);
    } catch (error) {
      return next({
        log: `Error found in postController.getPosts ${error}`,
        status: 500,
        message: { err: 'An error occurred' },
      });
    }
  },
};
