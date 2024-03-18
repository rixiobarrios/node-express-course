// The next step is refactoring. You do not want too much logic in the app.js file. Create directories called routes and controllers. Create a file called routes/people.js. It should start with the following statements:
const express = require('express');
const router = express.Router();

// Then require them in your routes/people.js, as follows:
const {
    addPerson,
    getPeople,
    updatePerson,
    deletePerson,
} = require('../controllers/people');
const { createPerson } = require('../final/15-router-controller');

// Moved from app.js and went two folders up to data
// const { people } = require('../data');

// You then need to add a router.get() statement for the "/" path. This should do the same thing as your app.get("/api/v1/people") statement.
// router.get('/', (req, res) => {
//     console.log(req.body);
//     res.status(200).json({ success: true, data: people });
// });

// Add a router.get statement to routes/people.js. This is to get a particular entry from the people array. You need an id parameter, so the path should have /:id.
router.get('/:id', getPersonById);

function getPersonById(req, res) {
    // You can use Array.find(), but req.params.id will be a string, so you”ll have to convert it to an integer first.
    const id = parseInt(req.params.id);
    const person = people.find((p) => p.id === id);
    // If the entry is not found, return an error 404 with JSON that has an appropriate message.
    if (!person) {
        return res
            .status(404)
            .json({ success: false, message: 'Person not found' });
    }
    // Then write code so that, if the array includes a people entry with a matching id, a JSON object with that entry is returned (return code 200).
    res.status(200).json({ success: true, data: person });
}

// Similarly, you need a router.post() statement for "/".
// router.post('/', (req, res) => {
//     const { name } = req.body;
//     if (!name) {
//         return res
//             .status(400)
//             .json({ success: false, message: 'please provide name value' });
//     }
//     res.status(201).json({ success: true, person: name });
// });

router.get('/', getPeople);
router.post('/', addPerson);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);

// Finally, at the bottom, you need module.exports = router.
module.exports = router;
