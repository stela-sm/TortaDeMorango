const express = require('express');
const app = express()
const port = 8000
const path = require("path");



app.use('/', express.static('src/public'));

app.listen(port, () => {
  console.log(`Site online on port ${port}`)
})