import Phaser from "phaser";
import { CST } from "../../../CST";
import Character from "./character";

class MageCharacter extends Character {
  constructor(config) {
    // Write attacks here, pass them in to the super()
    const attacks = {
      attackFast: {
        neutral: {
          maxCombo: 3,
          currentCombo: 0,
          exec: () => {},
        },
        forward: {
          maxCombo: 1,
          currentCombo: 0,
          exec: () => {},
        },
        up: {
          maxCombo: 1,
          currentCombo: 0,
          exec: () => {},
        },
        down: {
          maxCombo: 1,
          currentCombo: 0,
          exec: () => {},
        },
      },
      attackHeavy: {
        neutral: {
          maxCombo: 3,
          currentCombo: 0,
          exec: () => {},
        },
        forward: {
          maxCombo: 1,
          currentCombo: 0,
          exec: () => {},
        },
        up: {
          maxCombo: 1,
          currentCombo: 0,
          exec: () => {},
        },
        down: {
          maxCombo: 1,
          currentCombo: 0,
          exec: () => {},
        },
      },
      abilityOne: {
        cooldown: 4000,
        exec: () => {},
      },
      abilityTwo: {
        cooldown: 4000,
        exec: () => {},
      },
      ultimate: {
        cooldown: 4000,
        exec: () => {},
      },
    };

    super({
      // Edittable values
      maxJumps: 2,
      jumpHeight: 1000,
      accelerationX: 2500,
      accelerationDown: 5000,
      drag: 2500,
      normalVelocity: 300,
      sprintVelocity: 550,
      collisionBodySize: {
        width: 65,
        height: 127,
        offsetX: 40,
        offsetY: 0,
      },
      scale: 1,

      // Do not touch
      Scene: config.Scene,
      x: config.x,
      y: config.y,
      sprite: CST.SPRITESHEET.CHARACTERS.MAGE,
      isPlayer: config.isPlayer,
      anims: [],
      attacks,
    });
  }
}

export default MageCharacter;
