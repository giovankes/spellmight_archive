import Phaser from 'phaser'
import UUIDv4 from 'uuid/v4'
import { CST } from '../../CST'

import StaticHitbox from '../attacks-abilities/static'

class Character extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.Scene, config.x, config.y)

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

    // Add game objects to container
    this.add([this.sprite, this.label])

    this.casting = false
    this.touchingGround = false
    this.hitMultiplier = 1
    this.currentJumps = 0
    this.facingRight = false

    // //TODO Add some settings so the ID is more random
    this.id = UUIDv4()
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

    // Class variables for functions
    this.CharacterConfig = config
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
    }

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
    this.setScale(config.scale)
    this.body.data = {
      touchingGround: false,
      player: config.isPlayer || false,
      id: this.id,
    }

    this.isPlayer = config.isPlayer
  }

  movementManager(direction) {
    switch (direction) {
      default:
        break
    }

    switch (direction) {
      case 'pressed left':
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
          return
        }

        this.sprintSettings.left.doubleTap = true
        this.sprintSettings.left.timeOut = setTimeout(() => {
          this.sprintSettings.left.doubleTap = false
        }, this.sprintTimeoutTime)

        this.body.setMaxVelocity(this.CharacterConfig.normalVelocity, 2500)
        this.body.setAccelerationX(-this.CharacterConfig.accelerationX)
        this.CharacterConfig.movementAnimations.run()
        break

      case 'unpressed left':
        if (!this.pressing.RIGHT) {
          this.body.setAccelerationX(0)
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
        this.facingRight = true

        if (this.sprite.flipX) {
          this.sprite.setFlipX(false)
          // this.sprite.setDisplayOrigin(config.collisionBodySize.offsetX, config.collisionBodySize.offsetY)
          // this.setX(this.x - (this.CharacterConfig.collisionBodySize.offsetX / 4))
        }
        if (this.sprintSettings.right.doubleTap) {
          this.sprintSettings.value = true
          this.sprintSettings.direction = 'right'

          this.body.setMaxVelocity(this.CharacterConfig.sprintVelocity, 2500)
          this.body.setAccelerationX(this.CharacterConfig.accelerationX * 1.25)
          return
        }

        this.sprintSettings.right.doubleTap = true
        this.sprintSettings.right.timeOut = setTimeout(() => {
          this.sprintSettings.right.doubleTap = false
        }, this.sprintTimeoutTime)

        this.body.setMaxVelocity(this.CharacterConfig.normalVelocity, 2500)
        this.body.setAccelerationX(this.CharacterConfig.accelerationX)
        this.CharacterConfig.movementAnimations.run()
        break

      case 'unpressed right':
        if (!this.pressing.LEFT) {
          this.body.setAccelerationX(0)
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
        if (this.touchingGround) {
          this.currentJumps = 1
        } else if (this.currentJumps < this.CharacterConfig.maxJumps) {
          this.currentJumps += 1
        } else {
          return
        }

        this.body.setVelocityY(-this.CharacterConfig.jumpHeight)
        this.touchingGround = false

        this.CharacterConfig.movementAnimations.jump()
        break

      case 'pressed down':
        this.body.setAccelerationY(this.CharacterConfig.accelerationDown)
        break

      case 'unpressed down':
        this.body.setAccelerationY(0)
        break

      default:
        break
    }
  }

  attackManager(attack, variant) {
    let attackReturn = null
    switch (attack) {
      case 'attack light':
        attackReturn = this.CharacterConfig.attacks.attackLight.neutral.exec(
          this.facingRight
        )
        break

      case 'attack heavy':
        attackReturn = this.CharacterConfig.attacks.attackHeavy.neutral.exec(
          this.facingRight
        )
        break
      case 'ability one':
        this.CharacterConfig.attacks.abilityOne.exec(this.facingRight)
        break
      case 'ability two':
        console.log(attack + ' fired off!')
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
    this.body.setMaxVelocity(9000)
    this.body.setDrag(10)
    this.body.setBounce(0.4)
    this.hitMultiplier += attack.hitMultiplier
    if (attack.shake) this.CharacterConfig.Scene.cameraShake(attack.shake)
    direction
      ? this.body.setVelocityX(attack.velocityX * this.hitMultiplier)
      : this.body.setVelocityX(attack.velocityX * -1 * this.hitMultiplier)
    this.body.setVelocityY(attack.velocityY * this.hitMultiplier)
  }
}

export default Character
