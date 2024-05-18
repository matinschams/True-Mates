const express = require('express');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
