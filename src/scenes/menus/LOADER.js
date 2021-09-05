import Phaser from 'phaser'
import { CST } from '../../CST.js'

import BackgroundEntry from '../../assets/images/ui/menu/bg-entry.png'
import BackgroundMain from '../../assets/images/ui/menu/bg-main_hd.png'
import ButtonBig from '../../assets/images/ui/menu/button-big.png'
import ButtonOptions from '../../assets/images/ui/menu/button-options.png'
import MenuBar from '../../assets/images/ui/menu/menu-bar.png'
import MenuSelected from '../../assets/images/ui/menu/menu-selected.png'
import MenuItem from '../../assets/images/ui/menu/menu-item.png'
import CharacterPortraitMage from '../../assets/images/characters/mage_temp_portrait.png'
import CharacterMage from '../../assets/images/characters/mage_temp.png'
import Back from '../../assets/images/ui/menu/back.png'
import Ready from '../../assets/images/ui/menu/ready.png'
import mapGame from '../../assets/images/ui/map/map.svg'
class MenuLoad extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.MENU.LOAD })
  }

  preload() {
    this.load.image(CST.IMAGE.MENU.ENTRY_BG, BackgroundEntry)
    this.load.image(CST.IMAGE.MENU.MAIN_BG, BackgroundMain)
    this.load.image(CST.IMAGE.UI.MENU.BUTTON_BIG, ButtonBig)
    this.load.image(CST.IMAGE.UI.MENU.BUTTON_OPTIONS, ButtonOptions)
    this.load.image(CST.SPRITESHEET.CHARACTERS.MAGE, CharacterMage)
    this.load.image(CST.IMAGE.UI.MENU.MENU_BAR, MenuBar)
    this.load.image(CST.IMAGE.UI.MENU.MENU_SELECTED, MenuSelected)
    this.load.image(CST.IMAGE.UI.MENU.MENU_ITEM, MenuItem)
    this.load.image(CST.IMAGE.UI.MENU.BACK, Back)
    this.load.image(CST.IMAGE.CHARACTER.MAGE.PORTRAIT, CharacterPortraitMage)
    this.load.image(CST.IMAGE.UI.MENU.READY, Ready)
    this.load.svg(CST.SCENES.MENU.MAP, mapGame)
    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff,
      },
    })

    this.load.on('progress', (percent) => {
      loadingBar.fillRect(
        0,
        this.game.renderer.height / 2,
        this.game.renderer.width * percent,
        50
      )
      console.log(percent)
    })

    this.load.on('complete', () => {
      console.log('done')
    })
  }

  create() {
    // this.scene.start(CST.SCENES.STAGES.LOAD, {
    //     character: 1,
    //     stage: 1
    // })
    this.scene.start(CST.SCENES.MENU.ENTRY)
  }
}

export default MenuLoad
