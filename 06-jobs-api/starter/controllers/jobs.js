const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req, res) => {
    // res.send('get all jobs');
    const jobs = await Job.find({ createdBy: req.user.userId }).sort(
        'createdAt'
    );
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
    // res.send('get job');
    // nested destructuring
    const {
        user: { userId },
        params: { id: jobId },
    } = req;

    const job = await Job.findOne({ _id: jobId, createdBy: userId });
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    // res.send('create job');
    // res.json(req.user);
    // res.json(req.body);
    res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
    // res.send('update job');
    const {
        body: { company, position },
        user: { userId },
        params: { id: jobId },
    } = req;
    if (company === '' || position === '') {
        throw new BadRequestError('company and/or position cannot be empty');
    }
    const job = await Job.findByIdAndUpdate(
        { _id: jobId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
    );
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
    // res.send('delete job');
    const {
        user: { userId },
        params: { id: jobId },
    } = req;

    const job = await Job.findByIdAndRemove({ _id: jobId, createdBy: userId });
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }
    // Note: There is an error in the implementation of the delete operation in the jobs controller. The instructor’s guidance is to use this line:
    // res.status(StatusCodes.OK).send();

    // This is incorrect, because an empty body is not valid JSON. Change it to:
    res.status(StatusCodes.OK).json({ msg: 'The entry was deleted.' });
};

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
};
