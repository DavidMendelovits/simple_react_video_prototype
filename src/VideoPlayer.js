import React from "react";
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  Shortcut
} from "video-react";

export default props => {
  let shortcuts = [
    {
      keyCode: 37, // Left arrow
      handle: (player, actions) => {
        if (!player.hasStarted) {
          return;
        }

        // this operation param is option
        // helps to display a bezel
        const operation = {
          action: "replay",
          source: "shortcut"
        };
        actions.replay(1/30, operation);
      }
    },
    {
      keyCode: 39, // Right arrow
      handle: (player, actions) => {
        if (!player.hasStarted) {
          return;
        }

        // this operation param is option
        // helps to display a bezel
        const operation = {
          action: "forward",
          source: "shortcut"
        };
        actions.forward(1/30, operation);
      }
    }
  ];
  return (
    <Player>
      <source src="frog_gainer.mp4" type="video/mp4" />
      <ControlBar autoHide={false}>
        <ReplayControl onClick={console.log("Replay")} seconds={1/30} />
        <ForwardControl seconds={1/30} />
      </ControlBar>
      <Shortcut shortcuts={shortcuts} />
    </Player>
  );
};
