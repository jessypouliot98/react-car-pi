import React from 'react';
import classes from './AudioVisualizer.module.scss';

class AudioVisualizer extends React.Component{
   CANVAS = null;
   CTX = null;

   COUNT = 100;
   MARGIN = 5;
   COLOR = '#fff';

   cleanCanvas = () => {
      this.CTX.clearRect(0, 0, this.CANVAS.width, this.CANVAS.height);
   }

   prepareBars = (nb, margin) => {
      const w = this.CANVAS.width; //canvas width
      const h = this.CANVAS.height;//canvas height
      const width = ((w + margin) / nb) - margin; //bar width
      const audioData = this.props.audioDataFn(); //audio data
      const audioDataCut = 0.3;//cuts a percentage of the last part
      for(let i = 0; i < nb; i++){
         const x = i * (width + margin);//position
         const dataSampleSize = Math.floor((audioData.length * (1 - audioDataCut)) / nb);

         let amplitude = 0;
         for(let j = 0; j < dataSampleSize; j++){
            amplitude += audioData[(i * dataSampleSize)+j];
         }

         const minAmp = 10;
         amplitude = (amplitude / dataSampleSize) / 250/* max frequency ?*/ * h;
         this.drawBar(x, width, (amplitude > minAmp) ? amplitude : minAmp);
      }
   }

   drawBar = (x, width, amplitude) => {
      const margin = 0.15;//top & bottom
      const h = this.CANVAS.height * (1 - margin * 2);
      this.CTX.beginPath();
      this.CTX.fillStyle = this.COLOR;
      this.CTX.fillRect(x, h + margin + (amplitude * 0.2), width, margin - (amplitude * 0.8));
   }

   componentDidMount(){
      this.COUNT = this.props.bars.count;
      this.MARGIN = this.props.bars.margin;
      this.COLOR = this.props.bars.color;

      this.CANVAS = document.getElementById('audio-visualizer');
      this.CTX = this.CANVAS.getContext('2d');

      this.update();
   }

   update = () => {
      requestAnimationFrame(this.update);
      if(this.CANVAS === null) return;

      this.cleanCanvas();
      this.prepareBars(this.COUNT, this.MARGIN);
   }

   render(){
      return(
         <canvas id="audio-visualizer" className={classes.AudioVisualizer}></canvas>
      );
   }
}

export default AudioVisualizer
