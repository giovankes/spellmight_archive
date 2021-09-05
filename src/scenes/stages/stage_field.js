import { CST } from '../../CST'
import Stage from './stage'

class StageField extends Stage {
  constructor() {
    super({
      KEY: CST.SCENES.STAGES.FIELD,
      BackgroundElements: [
        {
          IMG: CST.IMAGE.STAGES.FIELD.BG,
        },
      ],
      MiddlegroundElements: [
        {
          IMG: CST.IMAGE.STAGES.FIELD.COLL_GRASS,
        },
        {
          IMG: CST.IMAGE.STAGES.FIELD.COLL_PLANE,
        },
      ],
      ForegroundElements: [
        {
          IMG: CST.IMAGE.STAGES.FIELD.FG,
        },
      ],
      CollisionAreas: [
        {
          x: 480 / 2,
          y: 245,
          width: 480,
          height: 40,
        },
        {
          x: 209,
          y: 164,
          width: 152.5,
          height: 12.5,
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
export default StageField
