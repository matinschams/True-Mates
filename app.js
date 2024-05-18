const express = require('express');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);

app.use((err, req, res, next) => {
  const globalError = {
    log: 'Global Error Found',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, globalError, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
