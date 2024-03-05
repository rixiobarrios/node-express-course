// 4. Write a program named customEmitter.js in the 01-node-tutorial/answers folder. In it, create one or several emitters. Then use the emitter .on function to handle the events you will emit, logging the parameters to the screen. Then use the emitter .emit function to emit several events, with one or several parameters, and make sure that the events are logged by your event handlers. This is your chance to be creative! You could have an event handler that emits a different event to be picked up by a different handler, for example. Here’s a couple tricks to try. You can trigger events with a timer, as follows:

// const EventEmitter = require("events");
// const emitter = new EventEmitter();
// setInterval(() => {
//   emitter.emit("timer", "hi there");
// }, 2000);
// emitter.on("timer", (msg) => console.log(msg));

// Or, you could make an async function that waits on an event:

// const EventEmitter = require("events");
// const emitter = new EventEmitter();
// const waitForEvent = () => {
//   return new Promise((resolve) => {
//     emitter.on("happens", (msg) => resolve(msg));
//   });
// };
// const doWait = async () => {
//   const msg = await waitForEvent();
//   console.log("We got an event! Here it is: ", msg);
// };
// doWait();
// emitter.emit("happens", "Hello World!");

// (Don’t worry if that last one looks a bit complicated. That’s expected as we haven’t talked about creating promises yet.)

const EventEmitter = require('events');
const emitter = new EventEmitter();

setInterval(() => {
    emitter.emit('timer', 'ON');
}, 2000);

emitter.on('timer', (msg) => console.log(msg));

emitter.once('timer', () => {
    console.log('OFF');
});
