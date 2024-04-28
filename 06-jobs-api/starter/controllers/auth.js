const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
// const { BadRequestError } = require('../errors');
const { BadRequestError, UnauthenticatedError } = require('../errors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    // const { name, email, password } = req.body;
    // if (!name || !email || !password) {
    //     throw new BadRequestError('provide name, email and password');
    // }
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // const tempUser = { name, email, password: hashedPassword };

    const user = await User.create({ ...req.body });
    // const user = await User.create({ ...tempUser });
    // const token = jwt.sign({ userId: user._id, name: user.name }, 'jwtSecret', {
    //     expiresIn: '30d',
    // });

    const token = user.createJWT();
    // res.send('register user');
    // res.json(req.body);
    // res.status(StatusCodes.CREATED).json(req.body);
    // res.status(StatusCodes.CREATED).json({ user });
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
    // res.status(StatusCodes.CREATED).json({
    //     user: { name: user.getName() },
    //     token,
    // });
};

const login = async (req, res) => {
    // res.send('login user');
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('provide email and password');
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError('invalid credentials');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('invalid credentials');
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
    register,
    login,
};
