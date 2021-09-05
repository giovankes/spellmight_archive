import Phaser from 'phaser'

import MenuLoad from './scenes/menus/menu_load.js'
import MenuMain from './scenes/menus/menu_main.js'
import MenuCharacter from './scenes/menus/menu_character.js'
import MenuStages from './scenes/menus/menu_stages.js'
import StageLoad from './scenes/stages/stage_load.js'
import StageTest from './scenes/stages/stage_test.js'
import StageField from './scenes/stages/stage_field.js'
import HUD from './scenes/ingame_interface'

const config = {
    // type: Phaser.AUTO,
    // parent: 'phaser-example',
    width: 960,
    height: 540,
    scene: [
        MenuLoad,
        MenuMain,
        MenuCharacter,
        MenuStages,
        StageLoad,
        StageTest,
        StageField,
        HUD
    ],
    pixelArt: false,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
}

const game = new Phaser.Game(config)

function preload() {
    console.log('test')
}
