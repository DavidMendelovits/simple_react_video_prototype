import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import offset from 'videojs-offset';
import framebyframe from './videojs.framebyframe';
import { stat } from 'fs';

let options;
let options2;
let number;
let fileInfo = "backflip1.mp4";
let vidOptions;

function getOptions(source) {
 vidOptions = {
  autoplay: true,
  controls: true, 
  fill: true,
  sources: [{
      src: source,
      type: "video/mp4"
  }],
  userActions: {
    hotkeys: (event) =>  {
      if (event.which == 88) {
        this.pause();
      }
      if (event.which == 89) {
        this.play();
      }
    }
  },
  playbackRates: [0.25, 0.5, 1, 1.5, 2],
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

  console.log("condiguring options...." )
  console.log(vidOptions);
  return vidOptions;
}

export default class VideoPlayer2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {options : getOptions(props.src),
                  options2 : null,
                  number : 1}
  }
  componentDidMount() {
    // instantiate Video.js
  //    videojs.registerPlugin('offset', offset);
    console.log("attempting reconfigure options...")
    console.log(this.state.options2)
    
    console.log(this.state)
      videojs.registerPlugin('framebyframe', framebyframe);
      this.player = videojs(this.videoNode, this.state.options, function onPlayerReady() {
      console.log('onPlayerReady', this);

    });
  }
  componentWillUpdate(nextProps, nextState) {
    console.log("component will update!");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("component did update!");

  }

  componentWillReceiveProps(newProps) {
    console.log("recieving props!")
    console.log("old props", this.props)
    console.log("new props", newProps);
    console.log("src", this.player.src);
    if (this.player && (newProps.src != this.props.src)) {
      this.player.src({
        type: "video/mp4",
        src: newProps.src
      })
    }
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
        <div data-vjs-player>
          <video ref={ node => this.videoNode = node }
                 className="video-js vjs-fill"
          ></video>
        </div>
    )
  }
}