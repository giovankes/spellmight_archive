import Phaser from 'phaser'

import LOADER from './scenes/menus/LOADER.js'
import MenuEntry from './scenes/menus/menu_entry.js'
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
    width: 480,
    height: 270,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        LOADER,
        MenuEntry,
        MenuMain,
        MenuCharacter,
        MenuStages,
        StageLoad,
        StageTest,
        StageField,
        HUD
    ],
    pixelArt: true,
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
