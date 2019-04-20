const Gpio = require('onoff').Gpio;
const PCLK = new Gpio(24, 'in', 'both');
const PDT = new Gpio(23, 'in', 'both');
const PSW = new Gpio(25, 'in', 'both');

let lastCLK;
let lastDT;
let tick = 0;

// this make the selected GPIO act as a positive lead controlled by the Raspberry PI
// const PIN = new Gpio(4, 'out');
// PIN.writeSync(1||0);

PSW.watch((err, value) => {
   if(value === 0){
      rotaryPress();
   } else {
      rotatyRelease();
   }
});

PDT.watch((err, value) => {
   lastDT = value;
});

PCLK.watch((err, value) => {
   lastCLK = value;
   tick++;
   if(tick % 2 === 0){
      if(lastCLK !== lastDT){
         rotaryRight();
      } else {
         rotaryLeft();
      }
   }
});

let count = 0;

function rotaryLeft(){
   // console.log('Rotate left');
   count--;
   console.log(count);
}

function rotaryRight(){
   // console.log('Rotate right');
   count++;
   console.log(count);
}

let rotaryButtonState = false;
function rotaryPress(){
   // console.log('Pressed button');
   rotaryButtonState = true;
   console.log(rotaryButtonState);
}

function rotatyRelease(){
   // console.log('Released button');
   rotaryButtonState = false;
   console.log(rotaryButtonState);
}

//CTRL-C (EXIT)
// process.on('SIGINT', unexportOnClose);
