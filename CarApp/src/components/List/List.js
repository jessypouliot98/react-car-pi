import React from 'react';
import ListItem from './ListItem/ListItem';
import { AudioConsumer, VideoConsumer } from '../../providers/';
import classes from './List.module.scss';

class List extends React.Component{

   render(){
      return(
         <AudioConsumer>
            {(audioProps) => {
               const aItems = audioProps.songList.map((item, i) => {
                  const song = audioProps.playlist[audioProps.currentAudioID];
                  const selected = (item === song);
                  return(
                     <ListItem key={i} clickFn={() => audioProps.selectMediaFn(i)} currentActive={selected}>
                        <div className={classes.PrimaryName}>{item.title}</div>
                        <div className={classes.SecondaryName}>{item.artist ? item.artist : 'Unknown Artist'}</div>
                     </ListItem>
                  );
               });
               return(
                  <ul className={classes.ListContainer}>
                     {aItems}
                  </ul>
               );
            }}
         </AudioConsumer>
      );
   }
}

export default List;
