/*
import $ from 'jquery';
import React from 'react';
import videojs from 'video.js'
import ReactDOM from 'react-dom';
import 'video.js/dist/video-js.css';
import framebyframe from './videojs.framebyframe';

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
       <input  type="file"
                      id="file"
                      className="input-file"
                      accept=".mp4"
                      onChange={e => this.handleChangeFile(e)}
       />
    )
  }
}

export default class Video extends React.Component {
    static defaultProps = {
        className: 'video-js vjs-default-skin vjs-big-play-centered',
    }

    componentDidMount() { this.checkIfVideoNeedsInstallation(); }
    componentDidUpdate() { this.checkIfVideoNeedsInstallation(); }

    checkIfVideoNeedsInstallation = () => {
        if(!this.props.src)
            return;
        
        if(typeof videojs === 'undefined') {
            $('<link/>', {rel: 'stylesheet', type: 'text/css', href: 'https://vjs.zencdn.net/4.12/video-js.css'}).appendTo('head');
            $.getScript('https://vjs.zencdn.net/4.12/video.js', this.loadVideo);
        } else {
            this.loadVideo();
        }
    }

    loadVideo = () => {
        if(this.video || !this.props.src)
            return;

        let node = ReactDOM.findDOMNode(this.refs.videoplayer);
        if(!node)
            return;

        this.video = document.createElement('video');
        this.video.src = this.props.src;
        this.video.width = this.props.width;
        this.video.height = this.props.height;
        this.video.className = this.props.className;
        node.appendChild(this.video);
        videojs(this.video, this.props);
    }
    
    render() {
        return <div ref="videoplayer" />;
    }
}
*/
import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import offset from 'videojs-offset';
import framebyframe from './videojs.framebyframe';
import { stat } from 'fs';
import shortCuts from './hotkeys.js';


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
    hotkeys: function(event) {
      console.log(event);
      if (event.which === 88) {
        videojs.pause();
      }
      if (event.which === 89) {
        videojs.play();
      }
    }
  },
  playbackRates: [0.25, 1, 1.5, 2],
  plugins: {
  //  offset: { start: 1, end: 1, restart_beginning: true }
    framebyframe: {
      fps: 30,
      steps: [
        { text: '-1', step: -1 },
        { text: '1', step: 1 }
        ]
    },
    offset: {
    }
  }
  
 }
  console.log("condiguring options...." )
  console.log(vidOptions);
  return vidOptions;
}

export default class VideoPlayer extends React.Component {
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
      videojs.registerPlugin('offset', offset);
      this.player = videojs(this.videoNode, this.state.options, function onPlayerReady() {
      console.log('onPlayerReady', this);

    });
    this.player.getChild('controlBar').addChild('shortCuts', {});
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
      this.player.pause();
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