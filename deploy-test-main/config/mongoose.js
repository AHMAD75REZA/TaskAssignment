const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/deploy_Test_development').then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});
// const env = require('./environment');
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error conneting to MongoDB"));

db.once('open', function () {
    console.log('conneted to database:: MongoDB');
});

module.exports = db;