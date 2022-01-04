import Phaser from 'phaser'
import { uuid as v4 } from 'uuidv4'
import { CST } from '../../CST'
import PlayerController, { PLAYERS } from '../../playerControllers'
import io from 'socket.io-client'
import ButtonOptions from '../../gameObjects/menu/options'
import UserForm from '../../assets/text/username.html'
import MenuRectangle from '../../gameObjects/menu/menu-rectangle'
import consola from 'consola'
import InputTextPlugin from 'phaser3-rex-plugins/plugins/inputtext-plugin.js'
class MenuLogin extends Phaser.Scene {
  constructor() {
    super({
      key: CST.SCENES.MENU.MULTIPLAYER_LOGIN,
      data: {},
    })
  }
  preload() {
    this.load.text('user', UserForm)
  }
  create() {
    var printText = this.add
      .text(400, 200, '', {
        fontSize: '12px',
        fixedWidth: 100,
        fixedHeight: 100,
      })
      .setOrigin(0.5)
    var inputText = this.add
      .rexInputText(400, 400, 10, 10, {
        type: 'textarea',
        text: 'hello world',
        fontSize: '12px',
      })
      .resize(100, 100)
      .setOrigin(0.5)
      .on('textchange', function (inputText) {
        console.log(inputText)
      })
      .on('focus', function (inputText) {
        console.log('On focus')
      })
      .on('blur', function (inputText) {
        console.log('On blur')
      })
      .on('click', function (inputText) {
        console.log('On click')
      })
      .on('dblclick', function (inputText) {
        console.log('On dblclick')
      })

    printText.text = inputText.text
  }
}

export default MenuLogin
