import Phaser from 'phaser'
import { CST } from '../../CST'

class StaticHitbox extends Phaser.GameObjects.Rectangle {
  constructor({
    Scene,
    x,
    y,
    height,
    width,
    depth,
    life,
    tweenData,
    id,
    direction,
    attack,
    addToScene,
  }) {
    super(Scene, x, y, height, width, 0xffffff, 0)

    this.id = id
    this.direction = direction
    this.attack = attack
    this.hitCharacters = []

    this.setDepth(depth)
    Scene.physics.add.existing(this)
    addToScene ? Scene.add.existing(this) : ''
    if (tweenData) {
      Scene.tweens.add({
        targets: this,
        ...tweenData,
      })
    }

    Scene.hitBoxes.add(this)
    this.destroyTimer = Scene.time.delayedCall(life, () => {
      this.destroy()
    })
  }
}

export default StaticHitbox
