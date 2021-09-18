import { CST } from '../../../CST'
import Character from './character'

class CharacterDebug extends Character {
  constructor(config) {
    super({
      // Edittable values
      maxJumps: 2,
      jumpHeight: 1000,
      accelerationX: 2500,
      accelerationDown: 5000,
      drag: 2500,
      normalVelocity: 300,
      sprintVelocity: 550,
      collisionBodySize: {
        width: 32,
        height: 48,
        offsetX: 0,
        offsetY: 0,
      },
      scale: 2.5,

      // Do not touch
      Scene: config.Scene,
      x: config.x,
      y: config.y,
      sprite: CST.SPRITESHEET.CHARACTERS.TEST,
      isPlayer: config.isPlayer,
      anims: [
        {
          key: 'left',
          frames: {
            key: CST.SPRITESHEET.CHARACTERS.TEST,
            startEnd: { start: 0, end: 3 },
          },
          frameRate: 10,
          repeat: -1,
        },
        {
          key: 'turn',
          frames: {
            key: CST.SPRITESHEET.CHARACTERS.TEST,
            startEnd: { start: 4, end: 4 },
          },
          frameRate: 20,
          repeat: 0,
        },
        {
          key: 'right',
          frames: {
            key: CST.SPRITESHEET.CHARACTERS.TEST,
            startEnd: { start: 5, end: 8 },
          },
          frameRate: 10,
          repeat: -1,
        },
      ],
    })
  }
}

export default CharacterDebug
