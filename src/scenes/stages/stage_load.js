import Phaser from 'phaser'
import { CST } from '../../CST'

// Character Elements
import DudeSpr from '../../assets/images/dude.png'
import MageSpr from '../../assets/images/characters/mage_temp.png'

// Stage Elements
import BlockImg from '../../assets/images/block.png'
import StageOneBackground from '../../assets/images/temp_stage_bg.jpg'
import FieldBG from '../../assets/stages/THE_FIELD/BG/BG.png'
import FieldFG from '../../assets/stages/THE_FIELD/FG/FG_GRASS.png'
import FieldCollGrass from '../../assets/stages/THE_FIELD/COLL/COLL_GRASS.png'
import FieldCollPlane from '../../assets/stages/THE_FIELD/COLL/COLL_PLANE.png'

// UI Elements
import TimerUI from '../../assets/images/ui/timer.png'
import CharacterInfoUI from '../../assets/images/ui/character-info.png'

class StageLoad extends Phaser.Scene {
    constructor() {
        super({ key: CST.SCENES.STAGES.LOAD })
        this.data = {}
    }

    init(data) {
        this.data = data
    }

    preload() {
        // Load selected stage assets
        if (this.data.stage === 1) {
            this.load.image(
                CST.IMAGE.STAGES.TEST.BACKGROUND,
                StageOneBackground
            )
            this.load.image(CST.IMAGE.STAGES.TEST.FLOOR, BlockImg)
        } else if (this.data.stage === 2) {
            this.load.image(CST.IMAGE.STAGES.FIELD.BG, FieldBG)
            this.load.image(CST.IMAGE.STAGES.FIELD.FG, FieldFG)
            this.load.image(CST.IMAGE.STAGES.FIELD.COLL_GRASS, FieldCollGrass)
            this.load.image(CST.IMAGE.STAGES.FIELD.COLL_PLANE, FieldCollPlane)
            this.load.spritesheet(CST.SPRITESHEET.CHARACTERS.TEST, DudeSpr, {
                frameWidth: 32,
                frameHeight: 48
            })
        }

        // Load selected character assets
        switch (this.data.character) {
            case 1:
                this.load.spritesheet(CST.SPRITESHEET.CHARACTERS.TEST, DudeSpr, {
                    frameWidth: 32,
                    frameHeight: 48
                })
                break;
                
            case 2:
                this.load.image(CST.SPRITESHEET.CHARACTERS.MAGE, MageSpr)
                break

            default:
                break;
        }

        // Load UI
        this.load.image(CST.IMAGE.UI.INGAME.CHARACTER_INFO, CharacterInfoUI)
        this.load.image(CST.IMAGE.UI.INGAME.TIMER, TimerUI)
    }

    create() {
        if (this.data.stage === 1) {
            this.scene.start(CST.SCENES.STAGES.TEST)
        } else if (this.data.stage === 2) {
            this.scene.start(CST.SCENES.STAGES.FIELD)
        }
        this.scene.start(CST.SCENES.INTERFACE)
    }
}

export default StageLoad
