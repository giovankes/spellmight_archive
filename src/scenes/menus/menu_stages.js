import Phaser from 'phaser'
import { CST } from '../../CST'

import MenuRectangle from '../../gameObjects/menu/menu-rectangle'
import PlayerController, { PLAYERS } from '../../playerControllers'

class MenuStages extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.MENU.STAGES })
  }

  init(data) {
    this.characters = data
  }

  create() {
    this.menuRectangle = new MenuRectangle({
      Scene: this,
      currentMenuText: 'Stage Select',
      previous: CST.SCENES.MENU.CHARACTER,
    })
    class Stage extends Phaser.GameObjects.Rectangle {
      constructor({ scene, x, y, imageKey, stageKey, index }) {
        super(scene, x, y, 60, 40, 0xffffff)

        this.hovered = false
        this.scene = scene
        this.index = index
        this.stageKey = stageKey
        if (!stageKey) this.setFillStyle(0x4a4d4f, 1)
        scene.add.existing(this)
      }

      setHovered(boolean) {
        if (boolean) {
          this.hovered = true
          this.setStrokeStyle(2, 0xff0000)
        } else {
          this.hovered = false
          this.setStrokeStyle(0, 0xff0000)
        }
      }
      select() {
        if (!this.stageKey) return
        this.scene.changeScene(CST.SCENES.STAGES.LOAD, {
          characters: this.scene.characters,
          stage: this.index,
        })
      }
    }

    this.stages = this.add.group([
      new Stage({
        scene: this,
        x: 80,
        y: 185,
        stageKey: CST.SCENES.STAGES.FIELD,
        index: 0,
      }),
      new Stage({
        scene: this,
        x: 160,
        y: 185,
        stageKey: CST.SCENES.STAGES.FIELD,
        index: 1,
      }),
      new Stage({
        scene: this,
        x: 240,
        y: 185,
        index: 2,
      }),
      new Stage({
        scene: this,
        x: 320,
        y: 185,
        index: 3,
      }),
      new Stage({
        scene: this,
        x: 400,
        y: 185,
        index: 4,
      }),
      new Stage({
        scene: this,
        x: 120,
        y: 235,
        index: 5,
      }),
      new Stage({
        scene: this,
        x: 200,
        y: 235,
        index: 6,
      }),
      new Stage({
        scene: this,
        x: 280,
        y: 235,
        index: 7,
      }),
      new Stage({
        scene: this,
        x: 360,
        y: 235,
        index: 8,
      }),
    ])

    this.stages.getChildren()[0].setHovered(true)
    this.scene.get(CST.SCENES.INPUT).getCurrentScene(CST.SCENES.MENU.STAGES)
  }

  changeScene(to, config) {
    this.scene.start(to, config || null)
    this.scene.get(CST.SCENES.INPUT).getCurrentScene(null)
  }

  getControls(key, playerIndex, status) {
    if (playerIndex !== 0) return
    if (status === 'down') {
      let currentHoveredIndex = -1
      this.stages.getChildren().forEach((stage) => {
        if (stage.hovered) currentHoveredIndex = stage.index
        stage.setHovered(false)
      })
      switch (key) {
        case 'LEFT':
          if (currentHoveredIndex === 0) {
            this.stages.getChildren()[1].setHovered(true)
          } else {
            this.stages.getChildren()[currentHoveredIndex - 1].setHovered(true)
          }
          break
        case 'RIGHT':
          if (currentHoveredIndex === 1) {
            this.stages.getChildren()[0].setHovered(true)
          } else {
            this.stages.getChildren()[currentHoveredIndex + 1].setHovered(true)
          }
          break
        case 'A':
          this.stages.getChildren()[currentHoveredIndex].select()
      }
    }
  }
}

export default MenuStages
