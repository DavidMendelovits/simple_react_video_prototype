import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import offset from 'videojs-offset';
import framebyframe from './videojs.framebyframe';
import VideoPlayer from './vidjs';
import Dropzone from 'react-dropzone';
import classNames from 'classnames'

let fileReader;

let vidInfo;

export default class Wrapper extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick() {
      console.log("click");
//    vidInfo = "/home/david/gopro/GH012846.MP4";
      this.forceUpdate();
    }

  handleFile = (e) => {
    const content = fileReader.result;

    console.log('file content', content);
    vidInfo = content;
    this.forceUpdate();
  }

  handleChangeFile = (file) => {
    console.log("you called?");
    console.log(file)
    fileReader = new FileReader();
    fileReader.onloadend = this.handleFile;
    fileReader.readAsDataURL(file[0]);
    console.log("vidinfo:", vidInfo)
    
  }

    onDrop = (acceptedFiles, rejectedFiles) => {
      console.log(acceptedFiles)
      console.log("you put something inside me!")

    }

    render() {
        return (
          <Dropzone 
          accept="video/*"
          onDrop={ e => this.handleChangeFile(e) }>
          {({getRootProps, getInputProps, isDragActive}) => {
            return (
            <div {...getRootProps()} 
            className="wrapper">
              <VideoPlayer src={vidInfo} />
            </div>
          );
            }}
          </Dropzone>
        );
    }
}