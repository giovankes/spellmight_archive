import Phaser from 'phaser'
import { uuid as v4 } from 'uuidv4'
import { CST } from '../../CST'
import PlayerController, { PLAYERS } from '../../playerControllers'
import io from 'socket.io-client'
import ButtonOptions from '../../gameObjects/menu/options'
import MenuRectangle from '../../gameObjects/menu/menu-rectangle'
import consola from 'consola'

class MenuCreate extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.MENU.MULTIPLAYER_CREATE,
      data: {},
      menuItemsX: 120,
    })
  }

  create() {
    this.socket = io('http://localhost:8081', {
      query: {
        action: 'create',
        userId: v4(),
        username: 'cum',
      },
    })

    this.socket.on('connect', () => {
      consola.success('Connected')
    })

    this.socket.on('room created', (data) => {
      this.data = data
      this.updateMenuText(data.username)
      this.updateConnectedPlayers(Object.values(data.connected_clients))
    })

    this.add
      .image(0, 0, CST.IMAGE.MENU.MAIN_BG)
      .setOrigin(0)
      .setScale(0.4)
      .setDepth(0),
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

    this.menuItemPlayers = this.add
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

    this.textOnline = this.add
      .text(menuItemsX + 4, 150, 'Play', {
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

    this.menuSelected = this.add
      .image(menuItemsX, 100, CST.IMAGE.UI.MENU.MENU_SELECTED)
      .setOrigin(0.5)
      .setDepth(2)

    this.buttonOptions = new ButtonOptions({ Scene: this }).setDepth(1)

    let menuRectangle = new MenuRectangle({
      Scene: this,
      currentMenuText: this.data.username ? this.data.username : 'Loading...',
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
      .getCurrentScene(CST.SCENES.MENU.MULTIPLAYER_CREATE)
  }

  updateMenuText(username) {
    let menuRectangle = new MenuRectangle({
      Scene: this,
      currentMenuText: this.data.username ? this.data.username : 'Loading...',
    })
  }
  updateConnectedPlayers(players) {
    const menuItemsX = 120
    console.log(players.length.toString)
    this.textPlayers = this.add
      .text(
        menuItemsX + 8,
        100,
        players ? players.length.toString() : 'Loading...',
        {
          fontFamily: 'Superscript',
          fontSize: 20,
          color: '#302421',
          stroke: '#FFFFFF',
          strokeThickness: 4,
          resolution: 5,
        }
      )
      .setOrigin(0.5)
      .setDepth(1)
  }
}

export default MenuCreate
