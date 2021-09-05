import { CST } from '../../CST'
import Stage from './stage'

class StageField extends Stage {
    constructor() {
        super({
            KEY: CST.SCENES.STAGES.FIELD,
            BackgroundElements: [
                {
                    IMG: CST.IMAGE.STAGES.FIELD.BG
                }
            ],
            MiddlegroundElements: [
                {
                    IMG: CST.IMAGE.STAGES.FIELD.COLL_GRASS,
                },
                {
                    IMG: CST.IMAGE.STAGES.FIELD.COLL_PLANE
                }
            ],
            ForegroundElements: [
                {
                    IMG: CST.IMAGE.STAGES.FIELD.FG
                }
            ],
            CollisionAreas: [
                {
                    x: 1920/2,
                    y: 980,
                    width: 1920,
                    height: 160
                },
                {
                    x: 835,
                    y: 655,
                    width: 610,
                    height: 50
                }
            ],
            Players: [
                {
                    character: 1
                }
            ],
            CPUs: [
                {
                    character: 1
                }
            ]
        })
    }
}
export default StageField