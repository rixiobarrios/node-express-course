// (3b). 05-utils.js should export a single value, which is a function you will call in 03-modules.js.

function greeting(name) {
    console.log('How do you do ' + name + '?');
}

module.exports = greeting;
