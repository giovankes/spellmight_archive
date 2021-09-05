import Phaser from "phaser";
import { CST } from "../../CST";

class StaticHitbox extends Phaser.GameObjects.Rectangle {
  constructor({ Scene, x, y, height, width, depth, life }) {
    super(Scene, x, y, height, width, 0xffffff);

    this.setDepth(depth);
    Scene.add.existing(this);
    Scene.hitBoxes.add(this);
    this.destroyTimer = Scene.time.delayedCall(life, () => {
      this.destroy();
    });
  }
}

export default StaticHitbox;
