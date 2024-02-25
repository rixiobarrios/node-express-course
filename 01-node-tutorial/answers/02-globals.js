// 02-globals.js: This program should use the console.log function to write some globals to the screen. Set an environment variable with the following command in your command line terminal: export MY_VAR="Hi there!" The program should then use console.log to print out the values of __dirname (a Node global variable) and process.env.MY_VAR (process is also a global, and contains the environment variables you set in your terminal.) You could print out other globals as well (Node documentation on available globals). For each of these programs, you invoke them with node to make sure they work.

// Was not able to set environment variable on command line. Got the following error:

// $ export MY_VAR="Hi there!"
// bash: !": event not found

// The error message bash: !": event not found means that the shell
//  is trying to interpret the exclamation point (!) as a history expansion, but there is no history event with the name ".

// Took the exclamation point out and it worked
// $ export MY_VAR="Hi there"

// Printing out the value of __dirname
console.log('__dirname:', __dirname);

// Printing out the value of process.env.MY_VAR
console.log('process.env.MY_VAR:', process.env.MY_VAR);

// Printing out other global variables
console.log('Node.js version:', process.version);
console.log('Node.js platform:', process.platform);
console.log('Process ID:', process.pid);
console.log('Execution path:', process.execPath);
