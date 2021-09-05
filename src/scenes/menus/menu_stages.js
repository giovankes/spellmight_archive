import Phaser from 'phaser'
import { CST } from '../../CST'

class MenuStages extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.MENU.STAGES })

    this.stages = []
  }

  init(data) {
    this.character = data.character
  }

  create() {
    const hide = {
      // const stages = 6
      // for (let i = 0; i < stages; i++) {
      //     this.stages.push(
      //         this.add
      //             .text(0, 0, `Stage ${i + 1}`, {
      //                 fontFamily: 'Superscript',
      //                 fontSize: 18,
      //                 resolution: 8
      //             })
      //             .setInteractive()
      //             .on('pointerup', () => {
      //                 this.scene.start(CST.SCENES.STAGES.LOAD, {
      //                     stage: i + 1,
      //                     character: this.character
      //                 })
      //             })
      //             .setOrigin(0)
      //     )
      // }
      // this.stages[0]
      //     .setX(this.sys.game.config.width / 3 / 2)
      //     .setY(this.sys.game.config.height / 3)
      // this.stages[1]
      //     .setX(this.sys.game.config.width / 2 - 40)
      //     .setY(this.sys.game.config.height / 3)
      // this.stages[2]
      //     .setX((this.sys.game.config.width / 3) * 2)
      //     .setY(this.sys.game.config.height / 3)
      // this.stages[3]
      //     .setX(this.sys.game.config.width / 3 / 2)
      //     .setY((this.sys.game.config.height / 3) * 2)
      // this.stages[4]
      //     .setX(this.sys.game.config.width / 2 - 40)
      //     .setY((this.sys.game.config.height / 3) * 2)
      // this.stages[5]
      //     .setX((this.sys.game.config.width / 3) * 2)
      //     .setY((this.sys.game.config.height / 3) * 2)
    }

    const map = this.add
      .image(
        this.game.renderer.width / 2,
        this.game.renderer.height / 2,
        CST.SCENES.MENU.MAP
      )
      .setScale(1)
      .setInteractive()
      .on('pointerup', () => {
        this.scene.start(CST.SCENES.STAGES.LOAD, {
          stage: 1,
          character: 1,
        })
      })
  }
}

export default MenuStages
