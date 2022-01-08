import Phaser from 'phaser'
import { CST } from '../../CST.js'

import BackgroundEntry from '../../assets/images/ui/menu/bg-entry.png'
import BackgroundMain from '../../assets/images/ui/menu/bg-main_hd.png'
import ButtonBig from '../../assets/images/ui/menu/button-big.png'
import ButtonOptions from '../../assets/images/ui/menu/button-options.png'

import MenuBar from '../../assets/images/ui/menu/menu-bar.png'
import MenuSelected from '../../assets/images/ui/menu/menu-selected.png'
import MenuItem from '../../assets/images/ui/menu/menu-item.png'
import Cleaver from '../../assets/images/abilities/butcher/cleaver.png'
import CharacterPortraitMage from '../../assets/images/characters/mage/mage_temp_portrait.png'
import CharacterMage from '../../assets/images/characters/mage/mage_temp.png'
import CharacterWitch from '../../assets/spritesheets/characters/witch/character/B_witch_idle.png'
import CharacterPortraitWitch from '../../assets/spritesheets/characters/witch/character/B_witch.gif'
import CharacterButcher from '../../assets/images/characters/butcher/butcher-sprite.png'
import CharacterPortraitbutcher from '../../assets/images/characters/butcher/butcher_portrait.png'
import CharacterButcherRun from '../../assets/images/characters/butcher/butcher-run.png'
import WitchIdle from '../../assets/spritesheets/characters/witch/character/B_witch_idle.png'
import WitchRun from '../../assets/spritesheets/characters/witch/character/B_witch_run.png'
import WitchAttacks from '../../assets/spritesheets/characters/witch/character/B_witch_attack.png'
import Back from '../../assets/images/ui/menu/back.png'
import Ready from '../../assets/images/ui/menu/ready.png'
import mapGame from '../../assets/images/ui/map/map.svg'
import playersController from '../../assets/images/ui/menu/controller.png'
import playersKeyboard from '../../assets/images/ui/menu/keyboard.png'
import Dice from '../../assets/images/ui/character-select/dice.png'
import PlayerOneCursor from '../../assets/images/ui/menu/player-one-cursor.png'
import PlayerTwoCursor from '../../assets/images/ui/menu/player-two-cursor.png'
import PlayerThreeCursor from '../../assets/images/ui/menu/player-three-cursor.png'
import PlayerFourCursor from '../../assets/images/ui/menu/player-four-cursor.png'
import ServerSelector from '../../assets/images/ui/menu/server.png'
class MenuLoad extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.MENU.LOAD })
  }

  preload() {
    this.load.image(CST.IMAGE.MENU.ENTRY_BG, BackgroundEntry)
    this.load.image(CST.IMAGE.MENU.MAIN_BG, BackgroundMain)
    this.load.image(CST.IMAGE.UI.MENU.BUTTON_BIG, ButtonBig)
    this.load.image(CST.IMAGE.UI.MENU.BUTTON_OPTIONS, ButtonOptions)
    this.load.image(CST.IMAGE.UI.MENU.MENU_BAR, MenuBar)
    this.load.image(CST.IMAGE.UI.MENU.MENU_SELECTED, MenuSelected)
    this.load.image(CST.IMAGE.UI.MENU.MENU_ITEM, MenuItem)
    this.load.image(CST.IMAGE.UI.MENU.SERVER, ServerSelector)
    this.load.image(CST.IMAGE.UI.MENU.BACK, Back)
    this.load.image(CST.IMAGE.UI.MENU.READY, Ready)
    this.load.image(CST.IMAGE.MENU.P1_CURSOR, PlayerOneCursor)
    this.load.image(CST.IMAGE.MENU.P2_CURSOR, PlayerTwoCursor)
    this.load.image(CST.IMAGE.MENU.P3_CURSOR, PlayerThreeCursor)
    this.load.image(CST.IMAGE.MENU.P4_CURSOR, PlayerFourCursor)
    this.load.svg(CST.SCENES.MENU.MAP, mapGame)
    this.load.image(CST.IMAGE.MENU.PLAYERS_CONTROLLER, playersController)
    this.load.image(CST.IMAGE.MENU.PLAYERS_KEYBOARD, playersKeyboard)
    this.load.image(CST.IMAGE.MENU.DICE, Dice)
    this.load.image(
      CST.IMAGE.CHARACTER.BUTCHER.PORTRAIT,
      CharacterPortraitbutcher
    )
    this.load.image(CST.SPRITESHEET.CHARACTERS.MAGE.IMG, CharacterMage)
    this.load.image(CST.IMAGE.CHARACTER.MAGE.PORTRAIT, CharacterPortraitMage)
    this.load.image(CST.IMAGE.CHARACTER.WITCH.PORTRAIT, CharacterPortraitWitch)

    this.load.spritesheet(
      CST.SPRITESHEET.CHARACTERS.WITCH.SPR,
      CharacterWitch,
      {
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        repeat: true,
      }
    )

    this.load.spritesheet(
      CST.SPRITESHEET.CHARACTERS.WITCH.ANIMS.ATTACK,
      WitchAttacks,
      {
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 10,
        repeat: -1,
      }
    )

    this.load.spritesheet(
      CST.SPRITESHEET.CHARACTERS.WITCH.ANIMS.RUN,
      WitchRun,
      {
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 7,
        repeat: true,
      }
    )

    this.load.spritesheet(
      CST.SPRITESHEET.CHARACTERS.WITCH.ANIMS.IDLE,
      WitchIdle,
      {
        frameWidth: 48,
        frameHeight: 48,
        startFrame: 0,
        endFrame: 5,
        repeat: true,
      }
    )
    this.load.spritesheet(
      CST.SPRITESHEET.CHARACTERS.BUTCHER.SPR,
      CharacterButcher,
      {
        frameWidth: 32,
        frameHeight: 48,
        startFrame: 0,
      }
    )

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
    })
  }

  create() {
    this.scene.start(CST.SCENES.INPUT)
    this.scene.start(CST.SCENES.MENU.ENTRY)

    // this.scene.start(CST.SCENES.STAGES.LOAD, {
    //     stage: 0,
    //     characters: [
    //         {
    //             character: 0
    //         }
    //     ]
    // })
  }
}

export default MenuLoad
