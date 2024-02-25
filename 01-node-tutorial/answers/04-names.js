// (3a). 04-names.js should export multiple values in an object that you will require in 03-module.js.

// local
const bill = 'bill';
// share
const sarah = 'sarah';
const courtney = 'courtney';

// console.log(module);

// not exporting bill
module.exports = { sarah, courtney };
