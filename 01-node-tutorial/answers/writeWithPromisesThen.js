// 2. Write another program called writeWithPromisesThen.js also in the 01-node-tutorial/answers folder. Again you write to temp.txt. You start it the same way, but this time, you use the .then style of asynchronous programming. You don’t need to create any functions. Instead, you just use cascading .then statements in your mainline, like this:

//  writeFile(...) // write line 1
//  .then(() => {
//     return writeFile(...)  // write line 2.
//     // Return the promise so you can chain the .then statements
//  })
//  .then // write the third line, and follow that with two more .then blocks,
//  // one to call readFile to read it back out, and one to log the data to the screen.
//  ...
//  .catch((error) => {
//      console.log("An error occurred: ", error)
//  })

// Test your code by running node writeWithPromisesThen.js. You may want to sprinkle console.log statements in your code so that you understand the order of execution.

const { writeFile, appendFile, readFile } = require('fs').promises;

// Write the first line to temp.txt
writeFile('../content/temp.txt', '\nLine 1\n')
    .then(() => {
        console.log('Line 1 written');
        // Write the second line
        return appendFile('../content/temp.txt', 'Line 2\n');
    })
    .then(() => {
        console.log('Line 2 written');
        // Write the third line
        return appendFile('../content/temp.txt', 'Line 3\n');
    })
    .then(() => {
        console.log('Line 3 written');
        // Read the file
        return readFile('../content/temp.txt', 'utf8');
    })
    .then((data) => {
        console.log('File contents:', data);
    })
    .catch((error) => {
        console.error('An error occurred: ', error);
    });
