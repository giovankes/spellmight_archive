import consola from 'consola'
import Phaser from 'phaser'
import io from 'socket.io-client'
import { uuid as v4 } from 'uuidv4'

import { CST } from '../../CST'
import MenuRectangle from '../../gameObjects/menu/menu-rectangle'
import ButtonOptions from '../../gameObjects/menu/options'
import PlayerController, { PLAYERS } from '../../playerControllers'

class MenuLogin extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.MENU.MULTIPLAYER_LOGIN,
      data: {},
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
  }
}

export default MenuLogin
