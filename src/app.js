const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

app.use('/', express.static(path.join(__dirname, 'public')));

const server = app.listen(port, () => {
  console.log(`Site online on port ${port}`);
});

module.exports = { app, server };