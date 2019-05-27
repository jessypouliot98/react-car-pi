const GPIORotaryEncoder = require('./rotary').GPIORotaryEncoder;

const RE = new GPIORotaryEncoder().EE;

RE.on('Press', (bool) => console.log('Pressed: ' + bool));
RE.on('Rotate', (side) => console.log( 'Rotated: ' + (side ? 'Right' : 'Left') ));
