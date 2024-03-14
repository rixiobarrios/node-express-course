// 1. Create a program named writeWithPromisesAwait.js inside the 01-node-tutorial/answers folder. We are going to use the fs.promises package. fs is the built-in “File system” set of functions in Node. By adding .promises we’re going to access the versions of those built-in functions that return a Promise as their result. You’d start with the following code:

// const { writeFile, readFile } = require('fs').promises;

const { writeFile, readFile } = require('fs').promises;

// Then create an async function called writer that takes 0 arguments, and that writes three lines to a file named temp.txt, by calling the writeFile function with await. The Promise version of writeFile takes the same arguments as the one you used in last week’s exercise 10-fs-sync but will return a Promise instead of a result directly.

async function writer() {
    // Put the await statements inside a try/catch block!
    try {
        await writeFile('../content/temp.txt', 'Line 1\nLine 2\nLine 3\n');
        console.log('File written successfully');
    } catch (error) {
        console.error('Error writing file:', error);
    }
}

// Create another async function called reader that reads the file with await readFile and logs the return value to the screen.

async function reader() {
    try {
        const data = await readFile('../content/temp.txt', 'utf8');
        console.log('File contents:', data);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

// Now we want to call the two functions in order, first the writer, and the reader. But, be careful! These are asynchronous functions, so if you just call them, you don’t know what order they’ll occur in. And you can’t use await in your mainline code. So, you write a third async function called readWrite. In that function, you call await reader and await writer. Finally, write a line at the bottom of the file that calls the readWrite function. Test your code. The temp.txt file that your code is creating should not be sent to Github, so you should add this filename as another line to your .gitignore.

async function readWrite() {
    await writer();
    await reader();
}

readWrite();
