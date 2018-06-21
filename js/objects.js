class Entity {
  constructor() {
    this.sprite = 'images/';
    this.x = 2;
    this.y = 5;
  }
  // update(){
  //
  // }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
  }

  // checkCollision() {
  //
  // }
};

class Player extends Entity {
  constructor() {
    super();
    this.sprite += 'char-cat-girl.png';
    // handleInput();
    // checkWin();
  }
}

class Enemy extends Entity {
  constructor(x,y) {
    super();
    this.sprite += 'enemy-bug.png';
    this.x = x;
    this.y = y;
    // changePace();
  }
}
