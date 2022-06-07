const { EventEmitter } = require('events'); // Call events module

const birthdayEventListener = ({name}) => {
  console.log(`Happy birthday ${name}!`);
}

const myEventEmitter = new EventEmitter(); // Create objek from event emitter

myEventEmitter.on('birthday', birthdayEventListener); // Make birthdayEventListener alive

myEventEmitter.emit('birthday', { // Trigger the birthday event to be executed
  name: 'Ilma',
});