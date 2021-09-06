import Phaser from 'phaser'
import { CST } from '../../CST'

import MageCharacter from '../../gameObjects/characters/character_mage'

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
    this.hitBoxes = this.add.group()
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
        switch (character.character) {
          case 1:
            const newPlayer = new MageCharacter({
              Scene: this,
              x,
              y,
              isPlayer: true,
              index,
            })
            newPlayer.setDepth(2)
            this.Characters.add(newPlayer)
            break
          default:
            break
        }
        // Add CPU's and their characters
      } else if (character.type === 'cpu') {
        switch (character.character) {
          case 1:
            const newCPU = new MageCharacter({
              Scene: this,
              x,
              y,
              index,
            })
            newCPU.setDepth(2)
            this.Characters.add(newCPU)
            break
          default:
            break
        }
      }
    })

    // Add character collision
    this.Characters.getChildren().forEach((character) => {
      this.physics.add.collider(
        character,
        this.CollisionAreas,
        this.touchingGround,
        null,
        this
      )
    })

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
    this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

    this.scene.get(CST.SCENES.INPUT).getCurrentScene(this.StageConfig.KEY)
  }

  respawn(body) {
    body.setEnable(false)
    let character = body.gameObject
    if (!character) return
    body.gameObject.setY(-100)
    body.gameObject.setX(480 / 2)
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
        })
      },
    })
  }

  cameraShake(intensity) {
    this.cameras.main.shake(150, intensity, true)
  }

  touchingGround(character, ground) {
    // Check if touching the top of the ground
    if (!character.body.touching.down || !ground.body.touching.up) return
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

    const Character = this.Characters.getChildren()[playerIndex]
    if (status === 'down') {
      let variant = null
      if (Character.pressing.LEFT || Character.pressing.RIGHT)
        variant = 'forward'
      else if (Character.pressing.UP) variant = 'up'
      else if (Character.pressing.DOWN) variant = 'down'

      switch (key) {
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
          break
        case 'RIGHT':
          Character.movementManager('unpressed right')
          Character.pressing.RIGHT = false
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
        default:
          break
      }
    }
  }

  update() {
    //! TEMPORARY APPROACH SINCE THERE IS ONLY 1 LOCALLY PLAYABLE CHARACTER AT A TIME
    const Player = this.Characters.getChildren()[0]
    const CPU = this.Characters.getChildren()[1]

    // Make camera follow and zoom players
    //! ONLY WORKS WITH 2 PLAYERS
    const playerBounds = Player.getBounds()
    const cpuBounds = CPU.getBounds()
    const boundsMedian = {
      x: (playerBounds.centerX + cpuBounds.centerX) / 2,
      y: (playerBounds.centerY + cpuBounds.centerY) / 2,
    }
    this.playerDistance = Phaser.Math.Distance.Between(
      playerBounds.centerX,
      playerBounds.centerY,
      cpuBounds.centerX,
      cpuBounds.centerY
    )
    const zoomAmount = 3 / (this.playerDistance / 100)
    if (zoomAmount < 1) this.cameras.main.zoomTo(1, 200)
    else if (zoomAmount > 1.5) this.cameras.main.zoomTo(1.5, 200)
    else this.cameras.main.zoomTo(zoomAmount, 200)
    this.debugRectangle.setX(boundsMedian.x)
    this.debugRectangle.setY(boundsMedian.y)

    // Check if players & cpus are out of bounds
    if (
      playerBounds.centerX > 480 ||
      playerBounds.centerX < 0 ||
      playerBounds.centerY > 270 ||
      playerBounds.centerY < 0
    ) {
      let foundArrow = null
      this.outOfBoundsArrows.getChildren().forEach((arrow) => {
        const arrowData = arrow.data.list
        if (arrowData && arrowData.ownerID === Player.id) foundArrow = arrow
      })
      if (!foundArrow) {
        this.outOfBoundsArrows.add(
          this.add
            .image(-100, -100, CST.IMAGE.UI.INGAME.ARROW_RIGHT)
            .setData({
              ownerID: Player.id,
            })
            .setScale(0.1)
            .setOrigin(0)
        )
      } else {
        let x
        let y
        if (playerBounds.centerX > 0 && playerBounds.centerX < 480)
          x = playerBounds.centerX
        else if (playerBounds.centerX < 0) {
          foundArrow.setFlipX(true)
          x = 20
        } else if (playerBounds.centerX > 480) {
          foundArrow.setFlipX(false)
          x = 430
        }
        if (playerBounds.centerY > 0 && playerBounds.centerY < 270)
          y = playerBounds.centerY - 20
        else if (playerBounds.centerY < 0) {
          y = 20
          foundArrow.setFlipX(true)
          foundArrow.setRotation(1.57)
        } else if (playerBounds.centerY > 270) {
          y = 250
          foundArrow.setFlipX(true)
          foundArrow.setRotation(1.57)
        }
        foundArrow.setX(x).setY(y)
      }
    } else if (
      cpuBounds.centerX > 480 ||
      cpuBounds.centerX < 0 ||
      cpuBounds.centerY > 270 ||
      cpuBounds.centerY < 0
    ) {
      let foundArrow = null
      this.outOfBoundsArrows.getChildren().forEach((arrow) => {
        const arrowData = arrow.data.list
        if (arrowData && arrowData.ownerID === CPU.id) foundArrow = arrow
      })
      if (!foundArrow) {
        this.outOfBoundsArrows.add(
          this.add
            .image(-100, -100, CST.IMAGE.UI.INGAME.ARROW_RIGHT)
            .setData({
              ownerID: CPU.id,
            })
            .setScale(0.1)
            .setOrigin(0)
        )
      } else {
        let x
        let y
        if (cpuBounds.centerX > 0 && cpuBounds.centerX < 480)
          x = cpuBounds.centerX
        else if (cpuBounds.centerX < 0) {
          foundArrow.setFlipX(true)
          x = 20
        } else if (cpuBounds.centerX > 480) {
          foundArrow.setFlipX(false)
          x = 430
        }
        if (cpuBounds.centerY > 0 && cpuBounds.centerY < 270)
          y = cpuBounds.centerY - 20
        else if (cpuBounds.centerY < 0) {
          y = 20
          foundArrow.setFlipX(true)
          foundArrow.setRotation(1.57)
        } else if (cpuBounds.centerY > 270) {
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
        if (
          (arrowData && arrowData.ownerID === Player.id) ||
          arrowData.ownerID === CPU.id
        )
          foundArrow = arrow
      })
      if (foundArrow) {
        foundArrow.destroy()
      }
    }

    // Check projectile overlap
    const projectiles = this.projectiles.getChildren()
    if (projectiles.length) {
      projectiles.forEach((projectile) => {
        const projectileBounds = projectile.getBounds()

        let hit = false

        this.Characters.getChildren().forEach((character) => {
          const characterBounds = character.getBounds()
          if (
            Phaser.Geom.Rectangle.Overlaps(projectileBounds, characterBounds)
          ) {
            if (character.id === projectile.ownerID) return
            const offset = characterBounds.centerX - projectileBounds.centerX
            character.handleAttack(
              projectile.hitDetails,
              offset > 0 ? true : false
            )
            hit = true
          }
        })
        if (hit === true) projectile.destroy()
      })
    }

    // Reset acceleration
    // Player.body.setAcceleration(0, 0)

    // Pause Menu
    if (Phaser.Input.Keyboard.JustDown(this.esc))
      this.scene.start(CST.SCENES.MENU)
  }
}

export default Stage
