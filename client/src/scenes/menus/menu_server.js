import Phaser from 'phaser'

import { CST } from '../../CST'

class MenuServer extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.MENU.MULTIPLAYER_SERVER,
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
  }
}

export default MenuServer
