import Phaser from 'phaser'
import UUIDv4 from 'uuid/v4'
import { CST } from '../../../CST'

import Hitbox from '../hitbox'

class Character extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.Scene, config.x, config.y)

    this.physicsBody = config.Scene.physics.add.sprite(
      config.x,
      config.y,
      config.sprite
    )

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

    // Set correct physicsBody config
    this.physicsBody.setGravityY(2500)
    this.physicsBody.body.collideWorldBounds = true
    this.physicsBody.setDrag(config.drag, 0)
    this.physicsBody.body.onWorldBounds = true
    // this.physicsBody.body.setBoundsRectangle(config.collisionBox)
    this.physicsBody.body.setSize(
      config.collisionBodySize.width,
      config.collisionBodySize.height
    )
    this.physicsBody.body.setOffset(
      config.collisionBodySize.offsetX,
      config.collisionBodySize.offsetY
    )
    this.physicsBody.setScale(config.scale)
    this.physicsBody.data = {
      touchingGround: false,
      player: config.isPlayer,
      id: this.id,
    }
  }

  movementManager(direction) {
    switch (direction) {
      case 'holding left':
        this.facingRight = false
        if (
          this.sprintSettings.direction === 'left' &&
          this.sprintSettings.value
        ) {
          this.physicsBody.setMaxVelocity(
            this.CharacterConfig.sprintVelocity,
            2500
          )
          this.physicsBody.setAccelerationX(
            -this.CharacterConfig.accelerationX * 1.25
          )
          this.physicsBody.anims.play('left', true)
        } else {
          this.physicsBody.setMaxVelocity(
            this.CharacterConfig.normalVelocity,
            2500
          )
          this.physicsBody.setAccelerationX(-this.CharacterConfig.accelerationX)
        }
        break

      case 'holding right':
        this.facingRight = true
        if (
          this.sprintSettings.direction === 'right' &&
          this.sprintSettings.value
        ) {
          this.physicsBody.setMaxVelocity(
            this.CharacterConfig.sprintVelocity,
            2500
          )
          this.physicsBody.setAccelerationX(
            this.CharacterConfig.accelerationX * 1.25
          )
        } else {
          this.physicsBody.setMaxVelocity(
            this.CharacterConfig.normalVelocity,
            2500
          )
          this.physicsBody.setAccelerationX(this.CharacterConfig.accelerationX)
        }
        break

      case 'pressed down':
        this.physicsBody.setAccelerationY(this.CharacterConfig.accelerationDown)
        break

      default:
        break
    }

    switch (direction) {
      case 'pressed left':
        if (this.sprintSettings.left.doubleTap) {
          ;(this.sprintSettings.value = true),
            (this.sprintSettings.direction = 'left')
          return
        }

        this.sprintSettings.left.doubleTap = true
        this.sprintSettings.left.timeOut = setTimeout(() => {
          this.sprintSettings.left.doubleTap = false
        }, this.sprintTimeoutTime)
        break

      case 'unpressed left':
        if (this.sprintSettings.value) {
          this.sprintSettings.left.doubleTap = true
          this.sprintSettings.left.timeOut = setTimeout(() => {
            this.sprintSettings.left.doubleTap = false
          }, this.sprintTimeoutTime)

          this.sprintSettings.value = false
        }
        break

      case 'pressed right':
        if (this.sprintSettings.right.doubleTap) {
          this.sprintSettings.value = true
          this.sprintSettings.direction = 'right'
          return
        }

        this.sprintSettings.right.doubleTap = true
        this.sprintSettings.right.timeOut = setTimeout(() => {
          this.sprintSettings.right.doubleTap = false
        }, this.sprintTimeoutTime)
        break

      case 'unpressed right':
        if (this.sprintSettings.value) {
          this.sprintSettings.right.doubleTap = true
          this.sprintSettings.right.timeOut = setTimeout(() => {
            this.sprintSettings.right.doubleTap = false
          }, this.sprintTimeoutTime)

          this.sprintSettings.value = false
        }

        break

      case 'pressed up':
        if (this.physicsBody.data.touchingGround) {
          this.currentJumps = 1
        } else if (this.currentJumps < this.CharacterConfig.maxJumps) {
          this.currentJumps += 1
        } else {
          return
        }

        this.physicsBody.setVelocityY(-this.CharacterConfig.jumpHeight)
        break

      default:
        break
    }
  }

  attackManager(attack) {
    let hitbox = null
    let variable = 0
    switch (attack) {
      case 'neutral fast':
        this.facingRight ? (variable = 70) : (variable = 0)
        hitbox = new Hitbox({
          scene: this.CharacterConfig.Scene,
          x: this.physicsBody.body.x + variable,
          y: this.physicsBody.body.y + 70,
        })
        hitbox.setDepth(2)
        break

      case 'forward fast':
        console.log(attack)
        return

      default:
        break
    }

    const players = this.CharacterConfig.Scene.Players.getChildren()
    const hitboxBounds = hitbox.getBounds()

    players.forEach((character) => {
      if (character.id === this.id) return
      const playerBounds = character.physicsBody.getBounds()
      const output = Phaser.Geom.Rectangle.Overlaps(hitboxBounds, playerBounds)
      if (output === true) {
        character.handleAttack(attack, variable > 0 ? false : true)
      }
    })

    const cpus = this.CharacterConfig.Scene.CPUs.getChildren()
    cpus.forEach((character) => {
      if (character.id === this.id) return
      const playerBounds = character.physicsBody.getBounds()
      const output = Phaser.Geom.Rectangle.Overlaps(hitboxBounds, playerBounds)
      if (output === true) {
        character.handleAttack(attack, variable > 0 ? false : true)
      }
    })
  }

  handleAttack(attack, directionIsLeft) {
    this.physicsBody.setMaxVelocity(9000)
    this.physicsBody.setDrag(10)
    switch (attack) {
      case 'neutral fast':
        if (directionIsLeft) {
          this.physicsBody.setVelocity(
            -500 * this.hitMultiplier,
            -500 * this.hitMultiplier
          )
        } else {
          this.physicsody.setVelocity(
            500 * this.hitMultiplier,
            -500 * this.hitMultiplier
          )
        }
        this.hitMultiplier += 0.1
        break

      default:
        break
    }
  }
}

export default Character
