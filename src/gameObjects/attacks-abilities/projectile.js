import Phaser from 'phaser'
import CST from '../../CST'

class Projectile extends Phaser.GameObjects.Sprite {
    constructor({ Scene, x, y, textureKey, animationKey, scale, life, velocityX, velocityY, facingRight, gravity, depth }) {
        super(Scene, x, y, textureKey)

        this.setScale(scale)
        if (animationKey) {
            this.play(animationKey)
            // this.anims.play(animationKey, 0)
        }
        Scene.add.existing(this)
        Scene.physics.world.enableBody(this)
        if (facingRight) this.setFlipX(true)
        console.log(this.scale)
        this.body.velocity.x = facingRight ? velocityX : -velocityX,
        this.body.velocity.y = velocityY,
        Scene.projectiles.add(this)

        if (life) {
            this.destroyTimer = Scene.time.delayedCall(
                life,
                () => {
                    this.destroy()
                }
            )
        }
    }
}

export default Projectile