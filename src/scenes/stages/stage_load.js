import Phaser from 'phaser'
import { CST } from '../../CST'

// Character Elements
import MageSpr from '../../assets/images/characters/mage/mage_temp.png'
import Fireball from '../../assets/images/abilities/mage/fireball.png'

// Stage Elements
import FieldBG from '../../assets/stages/THE_FIELD/BG/BG.png'
import FieldFG from '../../assets/stages/THE_FIELD/FG/FG_GRASS.png'
import FieldCollGrass from '../../assets/stages/THE_FIELD/COLL/COLL_GRASS.png'
import FieldCollPlane from '../../assets/stages/THE_FIELD/COLL/COLL_PLANE.png'

import StonehengeFG from '../../assets/stages/STONEHENGE/FG/front.png'
import StonehengeBG1 from '../../assets/stages/STONEHENGE/BG/middle.png'
import StonehengeBG2 from '../../assets/stages/STONEHENGE/BG/back.png'
import StonehengeBG3 from '../../assets/stages/STONEHENGE/BG/bg.png'
import StonehengeRain from '../../assets/stages/STONEHENGE/extra/rain.png'

// UI Elements
import TimerUI from '../../assets/images/ui/timer.png'
import CharacterInfoUI from '../../assets/images/ui/character-info.png'
import CharacterArrowRight from '../../assets/images/characters/arrowright.png'

class StageLoad extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.STAGES.LOAD })
    this.data = {}
  }

  init(data) {
    this.data = data
  }

  preload() {
    // Load selected stage assets
    if (this.data.stage === 0) {
      this.load.image(CST.IMAGE.STAGES.FIELD.BG, FieldBG)
      this.load.image(CST.IMAGE.STAGES.FIELD.FG, FieldFG)
      this.load.image(CST.IMAGE.STAGES.FIELD.COLL_GRASS, FieldCollGrass)
      this.load.image(CST.IMAGE.STAGES.FIELD.COLL_PLANE, FieldCollPlane)
    }
    if (this.data.stage === 1) {
      this.load.image(CST.IMAGE.STAGES.STONEHENGE.FG, StonehengeFG)
      this.load.image(CST.IMAGE.STAGES.STONEHENGE.BG1, StonehengeBG1)
      this.load.image(CST.IMAGE.STAGES.STONEHENGE.BG2, StonehengeBG2)
      this.load.image(CST.IMAGE.STAGES.STONEHENGE.BG3, StonehengeBG3)
      this.load.image(CST.IMAGE.STAGES.STONEHENGE.RAIN, StonehengeRain)
    }

    // Load selected character assets
    this.charactersToLoad = []
    this.data.characters.forEach((character) => {
      if (!this.charactersToLoad.includes(character.character)) {
        this.charactersToLoad.push(character.character)
      }
    })
    if (this.charactersToLoad.includes(1)) {
      this.load.image(CST.SPRITESHEET.CHARACTERS.MAGE, MageSpr)
      this.load.spritesheet(CST.ABILITIES.MAGE.FIREBALL.TEXTURE_KEY, Fireball, {
        frameWidth: 64,
        frameHeight: 64,
      })
    }

    // Load UI
    this.load.image(CST.IMAGE.UI.INGAME.CHARACTER_INFO, CharacterInfoUI)
    this.load.image(CST.IMAGE.UI.INGAME.TIMER, TimerUI)
    this.load.image(CST.IMAGE.UI.INGAME.ARROW_RIGHT, CharacterArrowRight)
  }

  create() {
    if (this.charactersToLoad.includes(1)) {
      this.anims.create({
        key: CST.ABILITIES.MAGE.FIREBALL.ANIMATION_KEY,
        frames: this.anims.generateFrameNumbers(
          CST.ABILITIES.MAGE.FIREBALL.TEXTURE_KEY,
          {
            start: 0,
            end: 7,
          }
        ),
        frameRate: 10,
        repeat: -1,
      })
    }

    if (this.data.stage === 0)
      this.changeScene(CST.SCENES.STAGES.FIELD, this.data)
    if (this.data.stage === 1)
      this.changeScene(CST.SCENES.STAGES.STONEHENGE, this.data)
    //TODO: FIX AND TURN INTERFACE BACK ON
    // this.scene.start(CST.SCENES.INTERFACE)
  }

  changeScene(to, config) {
    this.scene.start(to, config || null)
    this.scene.get(CST.SCENES.INPUT).getCurrentScene(null)
  }
}

export default StageLoad
