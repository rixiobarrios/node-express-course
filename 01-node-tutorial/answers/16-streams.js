// 6. Now, change back to the answers directory, and write a program called 16-streams.js. It should create a read stream for the big file (../content/big.txt) with encoding of "utf8" and a highWaterMark of 200. The highWaterMark is the maximum amount of bytes that node will read with each chunk of the stream. The program should initialize a counter to 0. Then it should handle the “data” event for the stream by incrementing the counter and logging the event result to the screen. Then it should handle the “end” event by reporting the number of chunks received. Finally, it should handle the stream “error” event by logging the error to the console. Test the program for several values of highWaterMark. You can look at 01-node-tutorial/16-streams.js file to help you as needed.

const fs = require('fs');

// Specify the file path and options for the stream
const filePath = '../content/big.txt';
const options = {
    encoding: 'utf8',
    highWaterMark: 200, // This is the maximum amount of bytes that Node.js will read with each chunk of the stream
};

// Create a read stream with the specified options
const readStream = fs.createReadStream(filePath, options);

// Initialize a counter to keep track of the number of chunks received
let counter = 0;

// Handle the "data" event for the stream
readStream.on('data', (chunk) => {
    counter++;
    console.log(`Received chunk ${counter}:`, chunk);
});

// Handle the "end" event for the stream
readStream.on('end', () => {
    console.log(`Finished reading the file. Total chunks received: ${counter}`);
});

// Handle the "error" event for the stream
readStream.on('error', (error) => {
    console.error('An error occurred:', error);
});
