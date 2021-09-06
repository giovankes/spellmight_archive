import Phaser from 'phaser'
import { CST } from '../CST'
import { PLAYERS } from '../playerControllers'

class InputScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.INPUT })
  }

  create() {
    // Listeners to register
    this.input.gamepad.on('down', (pad, button, index) => {
      if (!PLAYERS.includes(pad.index)) {
        PLAYERS.push(pad.index)
        if (this.currentScene.PlayerController) {
          this.currentScene.PlayerController.updatePlayers()
        }
        this.setGamepadBindings(pad.index)
      }
    })
    this.input.keyboard.on('keydown', () => {
      if (!PLAYERS.includes('keyboard')) {
        PLAYERS.push('keyboard')
        if (this.currentScene.PlayerController) {
          this.currentScene.PlayerController.updatePlayers()
        }
        this.setKeyboardBindings()
      }
    })

    this.INPUT_IGNORE = true
    this.currentScene = null

    // Key bindings
    //Keyboard
    // Movement
  }

  //XBOX CONTROLLER
  setGamepadBindings(index) {
    const pad = this.input.gamepad.getPad(index)
    if (pad.id.includes('Microsoft Controller')) {
      const playerIndex = PLAYERS.indexOf(index)
      pad.addListener('down', (buttonIndex, value, button) => {
        console.log(button)
        if (this.currentScene && this.currentScene.getControls) {
          switch (buttonIndex) {
            case 12:
              this.currentScene.getControls('UP', playerIndex, 'down')
              break
            case 13:
              this.currentScene.getControls('DOWN', playerIndex, 'down')
              break
            case 14:
              this.currentScene.getControls('LEFT', playerIndex, 'down')
              break
            case 15:
              this.currentScene.getControls('RIGHT', playerIndex, 'down')
              break
            case 9:
              this.currentScene.getControls('ENTER/START', playerIndex, 'down')
              break
            case 0:
              this.currentScene.getControls('A', playerIndex, 'down')
              break
            case 1:
              this.currentScene.getControls('B', playerIndex, 'down')
              break
            case 2:
              this.currentScene.getControls('X', playerIndex, 'down')
              break
            case 3:
              this.currentScene.getControls('Y', playerIndex, 'down')
              break
            case 4:
              this.currentScene.getControls('LB', playerIndex, 'down')
              break
            case 6:
              this.currentScene.getControls('LT', playerIndex, 'down')
              break
            case 5:
              this.currentScene.getControls('RB', playerIndex, 'down')
              break
            case 7:
              this.currentScene.getControls('RT', playerIndex, 'down')
              break
            default:
              break
          }
        }
      })
      pad.addListener('up', (buttonIndex, value, button) => {
        if (this.currentScene && this.currentScene.getControls) {
          switch (buttonIndex) {
            case 7:
              this.currentScene.getControls('JUMP', playerIndex, 'up')
              break
            case 12:
              this.currentScene.getControls('UP', playerIndex, 'up')
              break
            case 13:
              this.currentScene.getControls('DOWN', playerIndex, 'up')
              break
            case 14:
              this.currentScene.getControls('LEFT', playerIndex, 'up')
              break
            case 15:
              this.currentScene.getControls('RIGHT', playerIndex, 'up')
              break
            case 9:
              this.currentScene.getControls('ENTER/START', playerIndex, 'up')
              break
            case 0:
              this.currentScene.getControls('A', playerIndex, 'up')
              break
            case 1:
              this.currentScene.getControls('B', playerIndex, 'up')
              break
            case 2:
              this.currentScene.getControls('X', playerIndex, 'up')
              break
            case 3:
              this.currentScene.getControls('Y', playerIndex, 'up')
              break
            case 4:
              this.currentScene.getControls('LB', playerIndex, 'up')
              break
            case 4:
              this.currentScene.getControls('LB', playerIndex, 'up')
              break
            case 6:
              this.currentScene.getControls('LT', playerIndex, 'up')
              break
            case 5:
              this.currentScene.getControls('RB', playerIndex, 'up')
              break
            case 7:
              this.currentScene.getControls('RT', playerIndex, 'up')
              break
            default:
              break
          }
        }
      })
    }
  }

  setKeyboardBindings() {
    this.input.keyboard.addKey('W').on('down', (e) => {
      const playerIndex = PLAYERS.indexOf('keyboard')
      if (this.currentScene && this.currentScene.getControls) {
        this.currentScene.getControls('UP', playerIndex, 'down')
        this.currentScene.getControls('JUMP', playerIndex, 'down')
      }
    })
    this.input.keyboard.addKey('S').on('down', (e) => {
      const playerIndex = PLAYERS.indexOf('keyboard')
      if (this.currentScene && this.currentScene.getControls) {
        this.currentScene.getControls('DOWN', playerIndex, 'down')
      }
    })
    this.input.keyboard.addKey('A').on('down', (e) => {
      const playerIndex = PLAYERS.indexOf('keyboard')
      if (this.currentScene && this.currentScene.getControls) {
        this.currentScene.getControls('LEFT', playerIndex, 'down')
      }
    })
    this.input.keyboard.addKey('D').on('down', (e) => {
      const playerIndex = PLAYERS.indexOf('keyboard')
      if (this.currentScene && this.currentScene.getControls) {
        this.currentScene.getControls('RIGHT', playerIndex, 'down')
      }
    })
    // Other
    this.input.keyboard.addKey('ENTER').on('down', (e) => {
      const playerIndex = PLAYERS.indexOf('keyboard')
      if (this.currentScene && this.currentScene.getControls) {
        this.currentScene.getControls('ENTER/START', playerIndex, 'down')
      }
    })
    this.input.keyboard.addKey('ESC').on('down', (e) => {
      const playerIndex = PLAYERS.indexOf('keyboard')
      if (this.currentScene && this.currentScene.getControls) {
        this.currentScene.getControls('ESC', playerIndex, 'down')
      }
    })
    this.input.keyboard.addKey('SPACE').on('down', (e) => {
      const playerIndex = PLAYERS.indexOf('keyboard')
      if (this.currentScene && this.currentScene.getControls) {
        this.currentScene.getControls('LT', playerIndex, 'down')
      }
    })
    // Main
    this.input.keyboard.addKey('J').on('down', (e) => {
      const playerIndex = PLAYERS.indexOf('keyboard')
      if (this.currentScene && this.currentScene.getControls) {
        this.currentScene.getControls('A', playerIndex, 'down')
      }
    })
    this.input.keyboard.addKey('K').on('down', (e) => {
      const playerIndex = PLAYERS.indexOf('keyboard')
      if (this.currentScene && this.currentScene.getControls) {
        this.currentScene.getControls('B', playerIndex, 'down')
      }
    })
    this.input.keyboard.addKey('Q').on('down', (e) => {
      const playerIndex = PLAYERS.indexOf('keyboard')
      if (this.currentScene && this.currentScene.getControls) {
        this.currentScene.getControls('X', playerIndex, 'down')
      }
    })
    this.input.keyboard.addKey('E').on('down', (e) => {
      const playerIndex = PLAYERS.indexOf('keyboard')
      if (this.currentScene && this.currentScene.getControls) {
        this.currentScene.getControls('Y', playerIndex, 'down')
      }
    })
    // up
    this.input.keyboard.addKey('W').on('up', (e) => {
      const playerIndex = PLAYERS.indexOf('keyboard')
      if (this.currentScene && this.currentScene.getControls) {
        this.currentScene.getControls('UP', playerIndex, 'up')
        this.currentScene.getControls('JUMP', playerIndex, 'up')
      }
    })
    this.input.keyboard.addKey('S').on('up', (e) => {
      const playerIndex = PLAYERS.indexOf('keyboard')
      if (this.currentScene && this.currentScene.getControls) {
        this.currentScene.getControls('DOWN', playerIndex, 'up')
      }
    })
    this.input.keyboard.addKey('A').on('up', (e) => {
      const playerIndex = PLAYERS.indexOf('keyboard')
      if (this.currentScene && this.currentScene.getControls) {
        this.currentScene.getControls('LEFT', playerIndex, 'up')
      }
    })
    this.input.keyboard.addKey('D').on('up', (e) => {
      const playerIndex = PLAYERS.indexOf('keyboard')
      if (this.currentScene && this.currentScene.getControls) {
        this.currentScene.getControls('RIGHT', playerIndex, 'up')
      }
    })
    // Other
    this.input.keyboard.addKey('ENTER').on('up', (e) => {
      const playerIndex = PLAYERS.indexOf('keyboard')
      if (this.currentScene && this.currentScene.getControls) {
        this.currentScene.getControls('ENTER/START', playerIndex, 'up')
      }
    })
    this.input.keyboard.addKey('ESC').on('up', (e) => {
      const playerIndex = PLAYERS.indexOf('keyboard')
      if (this.currentScene && this.currentScene.getControls) {
        this.currentScene.getControls('ESC', playerIndex, 'up')
      }
    })
    this.input.keyboard.addKey('SPACE').on('up', (e) => {
      const playerIndex = PLAYERS.indexOf('keyboard')
      if (this.currentScene && this.currentScene.getControls) {
        this.currentScene.getControls('LT', playerIndex, 'up')
      }
    })
    // Main
    this.input.keyboard.addKey('J').on('up', (e) => {
      const playerIndex = PLAYERS.indexOf('keyboard')
      if (this.currentScene && this.currentScene.getControls) {
        this.currentScene.getControls('A', playerIndex, 'up')
      }
    })
    this.input.keyboard.addKey('K').on('up', (e) => {
      const playerIndex = PLAYERS.indexOf('keyboard')
      if (this.currentScene && this.currentScene.getControls) {
        this.currentScene.getControls('B', playerIndex, 'up')
      }
    })
    this.input.keyboard.addKey('Q').on('up', (e) => {
      const playerIndex = PLAYERS.indexOf('keyboard')
      if (this.currentScene && this.currentScene.getControls) {
        this.currentScene.getControls('X', playerIndex, 'up')
      }
    })
    this.input.keyboard.addKey('E').on('up', (e) => {
      const playerIndex = PLAYERS.indexOf('keyboard')
      if (this.currentScene && this.currentScene.getControls) {
        this.currentScene.getControls('Y', playerIndex, 'up')
      }
    })
  }

  getCurrentScene(sceneKey) {
    if (sceneKey) {
      this.currentScene = this.game.scene.getScene(sceneKey)
    } else {
      this.game.scene.getScenes(true).forEach((scene) => {
        if (!scene.INPUT_IGNORE) this.currentScene = scene
      })
    }
  }
}

export default InputScene
