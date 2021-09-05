import Phaser from 'phaser'
import { CST } from '../../CST'

import MenuRectangle from '../../gameObjects/menu/menu-rectangle'


class MenuCharacter extends Phaser.Scene {
    constructor() {
        super({ key: CST.SCENES.MENU.CHARACTER })

        this.characters = []
    }

    init(data) {
        if (data.currentMenuText) {
            this.currentMenuText = data.currentMenuText
        }
    }

    create() {
        this.menuRectangle = new MenuRectangle({
            Scene: this,
            currentMenuText: this.currentMenuText || 'Character Select'
        })

        const playerTitleY = 60
        const playerTitleStyle = {
            fontSize: 16,
            fontFamily: 'Superscript',
            color: '#FFFFFF',
            resolution: 6
        }
        
        const playerOutlineY = 80
        const playerOutlineWidth = 80
        const playerOutlineHeight = 140

        this.bottomTitle = this.add.text(
            this.game.renderer.width / 2,
            this.game.renderer.height - 25,
            'Select Treasure Hunter',
            {
                fontSize: 20,
                fontFamily: 'Superscript',
                color: '#FFFFFF',
                resolution: 4
            }
        ).setOrigin(0.5)

        const playerOneTitle = this.add.text(
            105,
            playerTitleY,
            'P1',
            playerTitleStyle
        ).setOrigin(0.5)
        const playerOneOutline = this.add.rectangle(
            60,
            playerOutlineY,
            playerOutlineWidth,
            playerOutlineHeight,
            0,
            0
        ).setStrokeStyle(
            4,
            0xFFFFFF
        ).setOrigin(0)
        const magePortraitTemp = this.add.image(
            65,
            playerOutlineY + 5,
            CST.IMAGE.CHARACTER.MAGE.PORTRAIT
        ).setScale(0.2).setOrigin(0).setInteractive().on('pointerup', () => {
            this.scene.start(CST.SCENES.MENU.STAGES, {
                character: 1
            })
        })
        this.playerOne = this.add.group([ playerOneTitle, playerOneOutline ])

        const playerTwoTitle = this.add.text(
            195,
            playerTitleY,
            'P2',
            playerTitleStyle
        ).setOrigin(0.5)
        const playerTwoOutline = this.add.rectangle(
            150,
            playerOutlineY,
            playerOutlineWidth,
            playerOutlineHeight,
            0,
            0
        ).setStrokeStyle(
            4,
            0xFFFFFF
        ).setOrigin(0)
        this.playerTwo = this.add.group([ playerTwoTitle, playerTwoOutline ])

        const playerThreeTitle = this.add.text(
            285,
            playerTitleY,
            'P3',
            playerTitleStyle
        ).setOrigin(0.5)
        const playerThreeOutline = this.add.rectangle(
            240,
            playerOutlineY,
            playerOutlineWidth,
            playerOutlineHeight,
            0,
            0
        ).setStrokeStyle(
            4,
            0xFFFFFF
        ).setOrigin(0)
        this.playerThree = this.add.group([ playerThreeTitle, playerThreeOutline ])

        const playerFourTitle = this.add.text(
            375,
            playerTitleY,
            'P4',
            playerTitleStyle
        ).setOrigin(0.5)
        const playerFourOutline = this.add.rectangle(
            330,
            playerOutlineY,
            playerOutlineWidth,
            playerOutlineHeight,
            0,
            0
        ).setStrokeStyle(
            4,
            0xFFFFFF
        ).setOrigin(0)
        this.playerFour = this.add.group([ playerFourTitle, playerFourOutline ])
    }
}

export default MenuCharacter
