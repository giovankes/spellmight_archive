import Phaser from 'phaser'
import { CST } from '../CST'

import TimerText from '../gameObjects/text/ingame_timer'


class HUD extends Phaser.Scene {
    constructor(config) {
        super({
            key: CST.SCENES.INTERFACE,
            sceneConfig: {},
            autoStart: true
        })

        this.InterfaceConfig = config
    }

    create() {
        // Add UI
        this.UI = this.add.group(null, {
            name: 'UI Elements'
        })

        const timerUI = this.add.image(
            this.game.renderer.width / 2,
            20,
            CST.IMAGE.UI.INGAME.TIMER
        ).setScale(0.3)
        const characterInfoUI = this.add.image(200.50,880, CST.IMAGE.UI.INGAME.CHARACTER_INFO).setScale(0.7)

        this.timerText = new TimerText({
            Scene: this,
            x: 920 / 2,
            y: 10
        })

        this.UI.addMultiple([
            timerUI,
            characterInfoUI,
            this.timerText
        ])
    }
}

export default HUD