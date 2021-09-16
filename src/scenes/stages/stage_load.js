import Phaser from 'phaser'
import { CST } from '../../CST'

// Abilities & Frames
import AbilityFrameP1Ready from '../../assets/images/abilities/frames/p1-ready.png'
import AbilityFrameP1Cooldown from '../../assets/images/abilities/frames/p1-cooldown.png'
import AbilityFrameP2Ready from '../../assets/images/abilities/frames/p2-ready.png'
import AbilityFrameP2Cooldown from '../../assets/images/abilities/frames/p2-cooldown.png'
import AbilityFrameP3Ready from '../../assets/images/abilities/frames/p3-ready.png'
import AbilityFrameP3Cooldown from '../../assets/images/abilities/frames/p3-cooldown.png'
import AbilityFrameP4Ready from '../../assets/images/abilities/frames/p4-ready.png'
import AbilityFrameP4Cooldown from '../../assets/images/abilities/frames/p4-cooldown.png'
import MageAbilityOneIcon from '../../assets/images/abilities/mage/ability-1-icon.png'
import MageAbilityTwoIcon from '../../assets/images/abilities/mage/ability-2-icon.png'
import MageUltimateIcon from '../../assets/images/abilities/mage/ultimate-icon.png'
import WitchAbilityOneIcon from '../../assets/images/abilities/witch/ability-1-icon.png'
import WitchAbilityTwoIcon from '../../assets/images/abilities/witch/ability-2-icon.png'
import WitchUltimateIcon from '../../assets/images/abilities/witch/ultimate-icon.png'
import ButcherAbilityOneIcon from '../../assets/images/abilities/butcher/ability-1-icon.png'
import ButcherAbilityTwoIcon from '../../assets/images/abilities/butcher/ability-2-icon.png'
import ButcherUltimateIcon from '../../assets/images/abilities/butcher/ultimate-icon.png'

// Character Elements
import DustSprint from '../../assets/spritesheets/characters/dust-sprint.png'
import DustDodge from '../../assets/spritesheets/characters/dust-dodge.png'
import DustJump from '../../assets/spritesheets/characters/dust-jump.png'
import Hit from '../../assets/spritesheets/characters/hit.png'
import Shield from '../../assets/spritesheets/characters/shield.png'

import MageSpr from '../../assets/images/characters/mage/mage_temp.png'
import MageFireball from '../../assets/images/abilities/mage/fireball.png'
import MageFireballExplosion from '../../assets/spritesheets/characters/mage/fireball-explosion.png'
import MageFireballParticle from '../../assets/images/abilities/mage/fire-particle.png'
import MageCasting from '../../assets/spritesheets/characters/mage/casting.png'
import MageBlink from '../../assets/spritesheets/characters/mage/blink.png'

import WitchAerialBurst from '../../assets/spritesheets/characters/witch/abilities/aerial-burst.png'

import ButcherCleaver from '../../assets/images/abilities/butcher/cleaver.png'
import ButcherHook from '../../assets/images/abilities/butcher/hook-01.png'
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
    this.data.characters.forEach((character, index) => {
      if (!this.charactersToLoad.includes(character.character)) {
        this.charactersToLoad.push(character.character)
      }
      switch (index) {
        case 0:
          this.load.image(
            CST.ABILITIES.FRAMES.P1.COOLDOWN,
            AbilityFrameP1Cooldown
          )
          this.load.image(CST.ABILITIES.FRAMES.P1.READY, AbilityFrameP1Ready)
          break
        case 1:
          this.load.image(
            CST.ABILITIES.FRAMES.P2.COOLDOWN,
            AbilityFrameP2Cooldown
          )
          this.load.image(CST.ABILITIES.FRAMES.P2.READY, AbilityFrameP2Ready)
          break
        case 2:
          this.load.image(
            CST.ABILITIES.FRAMES.P3.COOLDOWN,
            AbilityFrameP3Cooldown
          )
          this.load.image(CST.ABILITIES.FRAMES.P3.READY, AbilityFrameP3Ready)
          break
        case 3:
          this.load.image(
            CST.ABILITIES.FRAMES.P4.COOLDOWN,
            AbilityFrameP4Cooldown
          )
          this.load.image(CST.ABILITIES.FRAMES.P4.READY, AbilityFrameP4Ready)
          break
        default:
          break
      }
    })
    if (this.charactersToLoad.includes(1)) {
      this.load.image(CST.SPRITESHEET.CHARACTERS.MAGE.IMG, MageSpr)
      this.load.spritesheet(
        CST.ABILITIES.MAGE.FIREBALL.TEXTURE_KEY,
        MageFireball,
        {
          frameWidth: 64,
          frameHeight: 64,
        }
      )
      this.load.spritesheet(
        CST.SPRITESHEET.CHARACTERS.MAGE.ABILITIES.FIREBALL.EXPLOSION.IMG,
        MageFireballExplosion,
        {
          frameWidth: 64,
          frameHeight: 64,
        }
      )
      this.load.image(
        CST.SPRITESHEET.CHARACTERS.MAGE.ABILITIES.FIREBALL.PARTICLE,
        MageFireballParticle
      )
      this.load.spritesheet(
        CST.SPRITESHEET.CHARACTERS.MAGE.CASTING.IMG,
        MageCasting,
        {
          frameWidth: 100,
          frameHeight: 100,
        }
      )
      this.load.spritesheet(CST.ABILITIES.MAGE.BLINK.TEXTURE_KEY, MageBlink, {
        frameWidth: 150,
        frameHeight: 150,
      })
      this.load.image(CST.ABILITIES.MAGE.FIREBALL.ICON, MageAbilityOneIcon)
      this.load.image(CST.ABILITIES.MAGE.BLINK.ICON, MageAbilityTwoIcon)
      this.load.image(CST.ABILITIES.MAGE.BEAM.ICON, MageUltimateIcon)
    }
    if (this.charactersToLoad.includes(2)) {
      this.load.spritesheet(
        CST.SPRITESHEET.CHARACTERS.WITCH.ABILITIES.AERIAL_BURST.IMG,
        WitchAerialBurst,
        {
          frameWidth: 135,
          frameHeight: 203,
        }
      )
      this.load.image(CST.ABILITIES.WITCH.HEX_BLAST.ICON, WitchAbilityOneIcon)
      this.load.image(CST.ABILITIES.WITCH.NEEDLES.ICON, WitchAbilityTwoIcon)
      this.load.image(CST.ABILITIES.WITCH.METEOR_RAIN.ICON, WitchUltimateIcon)
    }
    if (this.charactersToLoad.includes(3)) {
      this.load.image(CST.ABILITIES.BUTCHER.CLEAVER.ICON, ButcherAbilityOneIcon)
      this.load.spritesheet(
        CST.SPRITESHEET.CHARACTERS.BUTCHER.ABILITIES.CLEAVER.IMG,
        ButcherCleaver,
        {
          frameWidth: 96,
          frameHeight: 96,
        }
      )
      this.load.spritesheet(
        CST.SPRITESHEET.CHARACTERS.BUTCHER.ABILITIES.HOOK.IMG,
        ButcherHook,
        {
          frameWidth: 102,
          frameHeight: 102,
        }
      )
      this.load.image(CST.ABILITIES.BUTCHER.HOOK.ICON, ButcherAbilityTwoIcon)
      this.load.image(CST.ABILITIES.BUTCHER.RAGE.ICON, ButcherUltimateIcon)
    }
    this.load.spritesheet(
      CST.SPRITESHEET.CHARACTERS.DUST.SPRINT.IMG,
      DustSprint,
      {
        frameWidth: 73,
        frameHeight: 52,
      }
    )
    this.load.spritesheet(
      CST.SPRITESHEET.CHARACTERS.DUST.DODGE.IMG,
      DustDodge,
      {
        frameWidth: 100,
        frameHeight: 50,
      }
    )
    this.load.spritesheet(CST.SPRITESHEET.CHARACTERS.DUST.JUMP.IMG, DustJump, {
      frameWidth: 80,
      frameHeight: 20,
    })
    this.load.spritesheet(CST.SPRITESHEET.CHARACTERS.SHIELD.IMG, Shield, {
      frameWidth: 51,
      frameHeight: 47,
    })
    this.load.spritesheet(CST.SPRITESHEET.CHARACTERS.HIT.IMG, Hit, {
      frameWidth: 128,
      frameHeight: 96,
    })

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
      this.anims.create({
        key: CST.ABILITIES.MAGE.BLINK.ANIMATION_KEY_START,
        frames: this.anims.generateFrameNumbers(
          CST.ABILITIES.MAGE.BLINK.TEXTURE_KEY,
          {
            start: 0,
            end: 4,
          }
        ),
        frameRate: 6,
        repeat: 0,
      })
      this.anims.create({
        key: CST.ABILITIES.MAGE.BLINK.ANIMATION_KEY_END,
        frames: this.anims.generateFrameNumbers(
          CST.ABILITIES.MAGE.BLINK.TEXTURE_KEY,
          {
            start: 4,
            end: 8,
          }
        ),
        frameRate: 4,
        repeat: 0,
      })
      this.anims.create({
        key: CST.SPRITESHEET.CHARACTERS.MAGE.ABILITIES.FIREBALL.EXPLOSION.ANIM,
        frames: this.anims.generateFrameNumbers(
          CST.SPRITESHEET.CHARACTERS.MAGE.ABILITIES.FIREBALL.EXPLOSION.IMG,
          {
            start: 0,
            end: 7,
          }
        ),
        frameRate: 14,
        repeat: 0,
      })
      this.anims.create({
        key: CST.SPRITESHEET.CHARACTERS.MAGE.CASTING.ANIM,
        frames: this.anims.generateFrameNumbers(
          CST.SPRITESHEET.CHARACTERS.MAGE.CASTING.IMG,
          {
            start: 0,
            end: 71,
          }
        ),
        frameRate: 60,
        repeat: 0,
      })
    }
    if (this.charactersToLoad.includes(2)) {
      this.anims.create({
        key: CST.SPRITESHEET.CHARACTERS.WITCH.ABILITIES.AERIAL_BURST.ANIM,
        frames: this.anims.generateFrameNames(
          CST.SPRITESHEET.CHARACTERS.WITCH.ABILITIES.AERIAL_BURST.IMG,
          {
            start: 0,
            end: 6,
          }
        ),
        repeat: -1,
        frameRate: 14,
      })
    }
    if (this.charactersToLoad.includes(3)) {
      this.anims.create({
        key: CST.SPRITESHEET.CHARACTERS.BUTCHER.ABILITIES.HOOK.ANIM,
        frames: this.anims.generateFrameNames(
          CST.SPRITESHEET.CHARACTERS.BUTCHER.ABILITIES.HOOK.IMG,
          {
            start: 0,
            end: 0,
          }
        ),
        frameRate: 1,
        repeat: -1,
      })
      this.anims.create({
        key: CST.SPRITESHEET.CHARACTERS.BUTCHER.ABILITIES.CLEAVER.ANIM,
        frames: this.anims.generateFrameNames(
          CST.SPRITESHEET.CHARACTERS.BUTCHER.ABILITIES.CLEAVER.IMG,
          {
            start: 0,
            end: 0,
          }
        ),
        frameRate: 1,
        repeat: -1,
      })
    }

    this.anims.create({
      key: CST.SPRITESHEET.CHARACTERS.DUST.SPRINT.ANIM,
      frames: this.anims.generateFrameNames(
        CST.SPRITESHEET.CHARACTERS.DUST.SPRINT.IMG,
        {
          start: 0,
          end: 6,
        }
      ),
      frameRate: 14,
      repeat: 0,
    })
    this.anims.create({
      key: CST.SPRITESHEET.CHARACTERS.DUST.DODGE.ANIM,
      frames: this.anims.generateFrameNames(
        CST.SPRITESHEET.CHARACTERS.DUST.DODGE.IMG,
        {
          start: 0,
          end: 6,
        }
      ),
      frameRate: 14,
      repeat: 0,
    })
    this.anims.create({
      key: CST.SPRITESHEET.CHARACTERS.DUST.JUMP.ANIMS.JUMP,
      frames: this.anims.generateFrameNames(
        CST.SPRITESHEET.CHARACTERS.DUST.JUMP.IMG,
        {
          start: 0,
          end: 6,
        }
      ),
      frameRate: 14,
      repeat: 0,
    })
    this.anims.create({
      key: CST.SPRITESHEET.CHARACTERS.DUST.JUMP.ANIMS.LAND,
      frames: this.anims.generateFrameNames(
        CST.SPRITESHEET.CHARACTERS.DUST.JUMP.IMG,
        {
          start: 0,
          end: 5,
        }
      ),
      frameRate: 24,
      repeat: 0,
    })
    this.anims.create({
      key: CST.SPRITESHEET.CHARACTERS.SHIELD.ANIM,
      frames: this.anims.generateFrameNumbers(
        CST.SPRITESHEET.CHARACTERS.SHIELD.IMG,
        {
          start: 0,
          end: 8,
        }
      ),
      frameRate: 18,
      repeat: -1,
    })
    this.anims.create({
      key: CST.SPRITESHEET.CHARACTERS.HIT.ANIM,
      frames: this.anims.generateFrameNumbers(
        CST.SPRITESHEET.CHARACTERS.HIT.IMG,
        {
          start: 3,
          end: 8,
        }
      ),
      frameRate: 14,
      repeat: 0,
    })

    if (this.data.stage === 0)
      this.changeScene(CST.SCENES.STAGES.FIELD, this.data)
    if (this.data.stage === 1)
      this.changeScene(CST.SCENES.STAGES.STONEHENGE, this.data)
    //TODO: FIX AND TURN INTERFACE BACK ON
    this.scene.start(CST.SCENES.INTERFACE)
  }

  changeScene(to, config) {
    this.scene.start(to, config || null)
    this.scene.get(CST.SCENES.INPUT).getCurrentScene(null)
  }
}

export default StageLoad
