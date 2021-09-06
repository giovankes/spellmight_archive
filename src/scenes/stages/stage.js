import Phaser from 'phaser'
import { CST } from '../../CST'

import MageCharacter from '../../gameObjects/characters/character_mage'
import WitchCharacter from '../../gameObjects/characters/character_witch'
import ButcherCharacter from '../../gameObjects/characters/character_butcher'

import EffectSpritesheet from '../../gameObjects/misc/effect-spritesheet'
class Stage extends Phaser.Scene {
  constructor(config) {
    super({
      key: config.KEY,
    })

    this.StageConfig = config
  }

  init(data) {
    this.charactersToSpawn = data.characters
  }

  create() {
    this.physics.world.setBounds(
      -100,
      -50,
      this.game.renderer.width + 200,
      this.game.renderer.height + 100,
      true,
      true,
      true,
      true
    )
    // Create background elements
    this.Background = this.add.group(null, {
      name: 'Background',
    })

    this.physics.world.on('worldbounds', (body) => {
      if (body.gameObject.execWorldBounds) body.gameObject.execWorldBounds()
    })
    this.StageConfig.BackgroundElements.forEach((Element, index) => {
      this.Background.add(
        this.add.image(0, 0, Element.IMG).setOrigin(0).setDepth(0)
      )
    })

    // Create middleground elements
    this.Middleground = this.add.group(null, {
      name: 'Middleground',
    })
    this.StageConfig.MiddlegroundElements.forEach((Element, index) => {
      this.Middleground.add(
        this.add.image(0, 0, Element.IMG).setOrigin(0).setDepth(1)
      )
    })

    // Create foreground elements
    this.Foreground = this.add.group(null, {
      name: 'Foreground',
    })
    this.StageConfig.ForegroundElements.forEach((Element, index) => {
      this.Foreground.add(
        this.add.image(0, 0, Element.IMG).setOrigin(0).setDepth(3)
      )
    })

    // Add particles
    if (this.StageConfig.Particles) {
      this.Particles = this.add.group(null, {
        name: 'Particles',
      })
      this.StageConfig.Particles.forEach((particle, index) => {
        this.Particles.add(
          this.add.particles(particle.IMG, null, particle.CONFIG)
        )
      })
    }

    // Add collision areas
    this.CollisionAreas = this.add.group(null, {
      name: 'Collision Areas',
    })
    this.StageConfig.CollisionAreas.forEach((area, index) => {
      this.CollisionAreas.add(
        this.physics.add.existing(
          this.add.rectangle(area.x, area.y, area.width, area.height),
          true
        )
      )
    })

    this.physics.world.on('worldbounds', (body) => {
      if (body.gameObject.id) {
        this.respawn(body)
      }
    })

    // Create out of bounds arrow group
    this.outOfBoundsArrows = this.add.group(null, {
      name: 'Out of bounds arrows',
    })

    // Add hitbox & projectiles group
    this.hitBoxes = this.physics.add.group()
    this.projectiles = this.add.group()

    this.Characters = this.add.group()
    this.charactersToSpawn.forEach((character, index) => {
      let x = 40
      let y = 40
      if (this.charactersToSpawn.length === 2) {
        if (index === 1) {
          x = this.game.renderer.width - 100
        }
      } else if (this.charactersToSpawn.length === 3) {
        if (index === 1) {
          x = this.game.renderer.width / 2
        } else if (index === 2) {
          x = this.game.renderer.width - 100
        }
      } else if (this.charactersToSpawn.length === 3) {
        if (index === 1) {
          x = this.game.renderer.width / 2 - 40
        } else if (index === 2) {
          x = this.game.renderer.width / 2 + 40
        } else if (index === 3) {
          x = this.game.renderer.width - 100
        }
      }
      // Add players and their characters
      if (character.type === 'player') {
        let newPlayer
        switch (character.character) {
          case 1:
            newPlayer = new MageCharacter({
              Scene: this,
              x,
              y,
              isPlayer: true,
              index,
            })
            break
          case 2:
            newPlayer = new WitchCharacter({
              Scene: this,
              x,
              y,
              isPlayer: true,
              index,
            })
            break
          case 3:
            newPlayer = new ButcherCharacter({
              Scene: this,
              x,
              y,
              isPlayer: true,
              index,
            })
          default:
            break
        }
        newPlayer.setDepth(2)
        this.Characters.add(newPlayer)
        // Add CPU's and their characters
      } else if (character.type === 'cpu') {
        let newCPU
        switch (character.character) {
          case 1:
            newCPU = new MageCharacter({
              Scene: this,
              x,
              y,
              index,
            })
            newCPU.setDepth(2)
            this.Characters.add(newCPU)
            break
          case 2:
            newCPU = new WitchCharacter({
              Scene: this,
              x,
              y,
              isPlayer: true,
              index,
            })
            break
          case 3:
            newCPU = new ButcherCharacter({
              Scene: this,
              x,
              y,
              isPlayer: true,
              index,
            })
          default:
            break
        }
        newCPU.setDepth(2)
        this.Characters.add(newCPU)
      }
    })

    // Add character collision
    this.physics.add.collider(
      this.Characters,
      this.CollisionAreas,
      this.touchingGround,
      null,
      this
    )
    this.physics.add.overlap(
      this.Characters,
      this.projectiles,
      (character, projectile) => {
        if (projectile.ownerID === character.id) return
        character.handleAttack(projectile.hitDetails, projectile.sprite.flipX)
        projectile.destroy()
      },
      null,
      this
    )

    this.physics.add.collider(
      this.CollisionAreas,
      this.projectiles,
      (collisionArea, projectile) => {
        projectile.explode()
        projectile.destroy()
      },
      null,
      this
    )

    this.physics.add.collider(
      this.hitBoxes,
      this.Characters,
      (character, hitbox) => {
        if (
          hitbox.id === character.id ||
          hitbox.hitCharacters.includes(character.id)
        )
          return
        character.handleAttack(hitbox.attack, hitbox.direction)
        hitbox.hitCharacters.push(character.id)
      },
      null,
      this
    )

    // Set up the camera
    this.debugRectangle = this.add.rectangle(0, 0, 20, 20, 0xffffff)
    this.cameras.main.setBounds(
      0,
      0,
      this.game.renderer.width,
      this.game.renderer.height
    )
    this.cameras.main.setZoom(1.1)
    this.cameras.main.setOrigin(0.5)
    this.cameras.main.setRoundPixels(true)
    this.cameras.main.startFollow(this.debugRectangle, true, 0.1, 0.1)
    this.cameras.main.ignore(this.debugRectangle)

    // Create respawn data object
    this.respawnData = {
      respawning: false,
      cameraChangingModes: false,
    }

    // Set up the hotkeys
    this.fightingButtons = {
      J: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),
      K: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K),
      Q: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
      E: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
      R: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R),
    }

    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    })

    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    )

    this.scene.get(CST.SCENES.INPUT).getCurrentScene(this.StageConfig.KEY)
  }

  respawn(body) {
    body.setEnable(false)
    let character = body.gameObject
    if (!character) return
    body.gameObject.setY(-100)
    body.gameObject.setX(480 / 2)
    this.scene
      .get(CST.SCENES.INTERFACE)
      .updatePlayerPercent(character.CharacterConfig.index, 1)
    this.tweens.add({
      targets: body.gameObject,
      y: { from: -100, to: 30 },
      ease: 'Power1',
      duration: 1000,
      onComplete: () => {
        this.time.addEvent({
          delay: 500,
          callback: () => {
            body.setVelocity(0, 0)
            body.setAcceleration(0)
            body.setBounce(0)
            character.hitMultiplier = 1
            body.setEnable(true)
          },
          callbackScope: this,
        })
      },
    })

    // Remove out of bounds arrow
    this.outOfBoundsArrows.getChildren().forEach((arrow) => {
      if (arrow.data.list.ownerID === body.gameObject.id) {
        this.outOfBoundsArrows.killAndHide(arrow)
        arrow.destroy()
      }
    })
  }

  cameraShake(intensity) {
    this.cameras.main.shake(150, intensity, true)
  }

  touchingGround(character, ground) {
    // Check if touching the top of the ground
    if (!character.body.touching.down || !ground.body.touching.up) return
    if (!character.touchingGround) {
      const dust = new EffectSpritesheet({
        Scene: this,
        x: character.body.center.x,
        y: character.body.bottom - 5,
        spritesheetKey: CST.SPRITESHEET.CHARACTERS.DUST.JUMP.IMG,
        scale: 0.7,
        flipX: false,
      })
        .setOrigin(0.5)
        .play(CST.SPRITESHEET.CHARACTERS.DUST.JUMP.ANIMS.LAND)
        .once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
          dust.destroy()
        })
    }
    character.touchingGround = true
    character.body.setDrag(2500, 0)
    character.body.setBounce(0)
  }

  getControls(key, playerIndex, status) {
    let players = 0
    this.Characters.getChildren().forEach((character) => {
      if (character.isPlayer) {
        players += 1
      }
    })

    // If person pressing buttons on a controller that's not in the game, return
    if (playerIndex + 1 > players) return
    // If the scene is paused, return
    if (this.scene.isPaused(this)) {
      if (status === 'down') {
        if (key === 'X') {
          this.scene.start(CST.SCENES.MENU.MAIN)
          this.scene.get(CST.SCENES.INPUT).getCurrentScene(null)
          this.scene.stop(CST.SCENES.INTERFACE)
          // this.scene.get(CST.SCENES.INTERFACE).scene.stop()
        } else if (key === 'ENTER/START') {
          if (this.scene.isPaused(this)) {
            this.scene.resume(this)
            this.scene.get(CST.SCENES.INTERFACE).resume()
          } else {
            this.Characters.getChildren().forEach((character) => {
              this.unpressEverything(character)
            })
            this.scene.pause(this)
            this.scene.get(CST.SCENES.INTERFACE).pause()
          }
        }
      }
      return
    }

    const Character = this.Characters.getChildren()[playerIndex]
    if (Character.rooted) {
      this.unpressEverything(Character)
      return
    }
    if (status === 'down') {
      let variant = null
      if (Character.pressing.LEFT || Character.pressing.RIGHT)
        variant = 'forward'
      else if (Character.pressing.UP) variant = 'up'
      else if (Character.pressing.DOWN) variant = 'down'

      switch (key) {
        case 'ENTER/START':
          if (this.scene.isPaused(this)) {
            this.scene.get(CST.SCENES.INTERFACE).resume()
            this.scene.resume(this)
          } else {
            this.Characters.getChildren().forEach((character) => {
              this.unpressEverything(character)
            })
            this.scene.pause(this)
            this.scene.get(CST.SCENES.INTERFACE).pause()
          }
          break
        case 'JUMP':
          Character.movementManager('pressed up')
          Character.pressing.UP = true
          break
        case 'DOWN':
          Character.movementManager('pressed down')
          Character.pressing.DOWN = true
          break
        case 'LEFT':
          Character.movementManager('pressed left')
          Character.pressing.LEFT = true
          break
        case 'RIGHT':
          Character.movementManager('pressed right')
          Character.pressing.RIGHT = true
          break
        case 'A':
          Character.attackManager('attack light', variant)
          Character.pressing.A = true
          break
        case 'B':
          Character.attackManager('attack heavy', variant)
          Character.pressing.B = true
          break
        case 'X':
          Character.attackManager('ability one')
          Character.pressing.X = true
          break
        case 'Y':
          Character.attackManager('ability two')
          Character.pressing.Y = true
          break
        case 'LB':
          Character.pressing.LB = true
          Character.attackManager('ultimate')
          break
        case 'LT':
          Character.pressing.LT = true
          Character.movementManager('pressed shield')
          break
        default:
          break
      }
    } else if (status === 'up') {
      switch (key) {
        case 'JUMP':
          Character.movementManager('unpressed up')
          Character.pressing.UP = false
          break
        case 'DOWN':
          Character.movementManager('unpressed down')
          Character.pressing.DOWN = false
          break
        case 'LEFT':
          Character.movementManager('unpressed left')
          Character.pressing.LEFT = false
          if (Character.pressing.RIGHT)
            Character.movementManager('pressed right')
          break
        case 'RIGHT':
          Character.movementManager('unpressed right')
          Character.pressing.RIGHT = false
          if (Character.pressing.LEFT) Character.movementManager('pressed left')
          break
        case 'A':
          Character.pressing.A = false
          break
        case 'B':
          Character.pressing.B = false
          break
        case 'X':
          Character.pressing.X = false
          break
        case 'Y':
          Character.pressing.Y = false
          break
        case 'LB':
          Character.pressing.LB = false
          break
        case 'LT':
          Character.pressing.LT = false
          Character.movementManager('unpressed shield')
          break
        default:
          break
      }
    }
  }

  unpressEverything(Character) {
    Character.movementManager('unpressed up')
    Character.pressing.UP = false
    Character.movementManager('unpressed down')
    Character.pressing.DOWN = false
    Character.movementManager('unpressed left')
    Character.pressing.LEFT = false
    Character.movementManager('unpressed right')
    Character.pressing.RIGHT = false

    Character.pressing.A = false
    Character.pressing.B = false
    Character.pressing.X = false
    Character.pressing.Y = false
  }

  update() {
    //! TEMPORARY APPROACH SINCE THERE IS ONLY 1 LOCALLY PLAYABLE CHARACTER AT A TIME
    const Player = this.Characters.getChildren()[0]
    const CPU = this.Characters.getChildren()[1]

    // Make camera follow and zoom players
    //! ONLY WORKS WITH 2 PLAYERS
    const boundsMedian = {
      x: (Player.body.center.x + CPU.body.center.x) / 2,
      y: (Player.body.center.y + CPU.body.center.y) / 2,
    }
    this.playerDistance = Phaser.Math.Distance.Between(
      Player.body.center.x,
      Player.body.center.y,
      CPU.body.center.x,
      CPU.body.center.y
    )
    const zoomAmount = 3 / (this.playerDistance / 100)
    if (zoomAmount < 1) this.cameras.main.zoomTo(1, 200)
    else if (zoomAmount > 1.5) this.cameras.main.zoomTo(1.5, 200)
    else this.cameras.main.zoomTo(zoomAmount, 200)
    this.debugRectangle.setX(boundsMedian.x)
    this.debugRectangle.setY(boundsMedian.y)

    // Set character drag higher
    this.Characters.getChildren().forEach((character) => {
      if (!character.touchingGround) {
        character.body.setDrag(250, 0)
      }
    })

    // Check if characters are out of bounds
    for (let index = 0; index < this.Characters.getChildren().length; index++) {
      const Character = this.Characters.getChildren()[index]

      if (!Character.body.enable) break
      if (
        Character.body.center.x > 480 ||
        Character.body.center.x < 0 ||
        Character.body.center.y > 270 ||
        Character.body.center.y < 0
      ) {
        let foundArrow = null
        this.outOfBoundsArrows.getChildren().forEach((arrow) => {
          const arrowData = arrow.data.list
          if (arrowData && arrowData.ownerID === Character.id)
            foundArrow = arrow
        })
        if (!foundArrow) {
          this.outOfBoundsArrows.add(
            this.add
              .image(-100, -100, CST.IMAGE.UI.INGAME.ARROW_RIGHT)
              .setData({
                ownerID: Character.id,
              })
              .setScale(0.1)
              .setOrigin(0)
          )
        } else {
          let x
          let y
          if (Character.body.center.x > 0 && Character.body.center.x < 480)
            x = Character.body.center.x
          else if (Character.body.center.x < 0) {
            foundArrow.setFlipX(true)
            x = 20
          } else if (Character.body.center.x > 480) {
            foundArrow.setFlipX(false)
            x = 430
          }
          if (Character.body.center.y > 0 && Character.body.center.y < 270)
            y = Character.body.center.y - 20
          else if (Character.body.center.y < 0) {
            y = 20
            foundArrow.setFlipX(true)
            foundArrow.setRotation(1.57)
          } else if (Character.body.center.y > 270) {
            y = 250
            foundArrow.setFlipX(true)
            foundArrow.setRotation(1.57)
          }
          foundArrow.setX(x).setY(y)
        }
      } else {
        let foundArrow = null
        this.outOfBoundsArrows.getChildren().forEach((arrow) => {
          const arrowData = arrow.data.list
          if (arrowData && arrowData.ownerID === Character.id)
            foundArrow = arrow
        })
        if (foundArrow) {
          foundArrow.destroy()
        }
      }
    }
  }
}

export default Stage
