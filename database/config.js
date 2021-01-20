const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log('db connectedddd');
    } catch (error) {
        console.log(error);
        throw new Error('Error initializing db');
    }
};

module.exports = dbConnection;
