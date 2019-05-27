/**
* Dependencies
*/

//GPIO constrols
const Gpio = require('onoff').Gpio;
//Event Emitter
const EventEmitter = require('events').EventEmitter;

class GPIORotaryEncoder {
  constructor(pins = { clk: 16, dt: 20, sw: 21 }){
    //Rotary Encoder Rotation signals
    this.PCLK = new Gpio(pins.clk, 'in', 'both');
    this.PDT = new Gpio(pins.dt, 'in', 'both');
    //Rotary Encode Press Signal
    this.PSW = new Gpio(pins.sw, 'in', 'both');
    //Event Emitter
    this.EE = new EventEmitter();

    this.rTick = 0;
    this.rLastState = this.PCLK.readSync();

    this.initListeners();
  }

  initListeners = () => {
    //RotaryEncoder Rotation Event
    this.PCLK.watch(() => {
      this.rotaryPulse();
    });
    //RotaryEncoder Press Event
    this.PSW.watch((err, value) => {
      if(value === 0){
        this.rotaryPress();
      } else {
        this.rotatyRelease();
      }
    });

  }

  //Rotation Input
  rotaryPulse = () => {
    this.rTick++;

    this.rState = this.PCLK.readSync();

    if(this.rState !== this.rLastState){
      if(this.PDT.readSync() !== this.rState){
        this.rotaryRight();
      } else {
        this.rotaryLeft();
      }
    }

    this.rLastState = this.rState;

  }
  //Rotation Direction Events
  rotaryLeft = () => {
    if(this.rTick % 2 === 0){
      this.EE.emit('Rotate', false);
    }
  }

  rotaryRight = () => {
    if(this.rTick % 2 === 0){
      this.EE.emit('Rotate', true);
    }
  }

  //Press Events
  rotaryPress = () => {
     this.EE.emit('Press', true);
  }

  rotatyRelease = () => {
     this.EE.emit('Press', false);
  }
}

exports.GPIORotaryEncoder = GPIORotaryEncoder;
