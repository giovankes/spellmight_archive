import Phaser from "phaser";
import { CST } from "../../CST";

class MenuStages extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.MENU.STAGES });

    this.stages = [];
  }

  create() {
    const stages = 6;

    for (let i = 0; i < stages; i++) {
      this.stages.push(
        this.add
          .text(0, 0, `Stage ${i + 1}`, {
            fontFamily: '"Roboto Condensed"',
          })
          .setFontSize(20)
          .setInteractive()
          .on("pointerup", () => {
            this.scene.start(CST.SCENES.MENU.CHARACTER, {
              stage: i + 1,
            });
          })
      );
    }

    this.stages[0]
      .setX(this.sys.game.config.width / 3 / 2)
      .setY(this.sys.game.config.height / 3);
    this.stages[1]
      .setX(this.sys.game.config.width / 2 - 80)
      .setY(this.sys.game.config.height / 3);
    this.stages[2]
      .setX((this.sys.game.config.width / 3) * 2)
      .setY(this.sys.game.config.height / 3);
    this.stages[3]
      .setX(this.sys.game.config.width / 3 / 2)
      .setY((this.sys.game.config.height / 3) * 2);
    this.stages[4]
      .setX(this.sys.game.config.width / 2 - 80)
      .setY((this.sys.game.config.height / 3) * 2);
    this.stages[5]
      .setX((this.sys.game.config.width / 3) * 2)
      .setY((this.sys.game.config.height / 3) * 2);
  }
}

export default MenuStages;
