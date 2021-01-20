//   /api/auth

const express = require("express");
const dbConnection = require("./database/config");
require('dotenv').config()

const app = express();
app.use(express.json())
//connect db
dbConnection()

app.use(express.static('public'))
//routes
app.use('/api/auth', require('./routes/auth'))

const port = process.env.PORT 
app.listen(port, () => {
  console.log(`runingggg on port ${port}`);
});