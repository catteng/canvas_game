const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 1; //加速度

class Player {
  constructor() {
    this.position = {
      //起始位址
      x: 100,
      y: 100,
    };
    this.velocity = {
      //速度 用velocity往下推製造類似gravity功能
      x: 0,
      y: 0,
    };
    this.width = 30;
    this.height = 30;
  }
  draw() {
    c.fillStyle = "orange";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } //用往下推的velocity+加速度使重力感更自然
    else this.velocity.y = 0;
  }
}

class Platform {
  constructor() {
    this.position = {
      x: 200,
      y: 300,
    };
    this.width = 200;
    this.height = 20;
  }
  draw() {
    c.fillStyle='#e3735e'
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const player = new Player();
const platform = new Platform();

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height); //把軌跡擦掉
  player.update();
  platform.draw();

  if (keys.right.pressed) {
    player.velocity.x = 5;
  } else if (keys.left.pressed) {
    player.velocity.x = -5;
  } else player.velocity.x = 0;
}
animate();

addEventListener("keydown", ({ keyCode }) => {
  //   console.log("keyCode=", keyCode);
  switch (keyCode) {
    //w87 a65 s83 d68
    case 65:
      //   console.log("left");
      player.velocity.x -= 1;
      keys.left.pressed = true;
      break;
    case 68:
      //   console.log("right");
      player.velocity.x += 1;
      keys.right.pressed = true;
      break;
    case 87:
      //   console.log("up");
      player.velocity.y -= 1;
      break;
    case 83:
      //   console.log("down");
      break;
  }
});

addEventListener("keyup", ({ keyCode }) => {
  //   console.log("keyCode=", keyCode);
  switch (keyCode) {
    //w87 a65 s83 d68
    case 65:
      //   console.log("left");
      player.velocity.x = 0;
      keys.left.pressed = false;
      break;
    case 68:
      //   console.log("right");
      player.velocity.x = 0;
      keys.right.pressed = false;
      break;
    case 87:
      //   console.log("up");
      player.velocity.y -= 20;
      break;
    case 83:
      //   console.log("down");
      break;
  }
});
