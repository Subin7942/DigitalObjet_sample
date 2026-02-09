class Entity {
  pos;
  vel;
  radius;
  wallRestitution = 0.6;

  constructor(x, y, radius) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.radius = radius;
  }

  // 형태 그리기
  show() {
    circle(this.pos.x, this.pos.y, this.radius * 2);
  }

  // 공이 벽에 부딫히면 속력이 반대로 작용
  inside() {
    if (this.pos.x + this.radius > width || this.pos.x - this.radius < 0) {
      this.pos.x = constrain(this.pos.x, this.radius, width - this.radius);
      this.vel.x *= -this.wallRestitution;
    }

    if (this.pos.y + this.radius > height || this.pos.y - this.radius < 0) {
      this.pos.y = constrain(this.pos.y, this.radius, height - this.radius);
      this.vel.y *= -this.wallRestitution;
    }
  }

  // n만큼 속력 주기
  setVel(n) {
    this.vel.add(n);
  }

  // 속력 만큼 위치 값을 더해서 움직이게 만듦
  move() {
    this.pos.add(this.vel);
  }

  // 마우스에 닿지 않게 해서 밀기
  avoidMouse(dist, range) {
    // let M = createVector(mouseX, mouseY);
    // let D = dist(this, M);
    // let range = 100;
    if (dist < range) {
      this.this.vel.mult(this.wallRestitution);
    }
  }
  // runAway(a) {
  //   let d = p5.Vector.dist(this.pos, a);
  //   if (d < 100) {
  //     let dir = p5.Vector.sub(a, this.pos);
  //     this.vel.add(dir);
  //     this.vel.mult(0.9);
  //     this.pos.add(this.vel);
  //   }
  // }
}
