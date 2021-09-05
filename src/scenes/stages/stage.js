import Phaser from 'phaser'
import { CST } from '../../CST'
import MageCharacter from '../../gameObjects/characters/character_mage'

class Stage extends Phaser.Scene {
    constructor(config) {
        super({
            key: config.KEY
        })

        this.StageConfig = config
    }

    create() {
        // Create background elements
        this.Background = this.add.group(null, {
            name: 'Background'
        })
        this.StageConfig.BackgroundElements.forEach((Element, index)=> {
            this.Background.add(
                this.add.image(0, 0, Element.IMG).setOrigin(0).setDepth(0)
            )
        })

        // Create middleground elements
        this.Middleground = this.add.group(null, {
            name: 'Middleground'
        })
        this.StageConfig.MiddlegroundElements.forEach((Element, index) => {
            this.Middleground.add(
                this.add.image(0, 0, Element.IMG).setOrigin(0).setDepth(1)
            )
        })

        // Create foreground elements
        this.Foreground = this.add.group(null, {
            name: 'Foreground'
        })
        this.StageConfig.ForegroundElements.forEach((Element, index) => {
            this.Foreground.add(
                this.add.image(0, 0, Element.IMG).setOrigin(0).setDepth(3)
            )
        })
   


        // Add collision areas
        this.CollisionAreas = this.add.group(null, {
            name: 'Collision Areas'
        })
        this.StageConfig.CollisionAreas.forEach((area, index) => {
            this.CollisionAreas.add(
                this.physics.add.existing(
                    this.add.rectangle(
                        area.x,
                        area.y,
                        area.width,
                        area.height
                    ), true
                )
            )
        })

        // Add players and their characters
        if (this.StageConfig.Players) {
            this.Players = this.add.group(null, {
                name: 'Players'
            })
            this.StageConfig.Players.forEach((player, index) => {
                switch (player.character) {
                    default:
                        this.Players.add(
                            new MageCharacter({
                                Scene: this,
                                x: 1080 / 2,
                                y: 150,
                                isPlayer: true
                            })
                        )
                        break;
                }

                const Player = this.Players.getChildren()[index]
                Player.physicsBody.setDepth(2)
            })

            // Add player collision
            this.physics.add.collider(
                this.Players.getChildren()[0].physicsBody,
                this.CollisionAreas,
                this.touchingGround,
                null,
                this
            )
        }

        // Add CPU's and their characters
        if (this.StageConfig.CPUs) {
            this.CPUs = this.add.group(null, {
                name: 'CPUs'
            })
            this.StageConfig.CPUs.forEach((cpu, index) => {
                switch (cpu.character) {
                    default:
                        const newCPU = new MageCharacter({
                            Scene: this,
                            x: 1080 / 1.5,
                            y: 150
                        })
                        newCPU.physicsBody.setDepth(2)
                        this.CPUs.add(newCPU)
                        break
                }
            })

            // Add CPU collision
            this.physics.add.collider(
                this.CPUs.getChildren()[0].physicsBody,
                this.CollisionAreas,
                this.touchingGround,
                null,
                this
            )
        }

        // Add hitbox group
        this.hitBoxes = this.add.group()

        // Set up the camera
        this.cameras.main.setBounds(0, 0, this.game.renderer.width, this.game.renderer.height)
        this.cameras.main.setZoom(1)
        // this.scale.autoRound = true
        if (this.Players) {
            this.cameras.main.startFollow(
                // For now follow the first player
                this.Players.getChildren()[0].physicsBody
            )
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
        this.esc = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.ESC
        )

        // this.scene.start(CST.SCENES.INTERFACE)

        // console.log(this.scene.manager.getScenes(false, false))

        // console.log(Phaser.Scenes.)
    }

    //TODO: Find a more performant way to do this
    getPlayerClass(character) {
        const characterID = character.data.id
        let foundPlayer = null
        this.Players.getChildren().forEach(Player => {
            if (Player.id !== characterID) {
            } else {
                foundPlayer = Player
            }
        })
        return foundPlayer
    }

    touchingGround(character, ground) {
        // Check if touching the top of the ground

        character.data.touchingGround = true
        character.setDrag(2500, 0)

        if (
            !character.body.touching.down ||
            !ground.body.touching.up ||
            !character.data
        ) return
    

        // const Player = this.getPlayerClass(character)
        // if (Player) {
        //     Player.physicsBody.setDrag(2500, 0)
            
        // }
    }

    handleDeath(character) {
        character.gameObject.setX(540)
        character.gameObject.setY(150)

        const Player = this.getPlayerClass(character)
        if (Player) {
            Player.hitMultiplier = 1
            //TODO Implement lifes mechanic
        }
    }

    update() {
        //! TEMPORARY APPROACH SINCE THERE IS ONLY 1 LOCALLY PLAYABLE CHARACTER AT A TIME
        const Player = this.Players.getChildren()[0]

        // Reset acceleration
        Player.physicsBody.setAcceleration(0, 0)

        // Pause Menu
        if (Phaser.Input.Keyboard.JustDown(this.esc)) this.scene.start(CST.SCENES.MENU)

        // Movement
        if (this.cursors.left.isDown) Player.movementManager('holding left') 
        if (this.cursors.right.isDown) Player.movementManager('holding right')
        if (this.cursors.down.isDown) Player.movementManager('pressed down')
        if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) Player.movementManager('pressed left')
        if (Phaser.Input.Keyboard.JustUp(this.cursors.left)) Player.movementManager('unpressed left')
        if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) Player.movementManager('pressed right')
        if (Phaser.Input.Keyboard.JustUp(this.cursors.right)) Player.movementManager('unpressed right')
        if (
            Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
            Phaser.Input.Keyboard.JustDown(this.spacebar)
        ) Player.movementManager('pressed up')

        // Attacks & Abilities
        if (Phaser.Input.Keyboard.JustDown(this.fightingButtons.J)) {
            let variant = null
            if (this.cursors.right.isDown || this.cursors.left.isDown) {
                variant = 'forward'
            }
            Player.attackManager('attack light', variant)
        }
        if (Phaser.Input.Keyboard.JustDown(this.fightingButtons.K)) {
            let variant = null
            if (this.cursors.right.isDown || this.cursors.left.isDown) {
                variant = 'forward'
            }
            Player.attackManager('attack heavy', variant)
        }
        if(Phaser.Input.Keyboard.JustDown(this.fightingButtons.Q)){
            Player.attackManager('ability one')
        }
        if(Phaser.Input.Keyboard.JustDown(this.fightingButtons.E)){
            Player.attackManager('ability two')
        }
        
        if(Phaser.Input.Keyboard.JustDown(this.fightingButtons.R)){
            Player.attackManager('ultimate')
        }
        Player.physicsBody.data.touchingGround = false
    }
}

export default Stage