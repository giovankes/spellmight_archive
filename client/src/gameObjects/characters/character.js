import Phaser from 'phaser'
import {CST } from '../../CST'
import {v4 as uuid} from 'uuid'
import EffectSpritesheet from '../misc/effect-spritesheet'

class Character extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.Scene, config.x, config.y)

    // Class variables for functions
    this.CharacterConfig = config
    console.log(this.CharacterConfig)
    this.sprintTimeoutTime = 300
    this.pressing = {
      UP: false,
      DOWN: false,
      LEFT: false,
      RIGHT: false,
      A: false,
      B: false,
      X: false,
      Y: false,
      LB: false,
      LT: false,
      RB: false,
      RT: false,
    }

    // Add object to scene
    config.Scene.add.existing(this)

    // Add Physics Body
    config.Scene.physics.add.existing(this, false)

    // Create Sprite
    this.sprite = new Phaser.GameObjects.Sprite(
      config.Scene,
      0,
      0,
      config.sprite
    ).setOrigin(0)
    config.Scene.add.existing(this.sprite)
    // Create player label
    this.label = new Phaser.GameObjects.Text(
      config.Scene,
      5,
      -15,
      'P' + (config.index + 1),
      {
        fontSize: 10,
        fontFamily: 'Adventurer',
      }
    ).setOrigin(0)

    // Create character ability sprites
    this.abilityIcons = new Phaser.GameObjects.Group(config.Scene, [
      new Phaser.GameObjects.Image(config.Scene, -10, 0, config.abilityKeys[0])
        .setOrigin(0.5)
        .setDisplaySize(15, 15),
      new Phaser.GameObjects.Image(config.Scene, -10, 20, config.abilityKeys[1])
        .setOrigin(0.5)
        .setDisplaySize(15, 15),
      new Phaser.GameObjects.Image(
        config.Scene,
        config.collisionBodySize.width + 10,
        10,
        config.abilityKeys[2]
      )
        .setOrigin(0.5)
        .setDisplaySize(15, 15),
    ])

    this.abilityIcons.getChildren().forEach((abilityIcon) => {
      config.Scene.add.existing(abilityIcon)
      this.add(abilityIcon)
    })
    this.abilityFrameKeyReady = CST.ABILITIES.FRAMES.P1.READY
    this.abilityFrameKeyCooldown = CST.ABILITIES.FRAMES.P1.COOLDOWN
    switch (config.index) {
      case 0:
        break
      case 1:
        this.abilityFrameKeyReady = CST.ABILITIES.FRAMES.P2.READY
        this.abilityFrameKeyCooldown = CST.ABILITIES.FRAMES.P2.COOLDOWN
        break
      case 2:
        this.abilityFrameKeyReady = CST.ABILITIES.FRAMES.P3.READY
        this.abilityFrameKeyCooldown = CST.ABILITIES.FRAMES.P3.COOLDOWN
        break
      case 3:
        this.abilityFrameKeyReady = CST.ABILITIES.FRAMES.P4.READY
        this.abilityFrameKeyCooldown = CST.ABILITIES.FRAMES.P4.COOLDOWN
        break
      default:
        break
    }
    const abilityFrameOne = new Phaser.GameObjects.Image(
      config.Scene,
      -10,
      0,
      this.abilityFrameKeyReady
    )
      .setOrigin(0.5)
      .setDisplaySize(15, 15)
    config.Scene.add.existing(abilityFrameOne)
    this.add(abilityFrameOne)

    const abilityFrameTwo = new Phaser.GameObjects.Image(
      config.Scene,
      -10,
      20,
      this.abilityFrameKeyReady
    )
      .setOrigin(0.5)
      .setDisplaySize(15, 15)
    config.Scene.add.existing(abilityFrameTwo)
    this.add(abilityFrameTwo)
    const abilityFrameThree = new Phaser.GameObjects.Image(
      config.Scene,
      config.collisionBodySize.width + 10,
      10,
      this.abilityFrameKeyReady
    )
      .setOrigin(0.5)
      .setDisplaySize(15, 15)
    config.Scene.add.existing(abilityFrameThree)
    this.add(abilityFrameThree)
    this.abilityFrames = new Phaser.GameObjects.Group(config.Scene, [
      abilityFrameOne,
      abilityFrameTwo,
      abilityFrameThree,
    ])
    this.showAllAbilities(1000)

    // Add game objects to container
    this.add([this.sprite, this.label])

    // When casting
    this.casting = false

    // When a spell roots this character
    this.rooted = false

    // When shielding
    this.shielding = false

    this.touchingGround = false
    this.hitMultiplier = 1
    this.currentJumps = 0
    this.facingRight = true

    // //TODO Add some settings so the ID is more random
    this.id = uuid()
    this.sprintSettings = {
      isSprinting: false,
      direction: null,
      left: {
        doubleTap: false,
        timeOut: null,
      },
      right: {
        doubleTap: false,
        timeOut: null,
      },
    }

    // Create animations
    config.anims.forEach(({ key, frames, frameRate, repeat }) => {
      config.Scene.anims.create({
        key,
        frames: config.Scene.anims.generateFrameNumbers(
          frames.key,
          frames.startEnd
        ),
        frameRate,
        repeat,
      })
    })

    // Set correct body config
    this.body.setGravityY(1500)
    this.body.collideWorldBounds = true
    this.body.setDrag(config.drag, 0)
    this.body.onWorldBounds = true
    // this.body.body.setBoundsRectangle(config.collisionBox)
    this.body.setSize(
      config.collisionBodySize.width,
      config.collisionBodySize.height
    )
    this.sprite.setDisplayOrigin(
      config.collisionBodySize.offsetX,
      config.collisionBodySize.offsetY
    )
    // this.body.setOffset(config.collisionBodySize.offsetX, config.collisionBodySize.offsetY)
    this.sprite.setScale(config.scale)
    this.body.data = {
      touchingGround: false,
      player: config.isPlayer || false,
      id: this.id,
    }

    this.isPlayer = config.isPlayer
  }
  // NOTE: Movement manager
  movementManager(direction) {
    switch (direction) {
      case 'pressed left':
        if (this.casting) {
          this.body.setAccelerationX(-this.CharacterConfig.accelerationX)
          return
        }
        if (this.shielding) {
          this.shielding = false
          this.shield.destroy()
          this.body.setEnable(false)
          const dust = new EffectSpritesheet({
            Scene: this.CharacterConfig.Scene,
            x: this.body.right,
            y: this.body.bottom,
            spritesheetKey: CST.SPRITESHEET.CHARACTERS.DUST.DODGE.IMG,
            scale: 0.5,
            flipX: false,
          })
            .play(CST.SPRITESHEET.CHARACTERS.DUST.DODGE.ANIM)
            .once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
              dust.destroy()
            })
          this.CharacterConfig.Scene.tweens.add({
            targets: this,
            x: this.CharacterConfig.dashDistance
              ? `-=${this.CharacterConfig.dashDistance}`
              : '-=35',
            ease: 'Linear',
            repeat: -1,
            duration: this.CharacterConfig.dashDuration
              ? this.CharacterConfig.dashDuration
              : 80,
            repeat: 0,
            yoyo: false,
            onComplete: () => {
              this.body.setEnable(true)
            },
          })
          return
        }
        this.facingRight = false
        if (!this.sprite.flipX) {
          this.sprite.setFlipX(true)
          // this.sprite.setDisplayOrigin(config.collisionBodySize.offsetX, config.collisionBodySize.offsetY)
          this.body.setOffset(this.CharacterConfig.collisionBodySize.offsetX, 0)
          // this.setX(this.x + (this.CharacterConfig.collisionBodySize.offsetX / 4))
        }
        this.body.setOffset(0, 0)
        if (this.sprintSettings.left.doubleTap) {
          ;(this.sprintSettings.value = true),
            (this.sprintSettings.direction = 'left')

          this.body.setMaxVelocity(this.CharacterConfig.sprintVelocity, 2500)
          this.body.setAccelerationX(-this.CharacterConfig.accelerationX * 1.25)
          if (
            this.CharacterConfig.movementAnimations.run 
          )
            this.CharacterConfig.movementAnimations.run()
          const dust = new EffectSpritesheet({
            Scene: this.CharacterConfig.Scene,
            x: this.body.right,
            y: this.body.bottom + 10,
            spritesheetKey: CST.SPRITESHEET.CHARACTERS.DUST.SPRINT.IMG,
            scale: 0.5,
            flipX: true,
          })
            .play(CST.SPRITESHEET.CHARACTERS.DUST.SPRINT.ANIM)
            .once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
              dust.destroy()
            })
          return
        }

        this.sprintSettings.left.doubleTap = true
        this.sprintSettings.left.timeOut = setTimeout(() => {
          this.sprintSettings.left.doubleTap = false
        }, this.sprintTimeoutTime)

        this.body.setMaxVelocity(this.CharacterConfig.normalVelocity, 2500)
        this.body.setAccelerationX(-this.CharacterConfig.accelerationX)
        break

      case 'unpressed left':
        if (!this.pressing.RIGHT) {
          this.body.setAccelerationX(0)
          if (
            this.CharacterConfig.movementAnimations.idle
          )
            this.CharacterConfig.movementAnimations.idle()
        }
        if (this.sprintSettings.value) {
          this.sprintSettings.left.doubleTap = true
          this.sprintSettings.left.timeOut = setTimeout(() => {
            this.sprintSettings.left.doubleTap = false
          }, this.sprintTimeoutTime)

          this.sprintSettings.value = false
        }
        break

      case 'pressed right':
        if (this.casting) {
          this.body.setAccelerationX(this.CharacterConfig.accelerationX)
          return
        }
        if (this.shielding) {
          this.shielding = false
          this.shield.destroy()
          this.body.setEnable(false)
          const dust = new EffectSpritesheet({
            Scene: this.CharacterConfig.Scene,
            x: this.body.left,
            y: this.body.bottom,
            spritesheetKey: CST.SPRITESHEET.CHARACTERS.DUST.DODGE.IMG,
            scale: 0.5,
            flipX: true,
          })
            .play(CST.SPRITESHEET.CHARACTERS.DUST.DODGE.ANIM)
            .once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
              dust.destroy()
            })
          this.CharacterConfig.Scene.tweens.add({
            targets: this,
            x: this.CharacterConfig.dashDistance
              ? `+=${this.CharacterConfig.dashDistance}`
              : '+=35',
            ease: 'Linear',
            duration: this.CharacterConfig.dashDuration
              ? this.CharacterConfig.dashDuration
              : 80,
            repeat: 0,
            yoyo: false,
            onComplete: () => {
              this.body.setEnable(true)
            },
          })
          return
        }
        this.facingRight = true

        if (this.sprite.flipX) {
          this.sprite.setFlipX(false)
        }
        if (this.sprintSettings.right.doubleTap) {
          this.sprintSettings.value = true
          this.sprintSettings.direction = 'right'
          this.body.setMaxVelocity(this.CharacterConfig.sprintVelocity, 2500)
          this.body.setAccelerationX(this.CharacterConfig.accelerationX * 1.25)
          if (
            this.CharacterConfig.movementAnimations &&
            this.CharacterConfig.movementAnimations.run
          )
            this.CharacterConfig.movementAnimations.run()
          const dust = new EffectSpritesheet({
            Scene: this.CharacterConfig.Scene,
            x: this.body.left,
            y: this.body.bottom + 10,
            spritesheetKey: CST.SPRITESHEET.CHARACTERS.DUST.SPRINT.IMG,
            scale: 0.5,
            flipX: false,
          })
            .play(CST.SPRITESHEET.CHARACTERS.DUST.SPRINT.ANIM)
            .once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
              dust.destroy()
            })
          return
        }

        this.sprintSettings.right.doubleTap = true
        this.sprintSettings.right.timeOut = setTimeout(() => {
          this.sprintSettings.right.doubleTap = false
        }, this.sprintTimeoutTime)

        this.body.setMaxVelocity(this.CharacterConfig.normalVelocity, 2500)
        this.body.setAccelerationX(this.CharacterConfig.accelerationX)
        break

      case 'unpressed right':
        if (!this.pressing.LEFT) {
          this.body.setAccelerationX(0)
          if (
            this.CharacterConfig.movementAnimations &&
            this.CharacterConfig.movementAnimations.idle
          )
            this.CharacterConfig.movementAnimations.idle()
        }
        if (this.sprintSettings.value) {
          this.sprintSettings.right.doubleTap = true
          this.sprintSettings.right.timeOut = setTimeout(() => {
            this.sprintSettings.right.doubleTap = false
          }, this.sprintTimeoutTime)

          this.sprintSettings.value = false
        }

        break

      case 'pressed up':
        if (this.casting) {
          return
        }
        if (this.touchingGround) {
          this.currentJumps = 1
        } else if (this.currentJumps < this.CharacterConfig.maxJumps) {
          this.currentJumps += 1
        } else {
          return
        }

        this.body.setVelocityY(-this.CharacterConfig.jumpHeight)
        this.touchingGround = false

        if (
          this.CharacterConfig.movementAnimations &&
          this.CharacterConfig.movementAnimations.jump
        )
          this.CharacterConfig.movementAnimations.jump()

        const dust = new EffectSpritesheet({
          Scene: this.CharacterConfig.Scene,
          x: this.body.center.x,
          y: this.body.bottom - 5,
          spritesheetKey: CST.SPRITESHEET.CHARACTERS.DUST.JUMP.IMG,
          scale: 0.7,
          flipX: false,
        })
          .setOrigin(0.5)
          .play(CST.SPRITESHEET.CHARACTERS.DUST.JUMP.ANIMS.JUMP)
          .once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
            dust.destroy()
          })
        break

      case 'pressed down':
        if (this.casting) {
          return
        }
        this.body.setAccelerationY(this.CharacterConfig.accelerationDown)
        break

      case 'unpressed down':
        this.body.setAccelerationY(0)
        break

      case 'pressed shield':
        if (this.casting) {
          return
        }
        this.shield = new EffectSpritesheet({
          Scene: this.CharacterConfig.Scene,
          x: this.CharacterConfig.collisionBodySize.width / 2 + 1.5,
          y: this.CharacterConfig.collisionBodySize.height / 2 - 4,
          spritesheetKey: CST.SPRITESHEET.CHARACTERS.SHIELD.IMG,
        })
          .setOrigin(0.5)
          .play(CST.SPRITESHEET.CHARACTERS.SHIELD.ANIM)
        this.add(this.shield)
        this.shielding = true
        break

      case 'unpressed shield':
        if (this.shield) this.shield.destroy()
        this.shielding = false
        break

      default:
        break
    }
  }

  shakeAbility(abilityNumber, ms) {
    const abilityIcon = this.abilityIcons.getChildren()[abilityNumber - 1]
    const abilityFrame = this.abilityFrames.getChildren()[abilityNumber - 1]
    if (!abilityIcon || !abilityFrame) return

    this.CharacterConfig.Scene.plugins
      .get('rexShakePosition')
      .add(abilityIcon, {
        mode: 1,
        duration: ms,
        magnitude: 4,
        magnitudeMode: 1,
      })
      .shake()
    this.CharacterConfig.Scene.plugins
      .get('rexShakePosition')
      .add(abilityFrame, {
        mode: 1,
        duration: ms,
        magnitude: 4,
        magnitudeMode: 1,
      })
      .shake()

    this.CharacterConfig.Scene.tweens.add({
      targets: abilityIcon,
      alpha: { start: 0, from: 0, to: 1 },
      ease: 'Circ.easeIn',
      duration: ms,
      repeat: 0,
      yoyo: false,
    })
    this.CharacterConfig.Scene.tweens.add({
      targets: abilityFrame,
      alpha: { start: 0, from: 0, to: 1 },
      ease: 'Circ.easeIn',
      duration: ms,
      repeat: 0,
      yoyo: false,
    })
  }

  showAbilityCooldown(abilityNumber, ms) {
    const abilityIcon = this.abilityIcons.getChildren()[abilityNumber - 1]
    const abilityFrame = this.abilityFrames.getChildren()[abilityNumber - 1]
    if (!abilityIcon || !abilityFrame) return

    this.CharacterConfig.Scene.tweens.add({
      targets: abilityIcon,
      alpha: { start: 1, from: 1, to: 0 },
      ease: 'Circ.easeIn',
      duration: ms,
      repeat: 0,
      yoyo: false,
    })
    this.CharacterConfig.Scene.tweens.add({
      targets: abilityFrame,
      alpha: { start: 1, from: 1, to: 0 },
      ease: 'Circ.easeIn',
      duration: ms,
      repeat: 0,
      yoyo: false,
    })
  }

  showAllAbilities(ms) {
    this.abilityIcons.getChildren().forEach((abilityIcon) => {
      this.CharacterConfig.Scene.tweens.add({
        targets: abilityIcon,
        alpha: { start: 0.6, from: 0.6, to: 0 },
        ease: 'Linear',
        duration: ms,
        repeat: 0,
        yoyo: false,
      })
    })
    this.abilityFrames.getChildren().forEach((abilityFrame) => {
      this.CharacterConfig.Scene.tweens.add({
        targets: abilityFrame,
        alpha: { start: 0.6, from: 0.6, to: 0 },
        ease: 'Linear',
        duration: ms,
        repeat: 0,
        yoyo: false,
      })
    })
  }

  attackManager(attack, variant) {
    if (this.casting) return
    console.log(this.CharacterConfig.movementAnimations)
    let attackReturn = null
    switch (attack) {
      case 'attack light':
        if (!variant) {
          this.CharacterConfig.attacks.attackLight.neutral.exec()
          this.CharacterConfig.movementAnimations.attack &&
            this.CharacterConfig.movementAnimations.attack()
        } else if (variant === 'forward') {
          this.CharacterConfig.attacks.attackLight.forward.exec()
        }
        break

      case 'attack heavy':
        this.CharacterConfig.attacks.attackHeavy.neutral.exec()
        break
      case 'attack upper':
        this.CharacterConfig.attacks.upper.neutral.exec()
        break
      case 'ability one':
        this.CharacterConfig.attacks.abilityOne.exec()
        break
      case 'ability two':
        this.CharacterConfig.attacks.abilityTwo.exec()
        break
      case 'ultimate':
        console.log(attack + ' fired off!')
        break
      default:
        break
    }

    if (!attackReturn || !attackReturn.hitbox) return
    const characters = this.CharacterConfig.Scene.Characters.getChildren()
    characters.forEach((character) => {
      if (character.id === this.id) return
      const playerBounds = character.getBounds()
      const output = Phaser.Geom.Rectangle.Overlaps(
        attackReturn.hitbox,
        playerBounds
      )
      if (output === true) {
        character.handleAttack(attackReturn.data, this.facingRight)
      }
    })
  }

  handleAttack(attack, direction) {
    if (attack && attack.name) {
      console.log(attack)
      switch (attack.name) {
        case 'mage-fireball':
          const hitAnim = new EffectSpritesheet({
            Scene: this.CharacterConfig.Scene,
            x: this.body.center.x,
            y: this.body.center.y + 10,
            spritesheetKey:
              CST.SPRITESHEET.CHARACTERS.MAGE.ABILITIES.FIREBALL.EXPLOSION.IMG,
          }).play(
            CST.SPRITESHEET.CHARACTERS.MAGE.ABILITIES.FIREBALL.EXPLOSION.ANIM
          )
          break
        default:
          break
      }
    }

    this.add(
      new EffectSpritesheet({
        Scene: this.CharacterConfig.Scene,
        x: 10,
        y: 5,
        spritesheetKey: CST.SPRITESHEET.CHARACTERS.HIT.IMG,
      })
        .setOrigin(0.5)
        .setScale(0.7)
        .play(CST.SPRITESHEET.CHARACTERS.HIT.ANIM)
    )

    this.body.setMaxVelocity(9000)
    this.body.setDrag(10)
    this.body.setBounce(0.4)
    this.hitMultiplier += attack.hitMultiplier

    if (attack.shake) this.CharacterConfig.Scene.cameraShake(attack.shake)
    direction
      ? this.body.setVelocityX(attack.velocityX * this.hitMultiplier)
      : this.body.setVelocityX(attack.velocityX * -1 * this.hitMultiplier)
    this.body.setVelocityY(attack.velocityY * this.hitMultiplier)
    this.touchingGround = false
    let timeOutNumber = 100 * this.hitMultiplier
    setTimeout(() => {
      this.body.setMaxVelocity(this.CharacterConfig.sprintVelocity, 2500)
    }, timeOutNumber)

    this.showAllAbilities(500)
    const interfaceScene = this.CharacterConfig.Scene.scene.get(
      CST.SCENES.INTERFACE
    )
    interfaceScene.updatePlayerPercent(
      this.CharacterConfig.index,
      this.hitMultiplier
    )
  }
}

export default Character
