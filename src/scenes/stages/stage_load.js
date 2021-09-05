import Phaser from "phaser";
import { CST } from "../../CST";

import StageOneBackground from "../../assets/images/temp_stage_bg.jpg";
import BlockImg from "../../assets/images/block.png";
import DudeSpr from "../../assets/images/dude.png";

class StageLoad extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.STAGES.LOAD });
    this.data = {};
  }

  init(data) {
    this.data = data;
  }

  preload() {
    if (this.data.stage === 1) {
      this.load.image(CST.IMAGE.STAGES.TEST.BACKGROUND, StageOneBackground);
      this.load.image(CST.IMAGE.STAGES.TEST.FLOOR, BlockImg);
      this.load.spritesheet(CST.SPRITESHEET.CHARACTERS.TEST, DudeSpr, {
        frameWidth: 32,
        frameHeight: 48,
      });
    }
  }

  create() {
    if (this.data.stage === 1) {
      this.scene.start(CST.SCENES.STAGES.TEST);
    }
  }
}

export default StageLoad;
