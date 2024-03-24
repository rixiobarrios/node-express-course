const mongoose = require('mongoose');

// const connectionString = 'mongodb provided string has been pasted into .env'

// mongoose
//     .connect(connectionString, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true,
//     })
//     .then(() => console.log('connected to the db...'))
//     .catch((err) => console.log(err));

// mongoose
//     .connect(connectionString)
//     .then(() => console.log('connected to the db...'))
//     .catch((err) => console.log(err));

// const connectDB = (url) => {
//     return mongoose.connect(url);
// };

function connectDB(url) {
    return mongoose.connect(url);
}

module.exports = connectDB;
