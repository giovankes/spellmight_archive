import Phaser from 'phaser'
import { CST } from './CST'

// number = index of the gamepad, 'keyboard' = keyboard
// index is the player. so [0] is player 1
export const PLAYERS = []

class PlayerController extends Phaser.GameObjects.Container {
  constructor({ x, y, Scene }) {
    super(Scene, Scene.game.renderer.width - 20, 60)

    this.scene = Scene

    if (PLAYERS.length) {
      // Add children
      this.updatePlayers()
    }

    this.playerIcons = []

    Scene.add.existing(this)
  }

  updatePlayers() {
    if (!this.playerIcons) this.playerIcons = []

    if (this.playerIcons.length) {
      this.playerIcons.forEach((icon) => {
        icon.border.destroy()
        icon.image.destroy()
      })
    }
    if (PLAYERS && PLAYERS.length) {
      PLAYERS.forEach((player, index) => {
        let borderColor = 0x7645a1
        if (index === 0) {
          borderColor = 0xa14545
        } else if (index === 1) {
          borderColor = 0x56a145
        } else if (index === 2) {
          borderColor = 0x458ca1
        }
        this.playerIcons[index] = {
          border: new Phaser.GameObjects.Ellipse(
            this.scene,
            0,
            35 * index,
            30,
            30,
            0x5c5d5e,
            1
          ).setStrokeStyle(3, borderColor),
        }
        if (player === 'keyboard') {
          this.playerIcons[index].image = new Phaser.GameObjects.Image(
            this.scene,
            0,
            35 * index,
            CST.IMAGE.MENU.PLAYERS_KEYBOARD
          ).setScale(0.04)
        } else {
          this.playerIcons[index].image = new Phaser.GameObjects.Image(
            this.scene,
            0,
            35 * index,
            CST.IMAGE.MENU.PLAYERS_CONTROLLER
          ).setScale(0.03)
        }

        this.add([
          this.playerIcons[index].border,
          this.playerIcons[index].image,
        ])
      })
    }
  }
}

export default PlayerController
