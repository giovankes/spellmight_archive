import Phaser from 'phaser'
import { CST } from '../../CST'

class MenuCharacter extends Phaser.Scene {
    constructor() {
        super({ key: CST.SCENES.MENU.CHARACTER })

        this.characters = []
        this.stage = 0
    }

    init(data) {
        this.stage = data.stage
    }

    create() {
        const characters = 6

        for (let i = 0; i < characters; i++) {
            this.characters.push(
                this.add
                    .text(0, 0, `Character ${i + 1}`, {
                        fontFamily: '"Roboto Condensed"'
                    })
                    .setFontSize(20)
                    .setInteractive()
                    .on('pointerup', () => {
                        this.scene.start(CST.SCENES.STAGES.LOAD, {
                            stage: this.stage,
                            character: i + 1
                        })
                    })
            )
        }

        this.characters[0]
            .setX(this.sys.game.config.width / 3 / 2)
            .setY(this.sys.game.config.height / 3)
        this.characters[1]
            .setX(this.sys.game.config.width / 2 - 80)
            .setY(this.sys.game.config.height / 3)
        this.characters[2]
            .setX((this.sys.game.config.width / 3) * 2)
            .setY(this.sys.game.config.height / 3)
        this.characters[3]
            .setX(this.sys.game.config.width / 3 / 2)
            .setY((this.sys.game.config.height / 3) * 2)
        this.characters[4]
            .setX(this.sys.game.config.width / 2 - 80)
            .setY((this.sys.game.config.height / 3) * 2)
        this.characters[5]
            .setX((this.sys.game.config.width / 3) * 2)
            .setY((this.sys.game.config.height / 3) * 2)
    }
}

export default MenuCharacter
