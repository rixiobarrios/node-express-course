const CustomAPIError = require('./custom-error');
const { StatusCodes } = require('http-status-codes');

class BadRequest extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = BadRequest;

// class CustomAPIError extends Error {
//     constructor(message, statusCode) {
//         super(message);
//     }
// }

// module.exports = CustomAPIError;
