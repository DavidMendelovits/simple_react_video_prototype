import Hotkeys from 'react-shortcut'
import Videojs from 'video.js'
import React from 'react'
import ReactDOM from 'react-dom'

const vjsComponent = Videojs.getComponent('Component');
const pauseKey = 'p';

class shortCuts extends vjsComponent {
    constructor(player, options) {
        super(player, options);

        this.mount = this.mount.bind(this);

        player.ready(() => {
            this.mount();
        });

        this.on("dispose", () => {
            ReactDOM.unmountComponentAtNode(this.el())
        });
    }

    mount() {
        ReactDOM.render(
            <Hotkeys
                keys={pauseKey}
                OnKeysCoincide={this.player.pause()}
            />
        );
    }
}

vjsComponent.registerComponent('shortCuts', shortCuts);
export default shortCuts;