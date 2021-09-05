import Phaser from 'phaser'
import UUIDv4 from 'uuid/v4'

import StaticHitbox from '../attacks-abilities/static'

class Character extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(
            config.Scene,
            config.x,
            config.y,
        )

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
                timeOut: null
            },
            right: {
                doubleTap: false,
                timeOut: null
            }
        }

        // Create animations
        config.anims.forEach(({key, frames, frameRate, repeat}) => {
            config.Scene.anims.create({
                key,
                frames: config.Scene.anims.generateFrameNumbers(frames.key, frames.startEnd),
                frameRate,
                repeat,

            })
            console.log(config.Scene.anims)

        })

        

        // Class variables for functions
        this.CharacterConfig = config
        this.sprintTimeoutTime = 300

        // Set correct physicsBody config
        this.physicsBody.setGravityY(1500)
        this.physicsBody.body.collideWorldBounds = true
        this.physicsBody.setDrag(config.drag, 0)
        this.physicsBody.body.onWorldBounds = true
        // this.physicsBody.body.setBoundsRectangle(config.collisionBox)
        this.physicsBody.body.setSize(config.collisionBodySize.width, config.collisionBodySize.height)
        this.physicsBody.body.setOffset(config.collisionBodySize.offsetX, config.collisionBodySize.offsetY)
        this.physicsBody.setScale(config.scale)
        this.physicsBody.data = {
            touchingGround: false,
            player: config.isPlayer,
            id: this.id
        }
    }

    movementManager(direction) {
        switch (direction) {
            case 'holding left':
                this.facingRight = false
                if (this.sprintSettings.direction === 'left' && this.sprintSettings.value) {
                    this.physicsBody.setMaxVelocity(this.CharacterConfig.sprintVelocity, 2500)
                    this.physicsBody.setAccelerationX(-this.CharacterConfig.accelerationX * 1.25)
                } else {
                    this.physicsBody.setMaxVelocity(this.CharacterConfig.normalVelocity, 2500)
                    this.physicsBody.setAccelerationX(-this.CharacterConfig.accelerationX)
                }
                break;

            case 'holding right':
                this.facingRight = true
                if (this.sprintSettings.direction === 'right' && this.sprintSettings.value) {
                    this.physicsBody.setMaxVelocity(this.CharacterConfig.sprintVelocity, 2500)
                    this.physicsBody.setAccelerationX(this.CharacterConfig.accelerationX * 1.25)
                } else {
                    this.physicsBody.setMaxVelocity(this.CharacterConfig.normalVelocity, 2500)
                    this.physicsBody.setAccelerationX(this.CharacterConfig.accelerationX)
                }
                break;

            case 'pressed down':
                this.physicsBody.setAccelerationY(this.CharacterConfig.accelerationDown)
                break;

            default:
                break;
        }

        switch (direction) {
            case 'pressed left':
                if (this.sprintSettings.left.doubleTap) {
                    this.sprintSettings.value = true,
                    this.sprintSettings.direction = 'left'
                    return
                }
    
                this.sprintSettings.left.doubleTap = true
                this.sprintSettings.left.timeOut = setTimeout(() => {
                    this.sprintSettings.left.doubleTap = false
                }, this.sprintTimeoutTime)
                break;

            case 'unpressed left':
                if (this.sprintSettings.value) {
                    this.sprintSettings.left.doubleTap = true
                    this.sprintSettings.left.timeOut = setTimeout(() => {
                        this.sprintSettings.left.doubleTap = false
                    }, this.sprintTimeoutTime)

                    this.sprintSettings.value = false
                }
                break;

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
                break;

            case 'unpressed right':
                if (this.sprintSettings.value) {
                    this.sprintSettings.right.doubleTap = true
                    this.sprintSettings.right.timeOut = setTimeout(() => {
                        this.sprintSettings.right.doubleTap = false
                    }, this.sprintTimeoutTime)

                    this.sprintSettings.value = false
                }

                break;

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
                break;
        }
    }

    attackManager(attack, variant) {
        let attackReturn = null
        switch (attack) {
            case 'attack light':
                attackReturn = this.CharacterConfig.attacks.attackLight.neutral.exec(this.facingRight)
                break;

            case 'attack heavy':
                // this.CharacterConfig
                break;
            case 'ability one':
                this.CharacterConfig.attacks.abilityOne.exec(this.facingRight)
                break;
            case 'ability two':
                console.log(attack + ' fired off!')
                break;
            case 'ultimate':
                console.log(attack + ' fired off!')
                break;
            default:
                break;
        }

        if (!attackReturn || !attackReturn.hitbox) return
        const players = this.CharacterConfig.Scene.Players.getChildren()

        players.forEach(character => {
            if (character.id === this.id) return
            const playerBounds = character.physicsBody.getBounds()
            const output = Phaser.Geom.Rectangle.Overlaps(attackReturn.hitbox, playerBounds)
            if (output === true) {
                character.handleAttack(attackReturn, this.facingRight)
            }
        })

        const cpus = this.CharacterConfig.Scene.CPUs.getChildren()
        cpus.forEach(character => {
            if (character.id === this.id) return
            const playerBounds = character.physicsBody.getBounds()
            const output = Phaser.Geom.Rectangle.Overlaps(attackReturn.hitbox, playerBounds)
            if (output === true) {
                character.handleAttack(attackReturn, this.facingRight)
            }
        })
    }

    handleAttack(attack, direction) {
        this.physicsBody.setMaxVelocity(9000)
        this.physicsBody.setDrag(10)
        this.hitMultiplier += attack.data.hitMultiplier
        direction ? this.physicsBody.setVelocityX(attack.data.velocityX * this.hitMultiplier) : this.physicsBody.setVelocity((attack.data.velocityX * -1) * this.hitMultiplier)
        this.physicsBody.setVelocityY(attack.data.velocityY * this.hitMultiplier)
    }
}

export default Character