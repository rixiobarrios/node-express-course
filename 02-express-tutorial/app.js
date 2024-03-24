const express = require('express');

// You now need to add a require statement in the app.js file, to import the peopleRouter code.
const peopleRouter = require('./routes/people');

const app = express();

// Moved it to './routes/people.js'
// const { people } = require('./data');

// Static assets
app.use(express.static('./methods-public'));

// You need to add middleware to parse this body into a Javascript object.
app.use(express.urlencoded({ extended: false }));
// parse json data
app.use(express.json());

// Then you need the following app.use() statement, also in app.js:
app.use('/api/people', peopleRouter);
// Be careful that this app.use statement comes after the parsing of the body, or stuff won’t work as expected.

// First, create a middleware function called logger in app.js. A middleware function is passed req and res as its first two parameters, just like an app.get call, but it is also passed a third parameter, next.
function logger(req, res, next) {
    const method = req.method;
    const url = req.url;
    const time = new Date().toLocaleTimeString();
    // The middleware function you create should log the method and url properties from the req object, as well as the current time, before calling next().
    console.log(method, url, time);
    // The next() function must be called once middleware processing is completed, otherwise no response is sent back for the request.
    next();
}

app.get('/', logger, (req, res) => {
    res.send('Home');
});

// Next, you need to implement some APIs for people. You have a require statement for ./data.js that gets the value of products. Get the value for people, also from ./data.js (add this in the same require statement).
// app.get('/api/people', (req, res) => {
//     console.log(req.body);
//     res.status(200).json({ success: true, data: people });
// });
// Then comment out your app.get and app.post statements for /api/v1/people.

// You now need to implement an app.post for /api/v1/people. This is to add an entry to the people array. Post operations are sent from the browser with a “request body”.
// Now you implement the app.post statement for /api/v1/people.
// app.post('/api/people', (req, res) => {
//     const { name } = req.body;
//     if (!name) {
//         return res
//             .status(400)
//             .json({ success: false, message: 'please provide name value' });
//     }
//     res.status(201).json({ success: true, person: name });
// });

app.post('/login', (req, res) => {
    const { name } = req.body;
    console.log(req.body);
    // The statement should check req.body to see if there is a req.body.name property.
    if (name) {
        return res.status(200).send(`Welcome ${name}`);
    }
    // If not, it should return JSON for an error, as follows:
    res.status(400).json({ success: false, message: 'please provide a name' });
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000...');
});
