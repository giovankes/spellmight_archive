import Phaser from 'phaser'
import { CST } from '../../CST'

import EffectSpritesheet from '../../gameObjects/misc/effect-spritesheet'
import EffectParticles from '../../gameObjects/misc/effect-particles'

class Projectile extends Phaser.GameObjects.Container {
  constructor({
    Scene,
    x,
    y,
    textureKey,
    animationKey,
    scale,
    life,
    maxVelocity,
    acceleration,
    facingRight,
    gravity,
    depth,
    id,
    hitDetails,
    bodySize,
    spriteOffset,
    particles,
  }) {
    super(Scene, x, y)

    this.scene = Scene

    this.sprite = new Phaser.GameObjects.Sprite(
      Scene,
      0,
      0,
      textureKey
    ).setDepth(2)

    if (animationKey) {
      this.sprite.play(animationKey)
    }

    this.add(this.sprite)
    Scene.add.existing(this)
    Scene.add.existing(this.sprite)

    Scene.physics.add.existing(this, false)
    this.body.collideWorldBounds = true
    this.body.onWorldBounds = true
    this.body.onOverlap = true
    if (bodySize) this.body.setSize(bodySize.width, bodySize.height)
    if (spriteOffset)
      this.sprite.setDisplayOrigin(spriteOffset.x, spriteOffset.y)
    if (facingRight) this.sprite.setFlipX(true)
    this.body.setMaxVelocity(maxVelocity.x, maxVelocity.y)
    this.body.setAcceleration(
      facingRight ? acceleration.x : -acceleration.x,
      acceleration.y
    )
    this.setDepth(depth || 2)
    this.setScale(scale)
    if (gravity) this.body.setGravityY(gravity)
    if (particles) {
      this.add(
        new EffectParticles({
          Scene,
          textureKey: particles.key,
          entries: particles.entries,
        })
      )
    }
    Scene.projectiles.add(this)

    if (life) {
      this.destroyTimer = Scene.time.delayedCall(life, () => {
        this.destroy()
      })
    }

    this.ownerID = id
    this.hitDetails = hitDetails

    this.execWorldBounds = () => {
      this.destroy()
    }
  }

  explode() {
    switch (this.hitDetails.name) {
      case 'mage-fireball':
        new EffectSpritesheet({
          Scene: this.scene,
          x: this.body.center.x,
          y: this.body.center.y + 20,
          spritesheetKey:
            CST.SPRITESHEET.CHARACTERS.MAGE.ABILITIES.FIREBALL.EXPLOSION.IMG,
        }).play(
          CST.SPRITESHEET.CHARACTERS.MAGE.ABILITIES.FIREBALL.EXPLOSION.ANIM
        )
        break

      default:
        break
    }
  }
}

export default Projectile
