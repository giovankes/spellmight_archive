import Phaser from 'phaser'
import { CST } from '../CST'

import TimerText from '../gameObjects/text/ingame_timer'

class HUD extends Phaser.Scene {
  constructor(config) {
    super({
      key: CST.SCENES.INTERFACE,
      sceneConfig: {},
      autoStart: true,
    })

    this.InterfaceConfig = config
  }

  create() {
    // Add UI
    this.UI = this.add.group(null, {
      name: 'UI Elements',
    })

    this.timer = this.add.text(480 / 2, 20, '00:00').setOrigin(0.5)
    this.elapsedTime = [0, 0]
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        if (this.elapsedTime[1] >= 59) {
          this.elapsedTime[1] = 0
          this.elapsedTime[0] += 1
        } else {
          this.elapsedTime[1] += 1
        }
        const minutes =
          this.elapsedTime[0] < 10
            ? '0' + this.elapsedTime[0]
            : this.elapsedTime[0]
        const seconds =
          this.elapsedTime[1] < 10
            ? '0' + this.elapsedTime[1]
            : this.elapsedTime[1]
        this.timer.setText(`${minutes}:${seconds}`)
      },
      callbackScope: this,
    })

    this.playerPercents = this.add.group([
      this.add.text(30, 240, '0%'),
      this.add.text(430, 240, '0%'),
    ])
  }

  updatePlayerPercent(playerIndex, hitMultiplier) {
    const textToUpdate = this.playerPercents.getChildren()[playerIndex]
    if (!textToUpdate) return

    textToUpdate.setText(Math.round((hitMultiplier - 1) * 100) + '%')
  }

  pause() {
    // this.timerEvent.destroy()
    this.timerEvent.paused = true

    this.pausedText = this.add.text(480 / 2, 60, 'PAUSED').setOrigin(0.5)
  }

  resume() {
    this.timerEvent.paused = false
    // this.timerEvent = this.time.addEvent({
    //     delay: 1000,
    //     loop: true,
    //     callback: () => {
    //         if (this.elapsedTime[1] >= 59) {
    //             this.elapsedTime[1] = 0
    //             this.elapsedTime[0] += 1
    //         } else {
    //             this.elapsedTime[1] += 1
    //         }
    //         const minutes = this.elapsedTime[0] < 10 ? '0' + this.elapsedTime[0] : this.elapsedTime[0]
    //         const seconds = this.elapsedTime[1] < 10 ? '0' + this.elapsedTime[1] : this.elapsedTime[1]
    //         this.timer.setText(`${minutes}:${seconds}`)
    //     },
    //     callbackScope: this
    // })

    if (this.pausedText) this.pausedText.destroy()
  }
}

export default HUD
