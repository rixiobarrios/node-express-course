const mongoose = require('mongoose');

// useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options. Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false. Please remove these options from your code.
// const connectDB = (url) => {
//     return mongoose.connect(url, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true,
//     });
// };

const connectDB = (url) => {
    return mongoose.connect(url);
};

module.exports = connectDB;
