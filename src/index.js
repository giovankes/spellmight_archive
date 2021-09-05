import Phaser from "phaser";
import LoadScene from "./scenes/load";
import MenuScene from "./scenes/menu";
import TestScene from "./scenes/test_scene";

const config = {
  width: 800,
  height: 600,
  scene: [LoadScene, MenuScene, TestScene],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
