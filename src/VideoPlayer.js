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
        actions.replay(0.1, operation);
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
        actions.forward(0.1, operation);
      }
    }
  ];
  return (
    <Player>
      <source src="frog_gainer.mp4" type="video/mp4" />
      <ControlBar autoHide={false}>
        <ReplayControl onClick={console.log("Replay")} seconds={0.04} />
        <ForwardControl seconds={0.04} />
      </ControlBar>
      <Shortcut shortcuts={shortcuts} />
    </Player>
  );
};
