import Phaser from 'phaser'
import { CST } from '../../CST'

class Hitbox extends Phaser.GameObjects.Rectangle {
    constructor(config) {
        super(config.scene, config.x, config.y, 15, 15, 0xFFFFFF)

        this.setDepth(2)
        config.scene.add.existing(this)
        config.scene.hitBoxes.add(this)
        const destroy = config.scene.time.addEvent({
            delay: 200,
            callback: () => {
                this.destroy()
            }
        })
    }
}

export default Hitbox