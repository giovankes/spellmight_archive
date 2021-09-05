import Phaser from "phaser";
import { CST } from "../CST";

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MENU" });
  }
  init(data) {
    console.log(data);
    console.log("I GOT IT");
  }
  create() {
    this.add.image(0, 0, "menu-bg").setOrigin(0);
    this.add
      .image(
        this.game.renderer.width / 2,
        this.game.renderer.height * 0.2,
        "logo"
      )
      .setDepth(0)
      .setTintFill("0xffffff");
    const buttonPlay = this.add
      .image(
        this.game.renderer.width / 2,
        this.game.renderer.height * 0.5,
        "button-play"
      )
      .setDepth(0)
      .setTintFill("0xffffff")
      .setScale(0.4);
    const buttonOptions = this.add
      .image(
        this.game.renderer.width / 2,
        this.game.renderer.height * 0.6,
        "button-options"
      )
      .setDepth(0)
      .setTintFill("0xffffff")
      .setScale(0.4);

    buttonPlay.setInteractive();
    buttonPlay.on("pointerup", () => {
      this.scene.start(CST.SCENES.TEST);
    });

    buttonOptions.setInteractive();
    buttonOptions.on("pointerup", () => {
      console.log("going to options");
    });
  }
}

export default MenuScene;
