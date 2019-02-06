import React, { Component } from "react";
import "./App.css";
// import VideoPlayer from './vidjs';
import VideoPlayer from "./VideoPlayer";
// import videojs from 'video.js'

class App extends Component {
  render() {
    return (
      <main className="app">
        <div className="header" />
        <div className="player-container">
          <div className="player">
            <VideoPlayer />
          </div>
          <div className="player">
            <VideoPlayer />
          </div>
        </div>
        <footer className="footer" />
      </main>
    );
  }
}

export default App;
