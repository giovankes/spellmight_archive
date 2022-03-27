import Phaser from 'phaser'
import { CST } from '../../CST'

import MenuRectangle from '../../gameObjects/menu/menu-rectangle'
import PlayerController, { PLAYERS } from '../../playerControllers'

class MenuCharacter extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.MENU.CHARACTER })
  }

  init(data) {
    if (data.currentMenuText) {
      this.currentMenuText = data.currentMenuText
    }
  }

  create() {
    this.menuRectangle = new MenuRectangle({
      Scene: this,
      currentMenuText: this.currentMenuText || 'Character Select',
    })

    const playerOutlineWidth = 80
    const playerOutlineHeight = 140

    class CharacterSelectPortrait extends Phaser.GameObjects.Container {
      constructor({ x, y, scene, characterID, imageKey, parent }) {
        super(scene, x, y)

        this.scene = scene
        this.ID = characterID
        this.border = new Phaser.GameObjects.Rectangle(
          scene,
          0,
          0,
          30,
          30,
          0x00000,
          0
        )
          .setStrokeStyle(2, 0xffffff, 1)
          .setVisible(false)

        this.add([
          new Phaser.GameObjects.Image(scene, 0, 0, imageKey).setDisplaySize(
            30,
            30
          ),
          this.border,
        ])
      }

      setHovered(boolean) {
        this.border.setVisible(boolean)
      }
    }
    class CharacterSelectContainer extends Phaser.GameObjects.Container {
      constructor({ x, y, scene, index }) {
        super(scene, x, y)

        this.characterSelected = 0
        this.type = null
        this.selectedCharacter = null
        this.scene = scene
        this.index = index

        const characterPortraitOne = new CharacterSelectPortrait({
          x: 20,
          y: 50,
          scene,
          parent: this,
          characterID: 1,
          imageKey: CST.IMAGE.CHARACTER.MAGE.PORTRAIT,
        })
        const characterPotraitTwo = new CharacterSelectPortrait({
          x: 60,
          y: 50,
          scene,
          parent: this,
          characterID: 2,
          imageKey: CST.IMAGE.CHARACTER.WITCH.PORTRAIT,
        })
        const characterPortraitThree = new CharacterSelectPortrait({
          x: 20,
          y: 85,
          scene,
          parent: this,
          characterID: 3,
          imageKey: CST.IMAGE.CHARACTER.BUTCHER.PORTRAIT,
        })
        const characterPortraitFour = new CharacterSelectPortrait({
          x: 60,
          y: 85,
          scene,
          parent: this,
          characterID: 4,
          imageKey: CST.IMAGE.CHARACTER.ORO.PORTRAIT,
        })
        const randomCharacter = new CharacterSelectPortrait({
          x: 20,
          y: 120,
          scene,
          parent: this,
          characterID: 'RANDOM',
          imageKey: CST.IMAGE.MENU.DICE,
        })
        this.characterPortraits = new Phaser.GameObjects.Group(scene, [
          characterPortraitOne,
          characterPotraitTwo,
          characterPortraitThree,
          characterPortraitFour,
          randomCharacter,
        ])
        this.title = new Phaser.GameObjects.Text(scene, 30, 0, 'INACTIVE', {
          fontSize: 16,
          fontFamily: 'Superscript',
          color: '#FFFFFF',
          resolution: 6,
        })
        this.add([
          this.title,
          new Phaser.GameObjects.Rectangle(
            scene,
            0,
            30,
            playerOutlineWidth,
            playerOutlineHeight,
            0
          )
            .setStrokeStyle(4, 0xffffff)
            .setOrigin(0),
          characterPortraitOne,
          characterPotraitTwo,
          characterPortraitThree,
          characterPortraitFour,
          randomCharacter,
        ])

        scene.add.existing(this)
      }

      setHovered(boolean, characterID) {
        const portraits = this.characterPortraits.getChildren()
        portraits.forEach((portrait) => {
          if (!boolean) portrait.setHovered(false)
          if (characterID === portrait.ID) {
            portrait.setHovered(true)
          } else {
            portrait.setHovered(false)
          }
        })
      }

      setSelected(boolean, characterID) {
        if (!boolean) {
          if (
            this.selectedCharacter &&
            this.selectedBackText &&
            this.selectedNameText
          ) {
            this.selectedCharacter.destroy()
            this.selectedBackText.destroy()
            this.selectedNameText.destroy()
          }
          this.characterPortraits.getChildren().forEach((characterPortrait) => {
            characterPortrait.setVisible(true)
          })
          this.characterSelected = 0
        } else {
          let parsedCharacterID
          if (characterID === 'RANDOM') {
            parsedCharacterID = Math.floor(Math.random() * 3 + 1)
          } else parsedCharacterID = characterID

          this.characterPortraits.getChildren().forEach((characterPortrait) => {
            characterPortrait.setVisible(false)
          })
          let characterTexture
          let scale
          let title
          switch (parsedCharacterID) {
            case 1:
              characterTexture = CST.SPRITESHEET.CHARACTERS.MAGE.IMG
              scale = 2
              title = 'Mage'
              break
            case 2:
              characterTexture = CST.SPRITESHEET.CHARACTERS.WITCH.SPR
              scale = 1.6
              title = 'Witch'
              break
            case 3:
              characterTexture = CST.SPRITESHEET.CHARACTERS.BUTCHER.SPR
              scale = 1.4
              title = 'Butcher'
              break
            case 4:
              characterTexture = CST.SPRITESHEET.CHARACTERS.ORO.IMG
              scale = 0.1
              title = 'undefined'
            default:
              break
          }

          this.selectedCharacter = new Phaser.GameObjects.Image(
            this.scene,
            45,
            100,
            characterTexture
          ).setScale(scale)
          this.selectedBackText = new Phaser.GameObjects.Text(
            this.scene,
            35,
            35,
            'BACK',
            {
              fontFamily: 'Adventurer',
              color: '#FFFFFF',
            }
          )
          this.selectedNameText = new Phaser.GameObjects.Text(
            this.scene,
            40,
            145,
            title,
            {
              fontFamily: 'Superscript',
              color: '#FFFFFF',
            }
          ).setOrigin(0.5, 0)
          this.add([
            this.selectedCharacter,
            this.selectedBackText,
            this.selectedNameText,
          ])
          this.characterSelected = parsedCharacterID
        }
      }

      setStatus(type) {
        switch (type) {
          case 'player':
            this.title.setText(`P (${this.index + 1})`)
            this.title.setTint(0xffffff)
            this.title.setX(22)
            this.setSelected(false)
            this.characterPortraits
              .getChildren()
              .forEach((characterPortrait) => {
                characterPortrait.setVisible(true)
              })
            this.type = 'player'
            break

          case 'cpu':
            this.title.setText(`CPU (${this.index + 1})`)
            this.title.setX(15)
            this.title.setTint(0x5848ea)
            this.setSelected(false)
            this.characterPortraits
              .getChildren()
              .forEach((characterPortrait) => {
                characterPortrait.setVisible(true)
              })
            this.type = 'cpu'
            break
          case 'inactive':
            this.title.setText('INACTIVE')
            this.title.setTint(0x990000)
            this.title.setX(5)
            this.setSelected(false)
            this.characterPortraits
              .getChildren()
              .forEach((characterPortrait) => {
                characterPortrait.setVisible(false)
              })
            this.type = 'inactive'
            break
        }
      }
    }
    this.CustomPointerClass = class CustomPointer extends (
      Phaser.GameObjects.Container
    ) {
      constructor({ scene, playerIndex }) {
        let x = 80
        let y = 100
        let spriteKey = CST.IMAGE.MENU.P1_CURSOR
        switch (playerIndex) {
          case 0:
            x = 80
            y = 100
            spriteKey = CST.IMAGE.MENU.P1_CURSOR
            break
          case 1:
            x = 170
            y = 100
            spriteKey = CST.IMAGE.MENU.P2_CURSOR
            break
          case 2:
            x = 40
            y = scene.game.renderer.height - 40
            spriteKey = CST.IMAGE.MENU.P3_CURSOR
            break
          case 3:
            x = scene.game.renderer.width - 40
            y = scene.game.renderer.height - 40
            spriteKey = CST.IMAGE.MENU.P4_CURSOR
            break
          default:
            break
        }

        super(scene, x, y, [
          new Phaser.GameObjects.Sprite(scene, 0, 0, spriteKey).setOrigin(0, 0),
        ])

        scene.physics.add.existing(this, false)
        this.body.setCollideWorldBounds(true)
        this.body.setOffset(0, 0)
        this.body.setSize(1, 1)

        this.setDepth(2)

        scene.add.existing(this)
      }
    }

    const playerOne = new CharacterSelectContainer({
      x: 60,
      y: 50,
      scene: this,
      index: 0,
    })

    const playerTwo = new CharacterSelectContainer({
      x: 150,
      y: 50,
      scene: this,
      index: 1,
    })

    const playerThree = new CharacterSelectContainer({
      x: 240,
      y: 50,
      scene: this,
      index: 2,
    })

    const playerFour = new CharacterSelectContainer({
      x: 330,
      y: 50,
      scene: this,
      index: 3,
    })

    this.players = this.add.group([
      playerOne,
      playerTwo,
      playerThree,
      playerFour,
    ])

    this.players.getChildren()[0].setStatus('player')
    this.players.getChildren()[1].setStatus('cpu')
    this.players.getChildren()[2].setStatus('inactive')
    this.players.getChildren()[3].setStatus('inactive')

    this.playerPointers = []

    PLAYERS.forEach((player, index) => {
      this.players.getChildren()[index].setStatus('player')
      this.playerPointers.push(
        new this.CustomPointerClass({
          scene: this,
          playerIndex: index,
        })
      )
    })

    // Add player controller
    this.PlayerController = new PlayerController({
      Scene: this,
    })

    if (PLAYERS.length) {
      this.PlayerController.updatePlayers()
    }

    this.bottomTitle = this.add
      .text(
        this.game.renderer.width / 2,
        this.game.renderer.height - 25,
        'READY?',
        {
          fontSize: 20,
          fontFamily: 'Superscript',
          color: '#FFFFFF',
          resolution: 4,
        }
      )
      .setOrigin(0.5)
    this.scene.get(CST.SCENES.INPUT).getCurrentScene(CST.SCENES.MENU.CHARACTER)
  }

  changeScene(to, config) {
    this.scene.start(to, config || null)
    this.scene.get(CST.SCENES.INPUT).getCurrentScene(null)
  }

  getControls(key, playerIndex, status) {
    const playerOne = this.players.getChildren()[0]
    const playerTwo = this.players.getChildren()[1]
    const playerThree = this.players.getChildren()[2]
    const playerFour = this.players.getChildren()[3]
    if (this.players.getChildren()[playerIndex].type !== 'player') {
      this.players.getChildren()[playerIndex].setStatus('player')
      this.playerPointers.push(
        new this.CustomPointerClass({
          scene: this,
          playerIndex: playerIndex,
        })
      )
    }

    if (key === 'B' || key === 'ESC') {
      this.changeScene(CST.SCENES.MENU.MAIN)
    }
    if (status === 'down') {
      switch (key) {
        case 'LEFT':
          this.playerPointers[playerIndex].body.setVelocityX(-200)
          break
        case 'RIGHT':
          this.playerPointers[playerIndex].body.setVelocityX(200)
          break
        case 'UP':
          this.playerPointers[playerIndex].body.setVelocityY(-200)
          break
        case 'DOWN':
          this.playerPointers[playerIndex].body.setVelocityY(200)
          break
        case 'A':
          const pointerCenter = this.playerPointers[playerIndex].body.center
          this.players.getChildren().forEach((player) => {
            if (player.type === 'player') {
              if (player.index === playerIndex) {
                // Back text
                if (player.selectedBackText) {
                  const selectedBackTextBounds =
                    player.selectedBackText.getBounds()
                  if (
                    Phaser.Geom.Rectangle.ContainsPoint(
                      selectedBackTextBounds,
                      pointerCenter
                    )
                  ) {
                    player.setSelected(false)
                    return
                  }
                }

                // Character Portrait
                player.characterPortraits.getChildren().forEach((portrait) => {
                  if (portrait.visible) {
                    const portraitBounds = portrait.border.getBounds()
                    if (
                      Phaser.Geom.Rectangle.ContainsPoint(
                        portraitBounds,
                        pointerCenter
                      )
                    ) {
                      player.setSelected(true, portrait.ID)
                      return
                    }
                  }
                })
              }
            } else if (player.type === 'cpu') {
              // Back text
              if (player.selectedBackText) {
                const selectedBackTextBounds =
                  player.selectedBackText.getBounds()
                if (
                  Phaser.Geom.Rectangle.ContainsPoint(
                    selectedBackTextBounds,
                    pointerCenter
                  )
                ) {
                  player.setSelected(false)
                  return
                }
              }

              // Character Portrait
              player.characterPortraits.getChildren().forEach((portrait) => {
                if (portrait.visible) {
                  const portraitBounds = portrait.border.getBounds()
                  if (
                    Phaser.Geom.Rectangle.ContainsPoint(
                      portraitBounds,
                      pointerCenter
                    )
                  ) {
                    player.setSelected(true, portrait.ID)
                    return
                  }
                }
              })
            }
          })
          if (this.bottomTitle.visible) {
            const startTitleBounds = this.bottomTitle.getBounds()
            if (
              Phaser.Geom.Rectangle.ContainsPoint(
                startTitleBounds,
                pointerCenter
              )
            ) {
              const characters = []
              this.players.getChildren().forEach((character) => {
                if (character.type !== 'inactive') {
                  characters.push({
                    type: character.type,
                    character: character.characterSelected,
                  })
                }
              })
              this.changeScene(CST.SCENES.MENU.STAGES, characters)
            }
          }
          break
        case 'ENTER/START':
          if (this.bottomTitle.visible) {
            const characters = []
            this.players.getChildren().forEach((character) => {
              if (character.type !== 'inactive') {
                characters.push({
                  type: character.type,
                  character: character.characterSelected,
                })
              }
            })
            this.changeScene(CST.SCENES.MENU.STAGES, characters)
          }
      }
    }
    if (status === 'up') {
      switch (key) {
        case 'LEFT':
          if (this.playerPointers[playerIndex].body.velocity.x > 0) return
          this.playerPointers[playerIndex].body.setVelocityX(0)
          break
        case 'RIGHT':
          if (this.playerPointers[playerIndex].body.velocity.x < 0) return
          this.playerPointers[playerIndex].body.setVelocityX(0)
          break
        case 'UP':
          if (this.playerPointers[playerIndex].body.velocity.y > 0) return
          this.playerPointers[playerIndex].body.setVelocityY(0)
          break
        case 'DOWN':
          if (this.playerPointers[playerIndex].body.velocity.y < 0) return
          this.playerPointers[playerIndex].body.setVelocityY(0)
          break
      }
    }
  }

  update() {
    const players = this.players.getChildren()
    let playersReady = true
    let playerAmount = 0

    const pointerCenter = []
    this.playerPointers.forEach((pointer) => {
      pointerCenter.push(pointer.body.center)
    })
    players.forEach((player) => {
      if (player.type === 'cpu' || player.type === 'player') {
        playerAmount += 1
        if (player.characterSelected === 0) {
          playersReady = false
        }
      }

      if (player.type === 'player') {
        player.characterPortraits.getChildren().forEach((portrait) => {
          const portraitBounds = portrait.border.getBounds()
          if (!pointerCenter[player.index] || !portraitBounds) return
          if (
            Phaser.Geom.Rectangle.ContainsPoint(
              portraitBounds,
              pointerCenter[player.index]
            )
          ) {
            portrait.setHovered(true)
          } else {
            portrait.setHovered(false)
          }
        })
      } else if (player.type === 'cpu') {
        pointerCenter.forEach((center) => {
          player.characterPortraits.getChildren().forEach((portrait) => {
            const portraitBounds = portrait.border.getBounds()
            if (!portraitBounds) return
            if (Phaser.Geom.Rectangle.ContainsPoint(portraitBounds, center)) {
              portrait.setHovered(true)
            } else {
              portrait.setHovered(false)
            }
          })
        })
      }
    })
    if (playersReady && playerAmount > 1) this.bottomTitle.setVisible(true)
    else this.bottomTitle.setVisible(false)
  }
}

export default MenuCharacter
