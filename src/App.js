import React, { Component, Fragment } from 'react';
import './App.css';
import VideoPlayer from './vidjs';
import VideoPlayer2 from './vid2';
import input from './vidjs';
import videojs from 'video.js';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import Wrapper from './wrapper'
import Wrapper2 from './wrapper2'

const video1Options = {
  autoplay: true,
  controls: true, 
  fill: true,
  sources: [{
      src: "castback.mp4",  
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

const video2Options = {
  autoplay: true,
  controls: true, 
  fill: true,
  sources: [{
      src: "http://www.parkourtheory.com/api/browse/castaway.mp4",
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

let fileReader;

let vidInfo = "castback.mp4";
let vidInfo2;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };
  }

  onDrop = (files) => {
    const req = request.post('https://httpbin.org/post');

    files.array.forEach(file => {
      req.attach(file.name, file);
    });

    req.end();
  }

  handleFile = (e) => {
    const content = fileReader.result;

 //   console.log('file content', content);
  }

  handleChangeFile = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = this.handleFile;
    vidInfo = fileReader.readAsDataURL(file.target.files[0]);
    
  }

  render() {
    const previewStyle = {
      display: 'inline',
      width: 100,
      height: 100,
    };

    return (
      <main className="app">
        <div className="header">
          <img id="logo" src="./logoPrototype.png">
        </img>
        </div>
        <div className="player-container">
          <div className="player">
          <Wrapper src={vidInfo} />
          
          </div>
          <div className="player2">
          <Wrapper2 src={vidInfo2} />
          
          </div>
        </div>
          <footer className="footer">
   
          </footer>
      </main>
    )
  }
}

export default App;
/*                <dropzone accept="video/*"
                          ondrop={ e => this.handlechangefile(e.target.files[0])}
                >
                {({getrootprops}) => (
                  <div {...getrootprops()}>
                drop here
                </div>
                )}
                </dropzone>
                <fragment>
                  {this.state.files.map((file) => (
                    <p>
                      {file.name}
                    </p>
                  ))}
                  </fragment>
            </div>*/