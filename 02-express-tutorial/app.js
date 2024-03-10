// Edit app.js to add all the elements of an Express application as listed above, in the right order.

// The basic elements of an Express.js program are as follows:

// The require statement to import the express module
const express = require('express');

// Next, we want to return some data. We haven’t learned how to access a database from Express yet, so the instructor has provided data to use. It is in data.js, so have a look at that file. Then add the following require statement to the top of the program:
const { products } = require('./data');

// Creation of the app as returned from calling express()
const app = express();

// app.use statements for the middleware. You’ll eventually use many kinds of middleware, but for now the only middleware we are using is express.static().

// You should have the statement app.use(express.static("./public")) so that your HTML file will load.
app.use(express.static('./public'));

// app.get and app.post statements for the routes you will handle. Eventually these will be refactored into router modules, but for now you can put them inline.

// Next, you need to provide a way to retrieve a particular product by ID. This is done by having an app.get statement for the url /api/v1/products/:productID. The colon in this url means that :productID is a parameter. So, when your server receives the GET request for a URL like /api/v1/products/7, req.params will have the hash { productID: 7 }. Try this out by creating the app.get statement and doing a res.json(req.params) to return the path parameter in the HTTP response itself.
// Of course, the API should actually return, in JSON form, the product that has an ID of 7. So you need to find that product in the array. For that, you use the .find function of the array:
app.get('/api/v1/products/:productID', (req, res) => {
    const idToFind = parseInt(req.params.productID);
    const product = products.find((p) => p.id === idToFind);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'That product was not found.' });
    }
});

// For the next part, you will implement APIs that return JSON. Because you are using the browser to display the JSON, you may want to add a JSON formatter plugin into your browser (here’s one for Chrome, for example), so that it’s easier to view. Add an app.get statement to app.js. It should be after the Express static middleware, but before the “not found” handler. It should be for the URL /api/v1/test. It should return JSON using the following code:
app.get('/api/v1/test', (req, res) => {
    res.json({ message: 'It worked!' });
});

// The value of the products variable is an array of objects from
// data.js, which are various items of furniture. We now want to
// return this array. So add an app.get statement for the url
// /api/v1/products. Write some code to return JSON for the products
// array. Test the url with your browser.
app.get('/api/v1/products', (req, res) => {
    res.json(products);
});

// The user may also want to do a simple search, instead of getting all the products. In this case, the url would contain a query string, like: /api/v1/query?search=al&limit=5.
// What this means, in this case, is that the user wants to see all products where the name starts with “al”, but the user wants to see no more than 5 products. When the app.get for /api/v1/query path is called, req.query is a hash that may contain values for “search” or “limit” or both or neither, depending on what the user puts in the query string. Again, there are array methods you can use to find that list. They are Array.filter() and Array.slice(). Add a new app.get statement for /api/v1/query, and include logic to handle these query strings. Then test it out.
app.get('/api/v1/query', (req, res) => {
    const search = req.query.search;
    const limit = parseInt(req.query.limit) || products.length;
    // Add some more logic: you choose! For example, the user might want to send a regular expression instead of search for starting letters. Or the user may only want products that cost less than 20.00.
    const maxPrice = parseFloat(req.query.maxPrice) || Infinity;
    const filteredProducts = products
        .filter(
            (p) =>
                p.name.toLowerCase().startsWith(search.toLowerCase()) &&
                p.price <= maxPrice
        )
        .slice(0, limit);
    res.json(filteredProducts);
});

// An app.all statement after these to handle page not found conditions.
app.all('*', () => {
    res.status(404).send('<h1>resource not found</h1>');
});

// An app.listen statement to tell the server to listen for requests on a particular port.
// Use port 3000 in the listen statement.
app.listen(3000, () => {
    console.log('server is listening on port 3000...');
});
