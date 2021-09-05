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
        const mageTextY = 200 
        const playerTitleY = 60
        const playerTitleStyle = {
            fontSize: 16,
            fontFamily: 'Superscript',
            color: '#FFFFFF',
            resolution: 6
        }

        const nameStyle ={
            fontSize: 10,
            fontFamily: 'Superscript',
            color: '#FFFFFF',
            resolution:6
        }

        const readyStyle = {
            fontSize:8,
            fontFamily:'Superscript',
            color:'#FFFFFF',
            resolution:6
        }
        
        const playerOutlineY = 80
        const playerOutlineWidth = 80
        const playerOutlineHeight = 140
        

        //Portrait
        const portraitOutlineY = 85
        const portraitOutlineWidth = 35
        const portraitOutlineHeight = 35

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


        const portraitOutline = this.add.rectangle (
            65,
            portraitOutlineY,
            portraitOutlineHeight,
            portraitOutlineWidth,
            0,
            0
        ).setStrokeStyle(
            4,
            0xFFFFFF
        ).setOrigin(0).setVisible(false)
        const playerOneTitle = this.add.text(
            105,
            playerTitleY,
            'P1',
            playerTitleStyle,
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
        const charText = this.add.text(
            70,
            mageTextY,
            'Dark mage',
            nameStyle
            
        ).setVisible(false)
            
        const treasureHunter = this.add.image(
            60,
            playerOutlineY + 20,
            CST.SPRITESHEET.CHARACTERS.MAGE
        ).setScale(0.7).setOrigin(0).setInteractive().setVisible(false)

        const Back = this.add.image(
            60,
            playerOutlineY ,
            CST.IMAGE.UI.MENU.BACK
        ).setScale(0.06).setOrigin(0).setInteractive().setVisible(false).on('pointerup', ()=>{
            treasureHunter.setVisible(false)
            magePortraitTemp.setVisible(true)
            Back.setVisible(false)
            charReady.setVisible(false)
            readyUp.setVisible(false)

        })
        
       const charReady = this.add.text(
            90,
            mageTextY / 2 - 15,
            'Dark mage',
            readyStyle,
            
        ).setVisible(false)

        const readyUp = this.add.image(
            64,
            mageTextY - 15,
            CST.IMAGE.UI.MENU.READY
        ).setScale(0.15).setOrigin(0).setInteractive().setVisible(false).on('pointerup', ()=>{
            this.scene.start(CST.SCENES.STAGES.LOAD,{
                character:1,
                stage:1
            })
        })

        const magePortraitTemp = this.add.image(
            65,
            playerOutlineY + 5,
            CST.IMAGE.CHARACTER.MAGE.PORTRAIT
        ).setScale(0.2).setOrigin(0).setInteractive().setVisible(true).on('pointerover', ()=>{
            charText.setVisible(true)
            portraitOutline.setVisible(true)
        }).on('pointerout', () => {
            charText.setVisible(false)
            portraitOutline.setVisible(false)
        }).on('pointerup', () => {
            treasureHunter.setVisible(true)
            magePortraitTemp.setVisible(false)
            charReady.setVisible(true)
            Back.setVisible(true)
            readyUp.setVisible(true)
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


        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    }

    startScene(){
        this.scene.start(CST.SCENES.MENU.STAGES)
    }

    enterGame(){
        this.scene.start(CST.SCENES.STAGES.LOAD,{
            character:1,
            stage:1
        })
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.enter)){
            this.enterGame()
        }
    }
}

export default MenuCharacter
