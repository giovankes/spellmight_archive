import Phaser from 'phaser'

class EffectParticles extends Phaser.GameObjects.Particles
  .ParticleEmitterManager {
  constructor({ Scene, textureKey, entries }) {
    super(Scene, textureKey, null, entries)

    Scene.add.existing(this)
  }
}

export default EffectParticles
