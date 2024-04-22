const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');
// const CustomAPIError = require('../errors/custom-error');

const authenticationMiddleware = async (req, res, next) => {
    // console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('no token found');
        // throw new CustomAPIError('no token found', 401);
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, username } = decoded;
        req.user = { id, username };
        next();
    } catch (error) {
        throw new UnauthenticatedError('not authorized to access this route');
        // throw new CustomAPIError('not authorized to access this route', 401);
    }

    // next();
};

module.exports = authenticationMiddleware;
