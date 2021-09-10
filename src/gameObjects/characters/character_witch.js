import Phaser from 'phaser'
import { CST } from '../../CST'
import Character from './character'

import StaticHitbox from '../attacks-abilities/static'
import Projectile from '../attacks-abilities/projectile'

class WitchCharacter extends Character {
  constructor({ Scene, x, y, isPlayer, index }) {
    // Write attacks here, pass them in to the super()
    const attacks = {
      attackLight: {
        neutral: {
          maxCombo: 3,
          currentCombo: 0,
          exec: (direction) => {
            let x = 0
            direction ? (x = 18) : (x = 0)
            const hitbox = new StaticHitbox({
              Scene,
              x: this.body.x + x,
              y: this.body.y + 10,
              height: 8,
              width: 8,
              depth: 2,
              life: 50,
            }).getBounds()

            return {
              hitbox,
              data: {
                hitMultiplier: 0.1,
                velocityX: 100,
                velocityY: -100,
              },
            }
          },
        },
        forward: {
          maxCombo: 1,
          currentCombo: 0,
          exec: () => {},
        },
        up: {
          maxCombo: 1,
          currentCombo: 0,
          exec: () => {},
        },
        down: {
          maxCombo: 1,
          currentCombo: 0,
          exec: () => {},
        },
      },
      attackHeavy: {
        neutral: {
          maxCombo: 3,
          currentCombo: 0,
          exec: (direction) => {
            let x = 0
            direction ? (x = 20) : (x = -30)
            const hitbox = new StaticHitbox({
              Scene,
              x: this.body.x + x,
              y: this.body.y + 10,
              height: 8,
              width: 8,
              depth: 2,
              life: 50,
            }).getBounds()

            return {
              hitbox,
              data: {
                hitMultiplier: 0.2,
                velocityX: 100,
                velocityY: -100,
              },
            }
          },
        },
        forward: {
          maxCombo: 1,
          currentCombo: 0,
          exec: () => {},
        },
        up: {
          maxCombo: 1,
          currentCombo: 0,
          exec: () => {},
        },
        down: {
          maxCombo: 1,
          currentCombo: 0,
          exec: () => {},
        },
      },
      abilityOne: {
        cooldown: {
          amount: 1400,
          canFire: true,
          timer: null,
        },
        castTime: 500,
        exec: (facingRight) => {
          if (!this.CharacterConfig.attacks.abilityOne.cooldown.canFire) {
            return
          }
          this.CharacterConfig.attacks.abilityOne.cooldown.canFire = false
          let x
          facingRight ? (x = 40) : (x = -15)
          this.casting = true

          Scene.time.delayedCall(
            this.CharacterConfig.attacks.abilityOne.castTime,
            () => {
              this.casting = false

              new Projectile({
                Scene,
                x: this.x + x,
                y: this.y + 10,
                textureKey:
                  CST.SPRITESHEET.CHARACTERS.WITCH.ABILITIES.AERIAL_BURST.IMG,
                animationKey:
                  CST.SPRITESHEET.CHARACTERS.WITCH.ABILITIES.AERIAL_BURST.ANIM,
                maxVelocity: {
                  x: 600,
                  y: 0,
                },
                acceleration: {
                  x: 0,
                  y: 0,
                },
                scale: 0.4,
                facingRight,
                id: this.id,
                hitDetails: {
                  hitMultiplier: 0.3,
                  velocityX: 200,
                  velocityY: -200,
                  shake: 0.008,
                },
              })

              this.CharacterConfig.attacks.abilityOne.cooldown.timer =
                Scene.time.delayedCall(
                  this.CharacterConfig.attacks.abilityOne.cooldown.amount,
                  () => {
                    this.CharacterConfig.attacks.abilityOne.cooldown.canFire = true
                  }
                )
            }
          )
        },
      },
      abilityTwo: {
        cooldown: 4000,
        exec: () => {},
      },
      ultimate: {
        cooldown: 4000,
        exec: () => {},
      },
    }

    const movementAnimations = {
      idle: () => {
        this.sprite.play(CST.SPRITESHEET.CHARACTERS.WITCH.ANIMS.IDLE)
      },
      run: () => {
        this.sprite.play(CST.SPRITESHEET.CHARACTERS.WITCH.ANIMS.RUN)
      },
      jump: () => {
        this.sprite.play(CST.SPRITESHEET.CHARACTERS.WITCH.ANIMS.JUMP)
      },
    }

    const spr = CST.SPRITESHEET.CHARACTERS.WITCH.SPR

    super({
      // Edittable values
      maxJumps: 2,
      index,
      jumpHeight: 400,
      accelerationX: 1500,
      accelerationDown: 3000,
      drag: 1500,
      normalVelocity: 150,
      sprintVelocity: 250,
      collisionBodySize: {
        width: 18,
        height: 41,
        offsetX: 15,
        offsetY: 8,
      },
      scale: 1,

      // Do not touch
      Scene: Scene,
      x: x,
      y: y,
      sprite: spr,
      isPlayer: isPlayer,
      anims: [
        {
          key: CST.SPRITESHEET.CHARACTERS.WITCH.ANIMS.IDLE,
          frames: {
            key: spr,
            startEnd: { start: 0, end: 0 },
          },
          frameRate: 10,
          repeat: 0,
        },
        {
          key: CST.SPRITESHEET.CHARACTERS.WITCH.ANIMS.RUN,
          frames: {
            key: spr,
            startEnd: { start: 1, end: 4 },
          },
          frameRate: 10,
          repeat: -1,
        },
        {
          key: CST.SPRITESHEET.CHARACTERS.WITCH.ANIMS.JUMP,
          frames: {
            key: spr,
            startEnd: { start: 5, end: 6 },
          },
          frameRate: 10,
          repeat: -1,
        },
      ],
      attacks,
      movementAnimations,
      abilityKeys: [
        CST.ABILITIES.WITCH.HEX_BLAST.ICON,
        CST.ABILITIES.WITCH.NEEDLES.ICON,
        CST.ABILITIES.WITCH.METEOR_RAIN.ICON,
      ],
    })
  }
}

export default WitchCharacter
