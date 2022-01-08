import { CST } from '../../CST'
import Stage from './stage'

class StageStonehenge extends Stage {
  constructor() {
    super({
      KEY: CST.SCENES.STAGES.STONEHENGE,
      BackgroundElements: [
        {
          IMG: CST.IMAGE.STAGES.STONEHENGE.BG1,
        },
        {
          IMG: CST.IMAGE.STAGES.STONEHENGE.BG2,
        },
        {
          IMG: CST.IMAGE.STAGES.STONEHENGE.BG3,
        },
      ],
      MiddlegroundElements: [
        {
          IMG: CST.IMAGE.STAGES.STONEHENGE.FG,
        },
      ],
      Particles: [
        {
          IMG: CST.IMAGE.STAGES.STONEHENGE.RAIN,
          CONFIG: {
            x: { min: 0, max: 480 },
            y: 0,
            lifespan: 1000,
            speedY: { min: 200, max: 300 },
            speedX: { min: 0, max: -40 },
            scale: { start: 0.3, end: 0 },
            quantity: 4,
            blendMode: 'ADD',
            alpha: 0.2,
          },
        },
      ],
      ForegroundElements: [],
      CollisionAreas: [
        {
          x: 480 / 2,
          y: 235,
          width: 480 + 200,
          height: 70,
        },
        {
          x: 480 / 2 - 5,
          y: 130,
          width: 160,
          height: 23,
        },
      ],
      Players: [
        {
          character: 1,
        },
      ],
      CPUs: [
        {
          character: 1,
        },
      ],
    })
  }
}

export default StageStonehenge
