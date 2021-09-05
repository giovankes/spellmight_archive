import Phaser from "phaser";
import { CST } from "../CST.js";
import MenuBackgroundImage from "../assets/images/temp_menu_bg.jpg";
import LogoImage from "../assets/images/logo.png";
import ButtonPlay from "../assets/images/button_play.png";
import ButtonOptions from "../assets/images/button_options.png";
import StageOneBackground from "../assets/images/temp_stage_bg.jpg";
import BlockImg from "../assets/images/block.png";
import BallImg from "../assets/images/ball.png";

class LoadScene extends Phaser.Scene {
  constructor() {
    super({ key: "LOAD" });
  }

  init() {}

  preload() {
    this.load.image("menu-bg", MenuBackgroundImage);
    this.load.image("stage1-bg", StageOneBackground);
    this.load.image("logo", LogoImage);
    this.load.image("button-play", ButtonPlay);
    this.load.image("button-options", ButtonOptions);
    this.load.image("character", BallImg);
    this.load.image("ground", BlockImg);

    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff,
      },
    });

    this.load.on("progress", (percent) => {
      loadingBar.fillRect(
        0,
        this.game.renderer.height / 2,
        this.game.renderer.width * percent,
        50
      );
      console.log(percent);
    });

    this.load.on("complete", () => {
      console.log("done");
    });
  }

  create() {
    this.scene.start(CST.SCENES.MENU, "hello from LoadScene");
  }
}

export default LoadScene;
