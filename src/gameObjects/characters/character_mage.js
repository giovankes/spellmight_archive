import { CST } from '../../CST'
import Character from './character'

class MageCharacter extends Character {
    constructor(config) {
        // Write attacks here, pass them in to the super()
        const attacks = {
            attackLight: {
                neutral: {
                    maxCombo: 3,
                    currentCombo: 0,
                    exec: () => {

                    }
                },
                forward: {
                    maxCombo: 1,
                    currentCombo: 0,
                    exec: () => {

                    }
                },
                up: {
                    maxCombo: 1,
                    currentCombo: 0,
                    exec: () => {

                    }
                },
                down: {
                    maxCombo: 1,
                    currentCombo: 0,
                    exec: () => {

                    }
                }
            },
            attackHeavy: {
                neutral: {
                    maxCombo: 3,
                    currentCombo: 0,
                    exec: () => {

                    }
                },
                forward: {
                    maxCombo: 1,
                    currentCombo: 0,
                    exec: () => {

                    }
                },
                up: {
                    maxCombo: 1,
                    currentCombo: 0,
                    exec: () => {

                    }
                },
                down: {
                    maxCombo: 1,
                    currentCombo: 0,
                    exec: () => {

                    }
                }
            },
            abilityOne: {
                cooldown: 4000,
                exec: () => {

                }
            },
            abilityTwo: {
                cooldown: 4000,
                exec: () => {

                }
            },
            ultimate: {
                cooldown: 4000,
                exec: () => {

                }
            }
        }

        super({
            // Edittable values
            maxJumps: 2,
            jumpHeight: 400,
            accelerationX: 1500,
            accelerationDown: 3000,
            drag: 1500,
            normalVelocity: 150,
            sprintVelocity: 250,
            collisionBodySize: {
                width: 65,
                height: 127,
                offsetX: 40,
                offsetY: 0
            },
            scale: 0.25,

            // Do not touch
            Scene: config.Scene,
            x: config.x,
            y: config.y,
            sprite: CST.SPRITESHEET.CHARACTERS.MAGE,
            isPlayer: config.isPlayer,
            anims: [
                {  
                    key:'fireball',
                    frames: {
                        key: CST.ABILITIES.MAGE.FIREBALL,
                        frames:{
                            key: CST.SPRITESHEET.CHARACTERS.MAGE,
                            startEnd: {start:1, end:32}
                        },
                        frameRate: 10,
                        repeat:-1
                    }
                }
            ],
            attacks
        })
    }
}

export default MageCharacter