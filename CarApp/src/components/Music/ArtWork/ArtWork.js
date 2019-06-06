import React from 'react';
import classes from './ArtWork.module.scss';

class ArtWork extends React.Component{
   render(){
     // console.log(this.props);
      return (
         <img src={this.props.file} alt="Album Artwork" className={classes.ArtWork}/>
      );
   }
}

export default ArtWork
