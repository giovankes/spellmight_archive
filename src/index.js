import Phaser from "phaser";
import PhaserDefaultScene from './scenes/phaser_default'

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1600,
  height: 750,
  scene: [PhaserDefaultScene],
  physics: {
    default: 'arcade',
    ardace: {
      debug: false
    }
  }
};

const game = new Phaser.Game(config);