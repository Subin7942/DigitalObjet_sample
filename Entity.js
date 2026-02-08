class Entity {
  pos;
  vel;
  diameter;

  constructor(x, y, radius) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);

    this.radius = radius;
  }

  show() {
    circle(this.pos.x, this.pos.y, this.radius);
  }

  inside() {
    if (this.pos.x + this.radius > width) {
      this.pos.x -= this.radius;
    }
    if (this.pos.x - this.radius < 0) {
      this.pos.x += this.radius;
    }
    if (this.pos.y + this.radius > height) {
      this.pos.y -= this.radius;
    }
    if (this.pos.y - this.radius < 0) {
      this.pos.y += this.radius;
    }
  }

  move() {
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(mouse, this.pos);
    dir.limit(0.1);
    this.vel.add(dir);
    this.pos.add(this.vel);
  }
}
