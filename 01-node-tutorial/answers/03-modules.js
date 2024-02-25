// For the next part, you will write multiple programs. 04-names.js, 05-utils.js, 06-alternative-flavor.js, and 07-mind-grenade.js are modules that you load, using require statements, from the 03-modules.js file, which is the main program. Remember that you must give the path name in your require statement, for example:
// const names = require("./04-names.js");

const names = require('./04-names');
const greeting = require('./05-utils');
const data = require('./06-alternative-flavor');
// no need to set a variable since we only need to run the file
require('./07-mind-grenade');

console.log(data);

console.log(names);

greeting('dana');
greeting(names.sarah);
greeting(names.courtney);
// bill will be undefined since its local to the 04-names.js file
greeting(names.bill);
