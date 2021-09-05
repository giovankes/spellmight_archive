// import Phaser from 'phaser'
// import { CST } from '../../CST'
// import Character from '../../gameObjects/sprites/characters/character_debug'

// class PhaserDefaultScene extends Phaser.Scene {
//     constructor() {
//         super({
//             key: CST.SCENES.STAGES.TEST
//         })
//     }

//     create() {
//         const background = this.add.image(0, 0, CST.IMAGE.STAGES.TEST.BACKGROUND).setOrigin(0)
//         background.displayWidth = 1920
//         background.displayHeight = 1080
//         this.physics.world.setBounds(0, 0, 1920, 1080)
//         const groundX = 1000
//         const groundY = this.sys.game.config.height * 0.8
//         this.ground = this.physics.add.sprite(groundX, groundY, CST.IMAGE.STAGES.TEST.FLOOR)
//         this.ground.displayWidth = background.displayWidth * 0.6
//         this.ground.displayHeight = 100
//         this.ground.setTintFill('0x4a4039')   
//         this.CharacterClass = new Character({
//             scene: this,
//             x: this.sys.game.config.width / 1.5,
//             y: 150,
//             color: '0x5a92bf'
//         })

//         this.EnemyClass = new Character({
//             scene: this,
//             x: background.displayWidth * 0.5,
//             y: 150
//         })

//         this.players = this.physics.add.group([
//             this.CharacterClass,
//             this.EnemyClass
//         ])

//         this.CharacterClass.setupAsPlayer()
//         this.EnemyClass.setup()
//         this.hitBoxes = this.add.group()

//         const players = this.players.getChildren()

//         players.forEach(player => {
//             this.physics.add.collider(
//                 player.sprite,
//                 this.ground,
//                 this.touchingGround,
//                 null,
//                 this
//             )
//         })

//         this.cameras.main.startFollow(this.CharacterClass.sprite)
//         this.cameras.main.setBounds(0, 0, 2000, 2000)
//         this.ground.setImmovable()
//         this.spacebar = this.input.keyboard.addKey(
//             Phaser.Input.Keyboard.KeyCodes.SPACE
//         )
//         this.esc = this.input.keyboard.addKey(
//             Phaser.Input.Keyboard.KeyCodes.ESC
//         )

//         this.fightingButtons = {
//             J: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),
//             K: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)
//         }

//         this.cursors = this.input.keyboard.addKeys({
//             up: Phaser.Input.Keyboard.KeyCodes.W,
//             down: Phaser.Input.Keyboard.KeyCodes.S,
//             left: Phaser.Input.Keyboard.KeyCodes.A,
//             right: Phaser.Input.Keyboard.KeyCodes.D
//         })

//         this.physics.world.on('worldbounds', body => {
//             this.resetPlayer(body)
//         })

//         this.walkLeft = this.anims.create({
//             key: 'left',
//             frames: this.anims.generateFrameNumbers(CST.SPRITESHEET.CHARACTERS.TEST, { start: 0, end: 3 }),
//             frameRate: 10,
//             repeat: -1
//         });
        
//         this.anims.create({
//             key: 'turn',
//             frames: [ { key: CST.SPRITESHEET.CHARACTERS.TEST, frame: 4 } ],
//             frameRate: 20
//         });
        
//         this.anims.create({
//             key: 'right',
//             frames: this.anims.generateFrameNumbers(CST.SPRITESHEET.CHARACTERS.TEST, { start: 5, end: 8 }),
//             frameRate: 10,
//             repeat: -1
//         });
//     }

//     touchingGround(object1, object2) {
//         if (
//             object1.body.touching.down &&
//             object2.body.touching.up &&
//             object1.data &&
//             object1.data.player
//         ) {
//             object1.data.touchingGround = false
//             this.CharacterClass.currentJumps = 0
//         }
//         const characterID = object1.data.id
//         const players = this.players.getChildren()

//         players.forEach(player => {
//             if (player.id !== characterID) return
//             player.sprite.setDrag(2500, 0)
//         })
        
//     }
    
//     resetPlayer(character) {
//         character.gameObject.setX(1000)
//         character.gameObject.setY(150)
//         const characterID = character.gameObject.data.id
//         const players = this.players.getChildren()
//         players.forEach(player => {
//             if (player.id !== characterID) return
//             player.hitMultiplier = 1
//         })
//     }

//     update() {
//         this.CharacterClass.sprite.setAccelerationX(0)
//         this.CharacterClass.sprite.setAccelerationY(0)

//         if (this.cursors.left.isDown) {
//             this.CharacterClass.movementManager('holding left') 
//         }

//         if (this.cursors.right.isDown) {
//             this.CharacterClass.movementManager('holding right')
//         }

//         if (this.cursors.down.isDown) {
//             this.CharacterClass.movementManager('pressed down')
//         }

//         if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
//             this.CharacterClass.movementManager('pressed left')
//             this.CharacterClass.sprite.anims.play('left')
//         }
//         if (Phaser.Input.Keyboard.JustUp(this.cursors.left)) {
//             this.CharacterClass.movementManager('unpressed left')
//             this.CharacterClass.sprite.anims.stop()
//             this.CharacterClass.sprite.anims.play('turn')
//         }

//         if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
//             this.CharacterClass.movementManager('pressed right')
//             this.CharacterClass.sprite.anims.play('right')
//         }
//         if (Phaser.Input.Keyboard.JustUp(this.cursors.right)) {
//             this.CharacterClass.movementManager('unpressed right')
//             this.CharacterClass.sprite.anims.stop()
//             this.CharacterClass.sprite.anims.play('turn')
//         }

//         if (Phaser.Input.Keyboard.JustDown(this.esc)) {
//             this.scene.start(CST.SCENES.MENU)
//         }

//         if (
//             Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
//             Phaser.Input.Keyboard.JustDown(this.spacebar)
//         ) {
//             this.CharacterClass.movementManager('pressed up')
//         }

//         if (Phaser.Input.Keyboard.JustDown(this.fightingButtons.J)) {
//             if (this.cursors.right.isDown || this.cursors.left.isDown) {
//                 this.CharacterClass.attackManager('forward fast')
//                 return
//             }

//             this.CharacterClass.attackManager('neutral fast')
//         }

//         this.CharacterClass.touchingGround = false
//     }
// }

// export default PhaserDefaultScene
