import Phaser from 'phaser'

class EffectSpritesheet extends Phaser.GameObjects.Sprite {
  constructor({ Scene, x, y, spritesheetKey, scale, flipX }) {
    super(Scene, x, y, spritesheetKey)
    this.setScale(scale)
    this.setFlipX(flipX)
    this.setOrigin(0.5, 1.3)
    this.setDepth(1.5)
    this.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
      this.destroy()
    })
    Scene.add.existing(this)
  }
}

export default EffectSpritesheet
