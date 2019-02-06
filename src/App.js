import React, { Component, Fragment } from 'react';
import './App.css';
import VideoPlayer from './vidjs';
import videojs from 'video.js';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const video1Options = {
  autoplay: true,
  controls: true, 
  fill: true,
  sources: [{
      src: "frog_gainer.mp4",  
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
      src: vidInfo,  
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

let vidInfo;

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

    console.log('file content', content);
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
            <VideoPlayer {...video1Options}/>
          </div>
          <div className="player">
            <VideoPlayer {...video2Options}/>
          </div>
        </div>
          <footer className="footer">
            <div className="upload">
              <input  type="file"
                      id="file"
                      className="input-file"
                      accept=".mp4"
                      onChange={e => this.handleChangeFile(e)}
              />
            </div>
          </footer>
      </main>
    )
  }
}

export default App;
/*                <Dropzone accept="video/*"
                          onDrop={ e => this.handleChangeFile(e.target.files[0])}
                >
                {({getRootProps}) => (
                  <div {...getRootProps()}>
                drop here
                </div>
                )}
                </Dropzone>
                <Fragment>
                  {this.state.files.map((file) => (
                    <p>
                      {file.name}
                    </p>
                  ))}
                  </Fragment>
            </div>*/