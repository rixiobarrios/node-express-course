const { CustomAPIError } = require('../errors/custom-error.js');

// const errorHandlerMiddleware = (err, re, res, next) => {
//     console.log(err);
//     // return res
//     //     .status(500)
//     //     .json({ msg: 'something went wrong, try again later' });
//     return res.status(err.status).json({ msg: error.message });
// };

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    return res
        .status(500)
        .json({ msg: 'something went wrong, try again later' });
};

module.exports = errorHandlerMiddleware;
