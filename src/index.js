import Phaser from "phaser";

import MenuLoad from "./scenes/menus/menu_load.js";
import MenuMain from "./scenes/menus/menu_main.js";
import MenuCharacter from "./scenes/menus/menu_character.js";
import MenuStages from "./scenes/menus/menu_stages.js";
import StageLoad from "./scenes/stages/stage_load.js";
import StageTest from "./scenes/stages/stage_test.js";

const config = {
  // type: Phaser.AUTO,
  // parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: [MenuLoad, MenuMain, MenuCharacter, MenuStages, StageLoad, StageTest],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);

function preload() {
  console.log("test");
}
