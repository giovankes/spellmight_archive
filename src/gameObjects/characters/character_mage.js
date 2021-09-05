import Phaser from "phaser";
import { CST } from "../../CST";
import Character from "./character";

import StaticHitbox from "../attacks-abilities/static";
import Projectile from "../attacks-abilities/projectile";

class MageCharacter extends Character {
  constructor({ Scene, x, y, isPlayer }) {
    // Write attacks here, pass them in to the super()
    const attacks = {
      attackLight: {
        neutral: {
          maxCombo: 3,
          currentCombo: 0,
          exec: (direction) => {
            let x = 0;
            direction ? (x = 13) : (x = -15);
            const hitbox = new StaticHitbox({
              Scene,
              x: this.physicsBody.x + x,
              y: this.physicsBody.y - 5,
              height: 8,
              width: 8,
              depth: 2,
              life: 50,
            }).getBounds();

            return {
              hitbox,
              data: {
                hitMultiplier: 0.1,
                velocityX: 100,
                velocityY: -100,
              },
            };
          },
        },
        forward: {
          maxCombo: 1,
          currentCombo: 0,
          exec: () => {},
        },
        up: {
          maxCombo: 1,
          currentCombo: 0,
          exec: () => {},
        },
        down: {
          maxCombo: 1,
          currentCombo: 0,
          exec: () => {},
        },
      },
      attackHeavy: {
        neutral: {
          maxCombo: 3,
          currentCombo: 0,
          exec: () => {},
        },
        forward: {
          maxCombo: 1,
          currentCombo: 0,
          exec: () => {},
        },
        up: {
          maxCombo: 1,
          currentCombo: 0,
          exec: () => {},
        },
        down: {
          maxCombo: 1,
          currentCombo: 0,
          exec: () => {},
        },
      },
      abilityOne: {
        cooldown: {
          amount: 200,
          canFire: true,
          timer: null,
        },
        exec: (facingRight) => {
          if (!this.CharacterConfig.attacks.abilityOne.cooldown.canFire) {
            console.log("Fireball on cooldown!");
            return;
          }
          this.CharacterConfig.attacks.abilityOne.cooldown.canFire = false;

          new Projectile({
            Scene,
            x: this.physicsBody.x,
            y: this.physicsBody.y - 5,
            textureKey: CST.ABILITIES.MAGE.FIREBALL.TEXTURE_KEY,
            animationKey: CST.ABILITIES.MAGE.FIREBALL.ANIMATION_KEY,
            maxVelocity: {
              x: 600,
              y: 0,
            },
            acceleration: {
              x: 700,
              y: 0,
            },
            scale: 0.4,
            facingRight,
            id: this.id,
            hitDetails: {
              hitMultiplier: 0.3,
              velocityX: 200,
              velocityY: -200,
            },
          });

          this.CharacterConfig.attacks.abilityOne.cooldown.timer =
            Scene.time.delayedCall(
              this.CharacterConfig.attacks.abilityOne.cooldown.amount,
              () => {
                this.CharacterConfig.attacks.abilityOne.cooldown.canFire = true;
              }
            );
        },
      },
      abilityTwo: {
        cooldown: 4000,
        exec: () => {},
      },
      ultimate: {
        cooldown: 4000,
        exec: () => {},
      },
    };

    super({
      // Edittable values
      maxJumps: 2,
      jumpHeight: 400,
      accelerationX: 1500,
      accelerationDown: 3000,
      drag: 1500,
      normalVelocity: 150,
      sprintVelocity: 250,
      collisionBodySize: {
        width: 65,
        height: 127,
        offsetX: 40,
        offsetY: 0,
      },
      scale: 0.25,

      // Do not touch
      Scene: Scene,
      x: x,
      y: y,
      sprite: CST.SPRITESHEET.CHARACTERS.MAGE,
      isPlayer: isPlayer,
      anims: [],
      attacks,
    });
  }
}

export default MageCharacter;
