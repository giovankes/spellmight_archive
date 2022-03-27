import Phaser from 'phaser'
import { uuid as v4 } from 'uuidv4'
import { CST } from '../../CST'
import PlayerController, { PLAYERS } from '../../playerControllers'
import io from 'socket.io-client'
import ButtonOptions from '../../gameObjects/menu/options'
import MenuRectangle from '../../gameObjects/menu/menu-rectangle'
import consola from 'consola'

class MenuMultiplayer extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.MENU.MULTIPLAYER,
    })
  }

  create() {
    this.add
      .image(0, 0, CST.IMAGE.MENU.MAIN_BG)
      .setOrigin(0)
      .setScale(0.4)
      .setDepth(0)
    this.add
      .rectangle(
        0,
        0,
        this.game.renderer.width,
        this.game.renderer.height,
        0xcfbbb0,
        0.4
      )
      .setOrigin(0)
      .setDepth(0)

    const menuItemsX = 120

    this.menuItemLocal = this.add
      .image(menuItemsX, 100, CST.IMAGE.UI.MENU.MENU_ITEM)
      .setOrigin(0.5)
      .setDepth(1)
    this.menuItemOnline = this.add
      .image(menuItemsX, 150, CST.IMAGE.UI.MENU.MENU_ITEM)
      .setOrigin(0.5)
      .setDepth(1)
    this.menuItemExit = this.add
      .image(menuItemsX, 200, CST.IMAGE.UI.MENU.MENU_ITEM)
      .setOrigin(0.5)
      .setDepth(1)

    this.menuSelected = this.add
      .image(menuItemsX, 100, CST.IMAGE.UI.MENU.MENU_SELECTED)
      .setOrigin(0.5)
      .setDepth(2)

    this.textLocal = this.add
      .text(menuItemsX + 8, 100, 'Create game', {
        fontFamily: 'Superscript',
        fontSize: 20,
        color: '#302421',
        stroke: '#FFFFFF',
        strokeThickness: 4,
        resolution: 5,
      })
      .setOrigin(0.5)
      .setDepth(1)

    this.textOnline = this.add
      .text(menuItemsX + 4, 150, 'Join game', {
        fontFamily: 'Superscript',
        fontSize: 20,
        color: '#302421',
        stroke: '#FFFFFF',
        strokeThickness: 0,
        resolution: 3,
      })
      .setInteractive()
      .setOrigin(0.5)
      .setDepth(1)

    this.textExit = this.add
      .text(menuItemsX - 5, 200, 'BACK', {
        fontFamily: 'Superscript',
        fontSize: 20,
        color: '#302421',
        stroke: '#FFFFFF',
        strokeThickness: 0,
        resolution: 3,
      })
      .setOrigin(0.5)
      .setDepth(1)

    this.buttonOptions = new ButtonOptions({ Scene: this }).setDepth(1)

    const menuRectangle = new MenuRectangle({
      Scene: this,
      currentMenuText: 'Cum gang',
    })

    // Add player controller
    this.PlayerController = new PlayerController({
      Scene: this,
    })

    if (PLAYERS.length) {
      this.PlayerController.updatePlayers()
    }

    this.blackScreen = this.add
      .rectangle(
        0,
        0,
        this.game.renderer.width,
        this.game.renderer.height,
        0x000000
      )
      .setDepth(3)
      .setAlpha(0)
      .setOrigin(0)

    this.menuItemSelected = 1
    this.scene
      .get(CST.SCENES.INPUT)
      .getCurrentScene(CST.SCENES.MENU.MULTIPLAYER)
  }

  getControls(key, playerIndex, status) {
    if (playerIndex !== 0) return
    if (status === 'down') {
      switch (key) {
        case 'ENTER/START':
        case 'A':
          if (this.menuItemSelected === 1) {
            this.goTo('create')
          } else if (this.menuItemSelected === 2) {
            this.goTo('join')
          } else if (this.menuItemSelected === 3) {
            this.goTo('entry')
          }
          break

        case 'DOWN':
          if (this.menuItemSelected === 3) {
            this.menuItemSelected = 1
          } else {
            this.menuItemSelected += 1
          }
          this.changeMenuItemSelected()
          break

        case 'UP':
          if (this.menuItemSelected === 1) {
            this.menuItemSelected = 3
          } else {
            this.menuItemSelected -= 1
          }
          this.changeMenuItemSelected()
          break

        case 'ESC':
        case 'B':
          this.goTo('entry')
          break

        default:
          break
      }
    }
  }

  goTo(menu) {
    console.log(menu)
    switch (menu) {
      case 'create':
        this.changeMenu(CST.SCENES.MENU.MULTIPLAYER_CREATE, {
          currentMenuText: 'joining menu',
        })
        break
      case 'join':
        this.changeMenu(CST.SCENES.MENU.MULTIPLAYER_SERVER, {
          currentMenuText: 'Cum gang',
        })
        break
      case 'entry':
        this.changeMenu(CST.SCENES.MENU.ENTRY)
        break

      default:
        break
    }
  }

  changeMenu(to, config) {
    this.tweens.add({
      targets: this.menuSelected,
      alpha: 0,
      ease: 'Linear',
      duration: 100,
    })
    this.tweens.add({
      delay: 100,
      targets: [this.menuItemLocal, this.textLocal],
      x: -200,
      ease: Phaser.Math.Easing.Quadratic.In,
      duration: 200,
    })
    this.tweens.add({
      delay: 150,
      targets: [this.menuItemOnline, this.textOnline],
      x: -200,
      ease: Phaser.Math.Easing.Quadratic.In,
      duration: 200,
    })
    this.tweens.add({
      delay: 200,
      targets: [this.menuItemExit, this.textExit],
      x: -200,
      ease: Phaser.Math.Easing.Quadratic.In,
      duration: 200,
    })
    this.tweens.add({
      delay: 400,
      targets: this.blackScreen,
      alpha: 1,
      ease: 'Power2',
      duration: 200,
      onComplete: () => {
        this.scene.start(to, config || null)
        console.log(to, config)
        this.scene.get(CST.SCENES.INPUT).getCurrentScene(null)
      },
    })
  }

  changeMenuItemSelected(itemNumber) {
    this.textLocal.setStroke('#1d3817', 0)
    this.textOnline.setStroke('#3e1b42', 0)
    this.textExit.setStroke('#000', 0)

    if (itemNumber) {
      this.menuItemSelected = itemNumber
    }

    switch (itemNumber || this.menuItemSelected) {
      case 1:
        this.textLocal.setStroke('#FFFFFF', 4)
        this.menuSelected.setY(100)
        break

      case 2:
        this.textOnline.setStroke('#FFFFFF', 4)
        this.menuSelected.setY(150)
        break

      case 3:
        this.textExit.setStroke('#FFFFFF', 4)
        this.menuSelected.setY(200)
        break

      default:
        break
    }
  }
}

export default MenuMultiplayer
