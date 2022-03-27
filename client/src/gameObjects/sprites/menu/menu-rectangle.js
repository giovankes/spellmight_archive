import Phaser from 'phaser'
import { CST } from '../../../CST'

class MenuRectangle extends Phaser.GameObjects.Image {
  constructor({ Scene, currentMenuText }) {
    super(Scene, 0, 0, CST.IMAGE.UI.MENU.MENU_BAR)

    this.setOrigin(0)

    Scene.add.existing(this)
    Scene.add.text(30, 15, currentMenuText, {
      fontFamily: 'Adventurer',
      fontSize: 26,
      stroke: '#2a2f1b',
      strokeThickness: 5,
    })
  }
}

export default MenuRectangle
