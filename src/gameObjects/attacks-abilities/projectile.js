import Phaser from 'phaser'
import CST from '../../CST'

class Projectile extends Phaser.GameObjects.Sprite {
    constructor({ Scene, x, y, textureKey, animationKey, scale, life, maxVelocity, acceleration, facingRight, gravity, depth, id, hitDetails }) {
        super(Scene, x, y, textureKey)

        if (animationKey) {
            this.play(animationKey)
            // this.anims.play(animationKey, 0)
        }
        Scene.add.existing(this)
        Scene.physics.world.enableBody(this)
        this.body.collideWorldBounds = true
        this.body.onWorldBounds = true
        this.body.onOverlap = true
        if (facingRight) this.setFlipX(true)
        this.body.setMaxVelocity(maxVelocity.x, maxVelocity.y)
        this.body.setAcceleration(
            facingRight ? acceleration.x : -acceleration.x,
            acceleration.y
        )
        this.setDepth(depth || 2)
        this.setScale(scale)
        if (gravity) this.body.setGravityY(gravity)
        Scene.projectiles.add(this)

        if (life) {
            this.destroyTimer = Scene.time.delayedCall(
                life,
                () => {
                    this.destroy()
                }
            )
        }

        this.ownerID = id
        this.hitDetails = hitDetails

        this.execWorldBounds = () => {
            this.destroy()
        }
    }

}

export default Projectile