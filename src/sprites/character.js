import Phaser from "phaser";

class Character extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, "character");

    // Editable values
    this.maxJumps = 2; // How many jumps the character can do before having to touch the ground
    this.jumpHeight = 750; // Height of each jump
    this.accelerationX = 2500; // How fast the character can start walking and change directions
    this.accelerationX = 2500; // How fast the character can start walking and change directions
    this.accelerationDown = 5000; // How fast the character goes down when pressing the down key
    this.drag = 2500; // How fast the character can stop moving left or right
    this.normalVelocity = 300; // The maximum speed while walking
    this.sprintVelocity = 550; // The maximum speed while sprinting
    this.gravity = 2200; // How heavy the character is

    // Non-editable values
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
    this.sprite.setTintFill(config.color || 0xff0000);
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

    const sprintTimeoutTime = 300;
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
        }, sprintTimeoutTime);
        break;

      case "unpressed left":
        if (this.sprintLeft.value) {
          this.sprintLeft.doubleTap = true;
          this.sprintLeft.timeOut = setTimeout(() => {
            this.sprintLeft.doubleTap = false;
          }, sprintTimeoutTime);

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
        }, sprintTimeoutTime);
        break;

      case "unpressed right":
        if (this.sprintRight.value) {
          this.sprintRight.doubleTap = true;
          this.sprintRight.timeOut = setTimeout(() => {
            this.sprintRight.doubleTap = false;
          }, sprintTimeoutTime);

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

  setup() {
    this.sprite.displayHeight = 40;
    this.sprite.displayWidth = 40;
    this.sprite.setGravityY(this.gravity);
    this.sprite.setMaxVelocity(this.normalVelocity, 2500);
    this.sprite.setDrag(this.drag, 0);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.onWorldBounds = true;
  }

  setupAsPlayer() {
    this.sprite.displayHeight = 40;
    this.sprite.displayWidth = 40;
    this.sprite.setGravityY(this.gravity);
    this.sprite.setMaxVelocity(this.normalVelocity, 2500);
    this.sprite.setDrag(this.drag, 0);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.onWorldBounds = true;
    this.sprite.data = {
      player: true,
    };
  }
}

export default Character;
