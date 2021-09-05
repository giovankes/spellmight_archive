import Phaser from 'phaser'
import { CST } from '../../CST'

class Timer extends Phaser.GameObjects.Text {
    constructor(config) {
        super(
            config.Scene,
            config.x,
            config.y,
            'test'
        )
        
        config.Scene.add.existing(this)
    }
}

export default Timer