import Phaser from "phaser";
import UUIDv4 from "uuid/v4";
import { CST } from "../../CST";

import Hitbox from "../hitbox";

class Character extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y);

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
    this.hitMultiplier = 1;
    this.currentJumps = 0;
    this.facingRight = false;
    this.id = UUIDv4();
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
      CST.SPRITESHEET.CHARACTERS.TEST
    );
  }

  movementManager(direction) {
    switch (direction) {
      case "holding left":
        this.facingRight = false;
        if (this.sprintLeft.value) {
          this.sprite.setMaxVelocity(this.sprintVelocity, 2500);
          this.sprite.setAccelerationX(-this.accelerationX * 1.25);
          this.sprite.anims.play("left", true);
        } else {
          this.sprite.setMaxVelocity(this.normalVelocity, 2500);
          this.sprite.setAccelerationX(-this.accelerationX);
        }
        break;

      case "holding right":
        this.facingRight = true;
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
        }
        break;

      case "pressed right":
        if (this.sprintRight.doubleTap) {
          this.sprintRight.value = true;
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
        }

        break;

      case "pressed up":
        if (this.sprite.data.touchingGround) {
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

  attackManager(attack) {
    let hitbox = null;
    let variable = 0;
    switch (attack) {
      case "neutral fast":
        this.facingRight ? (variable = 50) : (variable = -10);
        hitbox = new Hitbox({
          scene: this.scene,
          x: this.sprite.body.x + variable,
          y: this.sprite.body.y + 10,
        });
        break;

      case "forward fast":
        console.log(attack);
        return;

      default:
        break;
    }

    const players = this.scene.players.getChildren();
    const hitboxBounds = hitbox.getBounds();

    players.forEach((player) => {
      if (player.id === this.id) return;
      const playerBounds = player.sprite.getBounds();
      const output = Phaser.Geom.Rectangle.Overlaps(hitboxBounds, playerBounds);
      if (output === true) {
        player.handleAttack(attack, variable > 0 ? false : true);
      }
    });
  }

  handleAttack(attack, directionIsLeft) {
    this.sprite.setMaxVelocity(9000);
    this.sprite.setDrag(10);
    switch (attack) {
      case "neutral fast":
        if (directionIsLeft) {
          this.sprite.setVelocity(
            -500 * this.hitMultiplier,
            -500 * this.hitMultiplier
          );
        } else {
          this.sprite.setVelocity(
            500 * this.hitMultiplier,
            -500 * this.hitMultiplier
          );
        }
        this.hitMultiplier += 0.1;
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
    this.sprite.body.collideWorldBounds = true;
    this.sprite.setDrag(this.drag, 10);
    this.sprite.body.onWorldBounds = true;
    this.sprite.data = {
      touchingGround: false,
      id: this.id,
    };
  }

  setupAsPlayer() {
    this.sprite.displayHeight = 40;
    this.sprite.displayWidth = 40;
    this.sprite.setGravityY(this.gravity);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.setDrag(this.drag, 0);
    this.sprite.body.onWorldBounds = true;
    this.sprite.data = {
      touchingGround: false,
      player: true,
      id: this.id,
    };
  }
}

export default Character;
