import Phaser from 'phaser'
import { CST } from '../../CST'

class OptionsIcon extends Phaser.GameObjects.Image {
    constructor({ Scene, x, y}) {
        super(
            Scene,
            Scene.game.renderer.width - 30,
            Scene.game.renderer.height - 30,
            CST.IMAGE.UI.MENU.BUTTON_OPTIONS
        )
        
        this.setScale(0.4)
        this.setInteractive()

        this.on('pointerover', () => {
            const tween = Scene.tweens.add({
                targets: this,
                scale: 0.45,
                ease: 'Power2',
                duration: 200,
            })
        })
        this.on('pointerout', () => {
            const tween = Scene.tweens.add({
                targets: this,
                scale: 0.4,
                ease: 'Power2',
                duration: 200,
            })
        })

        Scene.add.existing(this)
    }
}

export default OptionsIcon