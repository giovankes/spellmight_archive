import Phaser, { Tilemaps } from "phaser";
import { CST } from "../CST";

import Character from "../sprites/character";

class PhaserDefaultScene extends Phaser.Scene {
  constructor() {
    super({
      key: "TEST",
    });
  }

  preload() {}

  create() {
    const background = this.add.image(0, 0, "stage1-bg").setOrigin(0);
    background.displayWidth = 1000;
    background.displayHeight = 1000;
    this.physics.world.setBounds(0, 0, 1000, 1000);
    const groundX = 500;
    const groundY = this.sys.game.config.height * 0.8;
    this.ground = this.physics.add.sprite(groundX, groundY, "ground");
    this.ground.displayWidth = this.sys.game.config.width * 0.6;
    this.ground.displayHeight = 50;
    this.ground.setTintFill("0x4a4039");

    this.CharacterClass = new Character({
      scene: this,
      x: this.sys.game.config.width / 1.5,
      y: 150,
    });
    this.CharacterClass.sprite.setTintFill("0x5a92bf");

    this.cameras.main.startFollow(this.CharacterClass.sprite);
    this.physics.add.collider(
      this.CharacterClass.sprite,
      this.ground,
      this.touchingGround,
      null,
      this
    );
    this.ground.setImmovable();
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    this.physics.world.on("worldbounds", (body) => {
      this.resetPlayer(body.gameObject);
    });
  }

  touchingGround(object1, object2) {
    if (object1.body.touching.down && object2.body.touching.up) {
      this.CharacterClass.touchingGround = false;
      this.CharacterClass.currentJumps = 0;
    }
  }

  resetPlayer(character) {
    character.setX(this.sys.game.config.width / 2);
    character.setY(150);
  }

  update() {
    this.CharacterClass.sprite.setAccelerationX(0);
    this.CharacterClass.sprite.setAccelerationY(0);

    if (this.cursors.left.isDown) {
      this.CharacterClass.movementManager("holding left");
    }

    if (this.cursors.right.isDown) {
      this.CharacterClass.movementManager("holding right");
    }

    if (this.cursors.down.isDown) {
      this.CharacterClass.movementManager("pressed down");
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
      this.CharacterClass.movementManager("pressed left");
    }
    if (Phaser.Input.Keyboard.JustUp(this.cursors.left)) {
      this.CharacterClass.movementManager("unpressed left");
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
      this.CharacterClass.movementManager("pressed right");
    }
    if (Phaser.Input.Keyboard.JustUp(this.cursors.right)) {
      this.CharacterClass.movementManager("unpressed right");
    }

    if (Phaser.Input.Keyboard.JustDown(this.esc)) {
      this.scene.start(CST.SCENES.MENU);
    }

    if (
      Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
      Phaser.Input.Keyboard.JustDown(this.spacebar)
    ) {
      this.CharacterClass.movementManager("pressed up");
    }

    this.CharacterClass.touchingGround = false;
  }
}

export default PhaserDefaultScene;
