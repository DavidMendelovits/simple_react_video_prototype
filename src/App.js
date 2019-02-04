import React, { Component } from 'react';
import './App.css';
import VideoPlayer from './vidjs';
import videojs from 'video.js'

const videoJsOptions = {
  autoplay: true,
  controls: true, 
  width: "flex",
  height: "flex",
  sources: [{
      src: "http://www.parkourtheory.com/api/browse/frog_gainer.mp4",  
      type: "video/mp4"
  }], 
  plugins: {
  //  offset: { start: 1, end: 1, restart_beginning: true }
    framebyframe: {
      fps: 30,
      steps: [
        { text: '-1', step: -1 },
        { text: '1', step: 1 }
      ]
    }
  }
}

class App extends Component {
  render() {
    return (
      <div className="App"
           id="player-container">
           <div className="player">
        <VideoPlayer {...videoJsOptions}/>
            </div>
      </div>
    );
  }
}

export default App;
