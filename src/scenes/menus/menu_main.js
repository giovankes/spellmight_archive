import Phaser from "phaser";
import { CST } from "../../CST";

class MenuMain extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.MENU.MAIN });
  }
  create() {
    this.add.image(0, 0, CST.IMAGE.MENU.MAIN_BG).setOrigin(0);
    this.add
      .image(
        this.game.renderer.width / 2,
        this.game.renderer.height * 0.2,
        CST.IMAGE.MENU.LOGO
      )
      .setDepth(0)
      .setTintFill("0xffffff");
    const buttonPlay = this.add
      .image(
        this.game.renderer.width / 2,
        this.game.renderer.height * 0.5,
        CST.IMAGE.MENU.BTN_PLAY
      )
      .setDepth(0)
      .setTintFill("0xffffff")
      .setScale(0.4);
    const buttonOptions = this.add
      .image(
        this.game.renderer.width / 2,
        this.game.renderer.height * 0.6,
        CST.IMAGE.MENU.BTN_OPTIONS
      )
      .setDepth(0)
      .setTintFill("0xffffff")
      .setScale(0.4);

    buttonPlay.setInteractive();
    buttonPlay.on("pointerup", () => {
      this.scene.start(CST.SCENES.MENU.STAGES);
    });

    buttonOptions.setInteractive();
    buttonOptions.on("pointerup", () => {
      console.log("going to options");
    });
  }
}

export default MenuMain;
