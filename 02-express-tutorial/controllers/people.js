// The refactoring is not yet done. You need to create the file controllers/people.js. That should start with a require statement that gets the people array from ../data.js.
const { people } = require('../data');

// Then create functions addPerson and getPeople. These are each passed req and res. Copy the logic from your router/people.js file, for both the GET and the POST.
const addPerson = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res
            .status(400)
            .json({ success: false, message: 'please provide name value' });
    }
    res.status(201).send({ success: true, person: name });
};

const getPeople = (req, res) => {
    res.status(200).json({ success: true, data: people });
};

// Then move the logic for the statement to controllers/people.js, and update the module.exports statement in that file, as well as the require statement in the routes/people.js, so that the route calls the controller function you create.

// Add a router.put statement to routes/people.js to update the people entry if it is found, and to return an error if it isn’t.
const updatePerson = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const person = people.find((person) => person.id === Number(id));

    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `no person with id ${id}` });
    }
    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name;
        }
        return person;
    });
    res.status(200).json({ success: true, data: newPeople });
};

// Do a router.delete statement as well. Test these using Postman.
const deletePerson = (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id));
    if (!person) {
        return res.status(404).json({
            success: false,
            msg: `no person with id ${req.params.id}`,
        });
    }
    // For the delete, you might use Array.filter() to create the updated people array.
    const newPeople = people.filter(
        (person) => person.id !== Number(req.params.id)
    );
    return res.status(200).json({ success: true, data: newPeople });
};

// Then export { addPerson, getPeople }.
module.exports = { getPeople, addPerson, updatePerson, deletePerson };
