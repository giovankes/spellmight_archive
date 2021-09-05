import Phaser from 'phaser'
import { CST } from '../../CST.js'

import MenuBackgroundImage from '../../assets/images/temp_menu_bg.jpg'
import LogoImage from '../../assets/images/logo.png'
import ButtonPlay from '../../assets/images/button_play.png'
import ButtonOptions from '../../assets/images/button_options.png'

class MenuLoad extends Phaser.Scene {
    constructor() {
        super({ key: CST.SCENES.MENU.LOAD })
    }

    preload() {
        this.load.image(CST.IMAGE.MENU.MAIN_BG, MenuBackgroundImage)
        this.load.image(CST.IMAGE.MENU.LOGO, LogoImage)
        this.load.image(CST.IMAGE.MENU.BTN_PLAY, ButtonPlay)
        this.load.image(CST.IMAGE.MENU.BTN_OPTIONS, ButtonOptions)

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })

        this.load.on('progress', (percent) => {
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50)
            console.log(percent)
        })

        this.load.on('complete', () => {
            console.log('done')
        })
    }


    create() {
        this.scene.start(CST.SCENES.MENU.MAIN)


    }
}

export default MenuLoad