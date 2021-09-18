import Phaser from 'phaser'
import { CST } from '../../CST'

class Hitbox extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, CST.SPRITESHEET.CHARACTERS.TEST)

    config.scene.add.existing(this)
    config.scene.physics.world.enableBody(this)

    config.scene.hitBoxes.add(this)

    this.setAlpha(0.5)
    this.setScale(1.5)

    // console.log(this.body)

    const destroy = config.scene.time.addEvent({
      delay: 200,
      callback: () => {
        this.destroy()
      },
    })
  }
}

export default Hitbox
