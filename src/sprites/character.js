import Phaser from "phaser";

class Character extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, "character");
    this.maxJumps = 2;
    this.jumpHeight = 750;
    this.accelerationX = 2500;
    this.accelerationX = 2500;
    this.accelerationDown = 5000;
    this.drag = 2500;
    this.normalVelocity = 300;
    this.sprintVelocity = 550;
    this.gravity = 2200;
    this.touchingGround = false;
    this.currentJumps = 0;
    this.sprintLeft = {
      value: false,
      doubleTap: false,
      timeOut: null,
    };
    this.sprintRight = {
      value: false,
      doubleTap: false,
      timeOut: null,
    };

    this.sprite = config.scene.physics.add.sprite(
      config.x,
      config.y,
      "character"
    );
    this.sprite.displayHeight = 40;
    this.sprite.displayWidth = 40;
    this.sprite.setGravityY(this.gravity);
    this.sprite.setMaxVelocity(this.normalVelocity, 2500);
    this.sprite.setDrag(this.drag, 0);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.onWorldBounds = true;
  }

  jump() {}

  movementManager(direction) {
    switch (direction) {
      case "holding left":
        if (this.sprintLeft.value) {
          this.sprite.setMaxVelocity(this.sprintVelocity, 2500);
          this.sprite.setAccelerationX(-this.accelerationX * 1.25);
        } else {
          this.sprite.setMaxVelocity(this.normalVelocity, 2500);
          this.sprite.setAccelerationX(-this.accelerationX);
        }
        break;

      case "holding right":
        if (this.sprintRight.value) {
          this.sprite.setMaxVelocity(this.sprintVelocity, 2500);
          this.sprite.setAccelerationX(this.accelerationX * 1.25);
        } else {
          this.sprite.setMaxVelocity(this.normalVelocity, 2500);
          this.sprite.setAccelerationX(this.accelerationX);
        }
        break;

      default:
        break;
    }

    switch (direction) {
      case "pressed down":
        this.sprite.setAccelerationY(this.accelerationDown);
        break;

      case "pressed left":
        if (this.sprintLeft.doubleTap) {
          this.sprintLeft.value = true;
          this.sprite.setTintFill("0x6505ff");
          return;
        }

        this.sprintLeft.doubleTap = true;
        this.sprintLeft.timeOut = setTimeout(() => {
          this.sprintLeft.doubleTap = false;
        }, 200);
        break;

      case "unpressed left":
        if (this.sprintLeft.value) {
          this.sprintLeft.value = false;
          this.sprite.setTintFill("0x5a92bf");
        }
        break;

      case "pressed right":
        if (this.sprintRight.doubleTap) {
          this.sprintRight.value = true;
          this.sprite.setTintFill("0x6505ff");
          return;
        }

        this.sprintRight.doubleTap = true;
        this.sprintRight.timeOut = setTimeout(() => {
          this.sprintRight.doubleTap = false;
        }, 200);
        break;

      case "unpressed right":
        if (this.sprintRight.value) {
          this.sprintRight.value = false;
          this.sprite.setTintFill("0x5a92bf");
        }
        break;

      case "pressed up":
        if (this.touchingGround) {
          this.currentJumps = 1;
        } else if (this.currentJumps < this.maxJumps) {
          this.currentJumps += 1;
        } else {
          return;
        }

        this.sprite.setVelocityY(-this.jumpHeight);
        break;

      default:
        break;
    }
  }
}

export default Character;
