import Phaser from 'phaser'
import { CST } from '../../CST'
import Character from './character'

import StaticHitbox from '../attacks-abilities/static'
import Projectile from '../attacks-abilities/projectile'
import EffectSpritesheet from '../misc/effect-spritesheet'

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
            const self = this.CharacterConfig.attacks.attackHeavy.neutral
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
                    name: 'butcher-k',
                    hitMultiplier: 0.5,
                    velocityX: 150,
                    velocityY: 5,
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
                    name: 'butcher-k',
                    hitMultiplier: 0.5,
                    velocityX: 150,
                    velocityY: 5,
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
                    name: 'butcher-k',
                    hitMultiplier: 0.5,
                    velocityX: 150,
                    velocityY: 5,
                  },
                })
                this.add(hitbox)
                break
              default:
                break
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
      upper: {
        neutral: {
          maxCombo: 3,
          currentCombo: 0,
          exec: (direction) => {
            const self = this.CharacterConfig.attacks.upper.neutral
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
                    hitMultiplier: 0.05,
                    velocityX: 50,
                    velocityY: 1000,
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
                    hitMultiplier: 0.05,
                    velocityX: 50,
                    velocityY: 1000,
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
                    hitMultiplier: 0.05,
                    velocityX: 50,
                    velocityY: 1000,
                  },
                })
                this.add(hitbox)
                break
              default:
                break
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
          this.facingRight ? (x = 15) : (x = -10)
          this.casting = true
          this.shakeAbility(1, this.CharacterConfig.attacks.abilityOne.castTime)

          Scene.time.delayedCall(
            this.CharacterConfig.attacks.abilityOne.castTime,
            () => {
              this.showAbilityCooldown(
                1,
                this.CharacterConfig.attacks.abilityOne.cooldown.amount
              )
              this.casting = false
              const hook = new Projectile({
                Scene,
                x: this.x + x,
                y: this.y + 10,
                textureKey:
                  CST.SPRITESHEET.CHARACTERS.BUTCHER.ABILITIES.CLEAVER.IMG,
                animationKey:
                  CST.SPRITESHEET.CHARACTERS.BUTCHER.ABILITIES.CLEAVER.ANIMS,
                maxVelocity: {
                  x: 600,
                  y: 0,
                },
                acceleration: {
                  x: 700,
                  y: 0,
                },
                scale: 20,
                facingRight: this.facingRight,
                id: this.id,
                hitDetails: {
                  hitMultiplier: 0.3,
                  velocityX: 500,
                  velocityY: 1000,
                  shake: 0.008,
                  name: 'butcher-cleaver',
                },
                bodySize: {
                  width: 40,
                  height: 20,
                },
                spriteOffset: {
                  x: this.facingRight ? 18 : 3,
                  y: 20,
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
        cooldown: {
          amount: 1400,
          canFire: true,
          timer: null,
        },
        castTime: 500,
        exec: (facingRight) => {
          if (!this.CharacterConfig.attacks.abilityTwo.cooldown.canFire) {
            return
          }
          this.CharacterConfig.attacks.abilityTwo.cooldown.canFire = false
          let x
          this.facingRight ? (x = 15) : (x = -10)
          this.casting = true
          this.shakeAbility(1, this.CharacterConfig.attacks.abilityTwo.castTime)

          Scene.time.delayedCall(
            this.CharacterConfig.attacks.abilityTwo.castTime,
            () => {
              this.showAbilityCooldown(
                1,
                this.CharacterConfig.attacks.abilityTwo.cooldown.amount
              )
              this.casting = false
              const hook = new Projectile({
                Scene,
                x: this.x + x,
                y: this.y + 10,
                textureKey:
                  CST.SPRITESHEET.CHARACTERS.BUTCHER.ABILITIES.HOOK.IMG,
                animationKey:
                  CST.SPRITESHEET.CHARACTERS.BUTCHER.ABILITIES.HOOK.ANIMS,
                maxVelocity: {
                  x: 600,
                  y: 0,
                },
                acceleration: {
                  x: 700,
                  y: 0,
                },
                scale: 0.5,
                facingRight: this.facingRight,
                id: this.id,
                hitDetails: {
                  hitMultiplier: 0.3,
                  velocityX: 300,
                  hook: true,
                  velocityY: 1000,
                  shake: 0.008,
                  name: 'butcher-hook',
                },
                bodySize: {
                  width: 40,
                  height: 20,
                },
                spriteOffset: {
                  x: this.facingRight ? 18 : 3,
                  y: 20,
                },
              })
              this.CharacterConfig.attacks.abilityTwo.cooldown.timer =
                Scene.time.delayedCall(
                  this.CharacterConfig.attacks.abilityTwo.cooldown.amount,
                  () => {
                    this.CharacterConfig.attacks.abilityTwo.cooldown.canFire = true
                  }
                )
            }
          )
        },
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
