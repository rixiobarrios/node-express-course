// check username, password in post(login) request
// if exist create JWT (json web tokens)
// send back to front-end

// setup authentication so only the request with JWT can access the dashboard
const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors');

// const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
    const { username, password } = req.body;
    // check in the controller
    if (!username || !password) {
        throw new BadRequestError('please provide username and password');
        // throw new CustomAPIError('please provide username and password', 400);
    }

    // just for demo, normally provided by database
    const id = new Date().getDate();

    // try to keep payload small, better experience for user
    // just for demo, in production use logn, complex and unguessable string value
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    res.status(200).json({ msg: 'user created', token });

    // console.log(username, password);
    // res.send('Fake Login/Register/Signup Route');
};

const dashboard = async (req, res) => {
    // console.log(req.user);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
        msg: `Hello, ${req.user.username}`,
        // msg: `Hello, ${decoded.username}`,
        secret: `Here is your authorized data, your lucky number in ${luckyNumber}`,
    });
    // // console.log(req.headers);
    // const authHeader = req.headers.authorization;
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //     throw new CustomAPIError('no token found', 401);
    // }
    // const token = authHeader.split(' ')[1];
    // // console.log(token);
    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     // console.log(decoded);
    //     const luckyNumber = Math.floor(Math.random() * 100);
    //     res.status(200).json({
    //         msg: `Hello, ${decoded.username}`,
    //         secret: `Here is your authorized data, your lucky number in ${luckyNumber}`,
    //     });
    // } catch (error) {
    //     throw new CustomAPIError('not authorized to access this route', 401);
    // }
    // const luckyNumber = Math.floor(Math.random() * 100);
    // res.status(200).json({
    //     msg: `Hello, Jane Doe`,
    //     secret: `Here is your authorized data, your lucky number in ${luckyNumber}`
    // });
};

module.exports = {
    login,
    dashboard,
};
