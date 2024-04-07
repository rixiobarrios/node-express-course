const Task = require('../models/task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

// const getAllTasks = (req, res) => {
//     res.send('get all tasks');
// };

// const getAllTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find({});
//         // res.status(200).json({ tasks: tasks });
//         // res.status(200).json({ task });
//         // res.status(200).json({ task, amount: tasks.length });
//         // res.status(200).json({ success: true });
//         // res.status(200).json({ success: true, data: { nbHits: tasks.length } });
//         res.status(200).json({
//             status: 'success',
//             data: { nbHits: tasks.length },
//         });
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     }
// };

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
});

// const createTask = (req, res) => {
//     res.send('create task');
// };

// const createTask = (req, res) => {
//     res.json(req.body);
// };

// const createTask = async (req, res) => {
//     const task = await Task.create(req.body);
//     res.status(201).json({ task });
// };

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

// const getTask = (req, res) => {
//     res.send('get task');
// };

// const getTask = (req, res) => {
//     res.json({ id: req.params.id });
// };

// const getTask = async (req, res) => {
//     try {
//         const { id: taskID } = req.params;
//         const task = await Task.findOne({ _id: taskID });
//         if (!task) {
//             return res.status(404).json({ msg: `No task with id: ${taskID}` });
//         }
//         res.status(200).json({ task });
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     }
// };

// const getTask = async (req, res) => {
//     try {
//         const { id: taskID } = req.params;
//         const task = await Task.findOne({ _id: taskID });
//         if (!task) {
//             const error = new Error('Not Found');
//             error.status = 404;
//             return next(error);
//         }
//         res.status(200).json({ task });
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     }
// };

// const getTask = asyncWrapper(async (req, res) => {
//     try {
//         const { id: taskID } = req.params;
//         const task = await Task.findOne({ _id: taskID });
//         if (!task) {
//             return next(createCustomError(`No task with id: ${taskID}`, 404));
//         }
//         res.status(200).json({ task });
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     }
// });

const getTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
        return next(createCustomError(`No task with id: ${taskID}`, 404));
    }
    res.status(200).json({ task });
});

// const updateTask = (req, res) => {
//     res.send('update task');
// };

// const updateTask = (req, res) => {
//     try {
//         const { id: taskID } = req.params;
//         res.status(200).json({ id: taskID, data: req.body });
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     }
// };

const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            // return res.status(404).json({ msg: `No task with id: ${taskID}` });
            return next(createCustomError(`No task with id: ${taskID}`, 404));
        }
        res.status(200).send({ task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

// const deleteTask = (req, res) => {
//     res.send('delete task');
// };

const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndDelete({ _id: taskID });
        if (!task) {
            // return res.status(404).json({ msg: `No task with id: ${taskID}` });
            return next(createCustomError(`No task with id: ${taskID}`, 404));
        }
        // res.status(200).json({ task });
        // res.status(200).send();
        res.status(200).send({ task: null, status: 'success' });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

// const editTask = async (req, res) => {
//     try {
//         const { id: taskID } = req.params;
//         const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
//             new: true,
//             runValidators: true,
//             overwrite: true,
//         });
//         if (!task) {
//             return res.status(404).json({ msg: `No task with id: ${taskID}` });
//         }
//         res.status(200).send({ task });
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     }
// };

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    // editTask,
};
