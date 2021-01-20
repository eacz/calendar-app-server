const express = require('express');
const cors = require('cors');
const dbConnection = require('./database/config');
require('dotenv').config();

const app = express();
//connect db
dbConnection();
//enable cors
app.use(cors());

app.use(express.json());
app.use(express.static('public'));
//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events',  require('./routes/events'));

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`runingggg on port ${port}`);
});
