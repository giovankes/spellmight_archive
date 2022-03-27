import Phaser from 'phaser'
import io from 'socket.io-client'
import { CST } from '../../CST'

class MenuServer extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.MENU.MULTIPLAYER_SERVER,
    })
  }

  create() {
    this.socket = io('http://localhost:8081', {
      query: {
        action: 'fetch_rooms',
        username: 'lol',
      },
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
    this.add
      .image(10, 10, CST.IMAGE.UI.MENU.SERVER)
      .setOrigin(0)
      .setScale(0.6)
      .setDepth(0)
  }
}

export default MenuServer
