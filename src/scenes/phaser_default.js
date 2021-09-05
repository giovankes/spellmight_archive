import Phaser from 'phaser'
import logoImg from "../assets/images/logo.png";
import blockImg from '../assets/images/block.png'
import ballImg from '../assets/images/ball.png'


class PhaserDefaultScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'phaser-default-scene'
        })
        
        this.playerMoving = false
        this.playerTouchingGround = false
        this.playerJumps = 0
    }

    preload() {
        this.load.image("logo", logoImg);
        this.load.image('ball', ballImg)
        this.load.image('block', blockImg)
    }
      
    create() {
        this.player = this.physics.add.sprite(this.sys.game.config.width/2, 150, "ball");
        const groundX = this.sys.game.config.width/2
        const groundY = this.sys.game.config.height*.80
        this.ground = this.physics.add.sprite(groundX, groundY, "block");
        this.ground.displayWidth = this.sys.game.config.width*0.6
        
        
        // console.log(this.floor)
        
        this.player.setGravityY(2500)
        this.player.setMaxVelocity(500, 2500)
        this.player.setDrag(1500, 0)
        
        this.player.body.collideWorldBounds = true
        this.player.body.onWorldBounds = true
        this.physics.add.collider(this.player, this.ground, this.touchingGround, null, this);
        this.ground.setImmovable()
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.cursors = this.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D
        });
        
        this.physics.add.overlap(this.player, this.ground, this.touchingGround, null, this)

        this.physics.world.on('worldbounds', (body) => {
            this.resetPlayer(body.gameObject)
        })
    }

    touchingGround(player, ground) {
        this.playerTouchingGround = true
        this.playerJumps = 0
    }

    jump(target) {
        if (this.playerTouchingGround) {
            target.setVelocityY(-800)
            this.playerJumps = 1
        } else {
            if (this.playerJumps < 2) {
                target.setVelocityY(-800)
                this.playerJumps += 1
            }
        }
    }

    resetPlayer(player) {
        player.setX(this.sys.game.config.width/2)
        player.setY(150)
    }

    update() {
        this.player.setAccelerationX(0)
        this.player.setAccelerationY(0)


        if (this.cursors.left.isDown) {
            this.player.setAccelerationX( -2000 )
        }
        
        if (this.cursors.right.isDown) {
            this.player.setAccelerationX( 2000 )
        }

        if (this.cursors.down.isDown) {
            this.player.setAccelerationY( 5000 )
        }


        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.jump(this.player)
        }
        
        // this.checkOnWorldBounds()
        this.playerTouchingGround = false
    }
}

export default PhaserDefaultScene