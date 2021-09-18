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
      console.log(this.socket.io)

      consola.success('Connected')
    })
    this.socket.on('room created', (data) => {
      console.log('xd')
      this.data = data
    })
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

    this.buttonOptions = new ButtonOptions({ Scene: this }).setDepth(1)

    const menuRectangle = new MenuRectangle({
      Scene: this,
      currentMenuText: 'Create shit',
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
}

export default MenuCreate
