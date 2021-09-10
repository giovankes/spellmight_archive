import Phaser from 'phaser'
import { CST } from '../../CST'
import Character from './character'

import StaticHitbox from '../attacks-abilities/static'
import Projectile from '../attacks-abilities/projectile'
import EffectSpritesheet from '../misc/effect-spritesheet'

class MageCharacter extends Character {
  constructor({ Scene, x, y, isPlayer, index }) {
    // Write attacks here, pass them in to the super()
    const attacks = {
      attackLight: {
        neutral: {
          maxCombo: 3,
          currentCombo: 0,
          comboTimer: null,
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
                    name: 'mage-j',
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
                    name: 'mage-j',
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
                    name: 'mage-j',
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
          exec: () => {
            let x = 0
            this.facingRight ? (x = 18) : (x = 0)
            this.body.setMaxVelocity(600, 2500)
            this.body.setVelocityX(this.facingRight ? 600 : -600)
            const hitbox = new StaticHitbox({
              Scene,
              x: x,
              y: 12,
              height: 8,
              width: 8,
              depth: 2,
              life: 300,
              id: this.id,
              tweenData: {
                ease: 'Linear',
                duration: 300,
                repeat: 0,
                yoyo: false,
                x: { from: x, to: this.facingRight ? x + 5 : x - 5 },
                scaleX: { from: 1, to: 2 },
              },
              addToScene: false,
              direction: this.facingRight,
              attack: {
                name: 'mage-j-forward',
                hitMultiplier: 0.2,
                velocityX: 150,
                velocityY: -100,
              },
            })
            Scene.time.delayedCall(300, () => {
              this.body.setMaxVelocity(
                this.CharacterConfig.normalVelocity,
                2500
              )
            })
            this.add(hitbox)
          },
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
          exec: () => {
            return
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
        exec: () => {
          if (!this.CharacterConfig.attacks.abilityOne.cooldown.canFire) {
            return
          }
          this.CharacterConfig.attacks.abilityOne.cooldown.canFire = false
          let x
          this.facingRight ? (x = 15) : (x = -10)
          this.casting = true
          this.body.setMaxVelocity(35, 2500)

          const castingAnim = new EffectSpritesheet({
            Scene,
            x: this.facingRight ? -10 : -20,
            y: -10,
            spritesheetKey: CST.SPRITESHEET.CHARACTERS.MAGE.CASTING.IMG,
          })
            .setOrigin(0, 0)
            .setScale(0.5)
            .setDepth(3)
            .play(CST.SPRITESHEET.CHARACTERS.MAGE.CASTING.ANIM)
          this.add(castingAnim)

          this.shakeAbility(1, this.CharacterConfig.attacks.abilityOne.castTime)

          Scene.time.delayedCall(
            this.CharacterConfig.attacks.abilityOne.castTime,
            () => {
              this.casting = false
              castingAnim.anims.stop()

              this.showAbilityCooldown(
                1,
                this.CharacterConfig.attacks.abilityOne.cooldown.amount
              )
              const fireball = new Projectile({
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
                scale: 0.5,
                facingRight: this.facingRight,
                id: this.id,
                hitDetails: {
                  hitMultiplier: 0.3,
                  velocityX: 200,
                  velocityY: -200,
                  shake: 0.008,
                  name: 'mage-fireball',
                },
                bodySize: {
                  width: 40,
                  height: 20,
                },
                spriteOffset: {
                  x: this.facingRight ? 18 : 3,
                  y: 20,
                },
                particles: {
                  key: CST.SPRITESHEET.CHARACTERS.MAGE.ABILITIES.FIREBALL
                    .PARTICLE,
                  entries: [
                    {
                      alpha: { start: 1, end: 0 },
                      speed: 70,
                      accelerationY: -100,
                      gravityY: 100,
                      lifespan: { min: 1000, max: 1100 },
                      tint: { start: 0xab421f, end: 0xe3a85b },
                      scale: { start: 1, end: 0.5, ease: 'Power3' },
                      x: this.facingRight
                        ? { min: 30, max: 40 }
                        : { min: 3, max: 13 },
                      y: 12,
                      blendMode: 'ADD',
                    },
                  ],
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
          amount: 4000,
          canFire: true,
          timer: null,
        },
        castTime: 300,
        exec: () => {
          if (!this.CharacterConfig.attacks.abilityTwo.cooldown.canFire) {
            return
          }
          this.CharacterConfig.attacks.abilityTwo.cooldown.canFire = false
          let x
          this.facingRight ? (x = 120) : (x = -120)
          this.casting = true
          this.body.setMaxVelocity(35, 2500)

          const castingAnim = new EffectSpritesheet({
            Scene,
            x: this.facingRight ? -10 : -20,
            y: -10,
            spritesheetKey: CST.SPRITESHEET.CHARACTERS.MAGE.CASTING.IMG,
          })
            .setOrigin(0, 0)
            .setScale(0.5)
            .setDepth(3)
            .play(CST.SPRITESHEET.CHARACTERS.MAGE.CASTING.ANIM)
          this.add(castingAnim)

          this.shakeAbility(2, this.CharacterConfig.attacks.abilityTwo.castTime)

          Scene.time.delayedCall(
            this.CharacterConfig.attacks.abilityTwo.castTime,
            () => {
              this.casting = false
              castingAnim.anims.stop()

              this.showAbilityCooldown(
                2,
                this.CharacterConfig.attacks.abilityTwo.cooldown.amount
              )

              const startAnim = new EffectSpritesheet({
                Scene,
                x: this.x,
                y: this.y,
                spritesheetKey: CST.ABILITIES.MAGE.BLINK.TEXTURE_KEY,
              })
                .setOrigin(0.5)
                .setScale(0.5)
                .setDepth(3)
                .play(CST.ABILITIES.MAGE.BLINK.ANIMATION_KEY_START)
              Scene.add.existing(startAnim)

              this.setX(this.x + x)
              this.setY(this.y - 50)
              this.body.setVelocityY(-200)

              const endAnim = new EffectSpritesheet({
                Scene,
                x: this.x,
                y: this.y,
                spritesheetKey: CST.ABILITIES.MAGE.BLINK.TEXTURE_KEY,
              })
                .setOrigin(0.5)
                .setScale(0.5)
                .setDepth(3)
                .play(CST.ABILITIES.MAGE.BLINK.ANIMATION_KEY_END)
              Scene.add.existing(endAnim)

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
      dashSpeed: 80,
      dashDistance: 35,
      collisionBodySize: {
        width: 16,
        height: 37,
        offsetX: 17,
        offsetY: 8,
      },
      scale: 1.2,

      // Do not touch
      Scene: Scene,
      x: x,
      y: y,
      sprite: CST.SPRITESHEET.CHARACTERS.MAGE.IMG,
      isPlayer: isPlayer,
      anims: [],
      attacks,
      abilityKeys: [
        CST.ABILITIES.MAGE.FIREBALL.ICON,
        CST.ABILITIES.MAGE.BLINK.ICON,
        CST.ABILITIES.MAGE.BEAM.ICON,
      ],
    })
  }
}

export default MageCharacter
