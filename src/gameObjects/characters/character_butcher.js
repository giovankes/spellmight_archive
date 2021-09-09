import Phaser from 'phaser'
import { CST } from '../../CST'
import Character from './character'

import StaticHitbox from '../attacks-abilities/static'
import Projectile from '../attacks-abilities/projectile'

class ButcherCharacter extends Character {
  constructor({ Scene, x, y, isPlayer, index }) {
    // Write attacks here, pass them in to the super()
    const attacks = {
      attackLight: {
        neutral: {
          maxCombo: 3,
          currentCombo: 0,
          exec: () => {
            const self = this.CharacterConfig.attacks.attackLight.neutral
            self.currentCombo += 1
            let x = 0
            let hitbox
            switch (self.currentCombo) {
              case 1:
                this.facingRight ? (x = 18) : (x = 0)
                hitbox = new StaticHitbox({
                  Scene,
                  x: x,
                  y: 12,
                  height: 8,
                  width: 8,
                  depth: 2,
                  life: 100,
                  id: this.id,
                  tweenData: {
                    ease: 'Linear',
                    duration: 100,
                    repeat: 0,
                    yoyo: false,
                    x: { from: x, to: this.facingRight ? x + 5 : x - 5 },
                    scaleX: { from: 1, to: 2 },
                  },
                  addToScene: false,
                  direction: this.facingRight,
                  attack: {
                    name: 'butcher-j',
                    hitMultiplier: 0.1,
                    velocityX: 100,
                    velocityY: 0,
                  },
                })
                this.add(hitbox)
                break
              case 2:
                this.facingRight ? (x = 18) : (x = 0)
                hitbox = new StaticHitbox({
                  Scene,
                  x: x,
                  y: 12,
                  height: 8,
                  width: 8,
                  depth: 2,
                  life: 100,
                  id: this.id,
                  tweenData: {
                    ease: 'Linear',
                    duration: 100,
                    repeat: 0,
                    yoyo: false,
                    x: { from: x, to: this.facingRight ? x + 5 : x - 5 },
                    scaleX: { from: 1, to: 2 },
                  },
                  addToScene: false,
                  direction: this.facingRight,
                  attack: {
                    name: 'butcher-j',
                    hitMultiplier: 0.1,
                    velocityX: 100,
                    velocityY: 0,
                  },
                })
                this.add(hitbox)
                break
              case 3:
                self.currentCombo = 0
                this.facingRight ? (x = 18) : (x = 0)
                hitbox = new StaticHitbox({
                  Scene,
                  x: x,
                  y: 12,
                  height: 8,
                  width: 8,
                  depth: 2,
                  life: 100,
                  id: this.id,
                  tweenData: {
                    ease: 'Linear',
                    duration: 100,
                    repeat: 0,
                    yoyo: false,
                    x: { from: x, to: this.facingRight ? x + 5 : x - 5 },
                    scaleX: { from: 1, to: 2 },
                  },
                  addToScene: false,
                  direction: this.facingRight,
                  attack: {
                    name: 'butcher-j',
                    hitMultiplier: 0.1,
                    velocityX: 100,
                    velocityY: 0,
                  },
                })
                this.add(hitbox)
                break
              default:
                break
            }

            if (self.comboTimer) self.comboTimer.destroy()
            self.currentCombo += 1
            self.comboTimer = Scene.time.delayedCall(300, () => {
              self.currentCombo = 0
            })
            console.log(self.currentCombo)
          },
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
                textureKey: CST.ABILITIES.MAGE.FIREBALL.TEXTURE_KEY,
                animationKey: CST.ABILITIES.MAGE.FIREBALL.ANIMATION_KEY,
                maxVelocity: {
                  x: 600,
                  y: 0,
                },
                acceleration: {
                  x: 700,
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
        this.sprite.play(CST.SPRITESHEET.CHARACTERS.BUTCHER.ANIMS.IDLE)
      },
      run: () => {
        this.sprite.play(CST.SPRITESHEET.CHARACTERS.BUTCHER.ANIMS.RUN)
      },
    }

    const spr = CST.SPRITESHEET.CHARACTERS.BUTCHER.SPR

    super({
      // Edittable values
      maxJumps: 2,
      index,
      jumpHeight: 400,
      accelerationX: 1500,
      accelerationDown: 3000,
      drag: 1500,
      normalVelocity: 120,
      sprintVelocity: 220,
      collisionBodySize: {
        width: 20,
        height: 38,
        offsetX: 3.5,
        offsetY: 1,
      },
      scale: 0.8,

      // Do not touch
      Scene: Scene,
      x: x,
      y: y,
      sprite: spr,
      isPlayer: isPlayer,
      anims: [
        {
          key: CST.SPRITESHEET.CHARACTERS.BUTCHER.ANIMS.IDLE,
          frames: {
            key: spr,
            startEnd: { start: 0, end: 0 },
          },
          frameRate: 10,
          repeat: 0,
        },
        {
          key: CST.SPRITESHEET.CHARACTERS.BUTCHER.ANIMS.RUN,
          frames: {
            key: spr,
            startEnd: { start: 10, end: 18 },
          },
          frameRate: 10,
          repeat: -1,
        },
      ],
      attacks,
      movementAnimations,
      abilityKeys: [
        CST.ABILITIES.BUTCHER.CLEAVER.ICON,
        CST.ABILITIES.BUTCHER.HOOK.ICON,
        CST.ABILITIES.BUTCHER.RAGE.ICON,
      ],
    })
  }
}

export default ButcherCharacter
