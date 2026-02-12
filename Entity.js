class Entity {
  pos;
  vel;
  acc;
  radius;
  dir;
  // 무언가에 부딫혔을 때 튕기는 값(충돌 계수)
  restitution = 0.4;

  color = 'white';

  constructor(x, y, radius) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.radius = radius;
  }

  // 형태 그리기
  show() {
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.radius * 2);
  }

  // 개체가 벽에 부딫히면 속력이 반대로 작용하며 줄어듦
  inside() {
    if (this.pos.x + this.radius > width || this.pos.x - this.radius < 0) {
      // 위치를 화면 내에 있도록 제한
      this.pos.x = constrain(this.pos.x, this.radius, width - this.radius);
      // 속력에 충돌 계수를 반대로 곱해서 그 값만큼 반대 방향으로 튕기게
      this.vel.x *= -this.restitution;
    }

    if (this.pos.y + this.radius > height || this.pos.y - this.radius < 0) {
      this.pos.y = constrain(this.pos.y, this.radius, height - this.radius);
      this.vel.y *= -this.restitution;
    }
  }

  // n만큼 속력의 크기를 조정
  applyForce(force) {
    this.acc.add(force);
  }

  // 속력 만큼 위치에 값을 더해서 움직이게 만듦
  move() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  // 마우스에 닿지 않게 해서 밀기
runAway(posVector, range) {
    let d = p5.Vector.dist(this.pos, posVector);
    let dir = p5.Vector.sub(this.pos, posVector);
    if (d <= range) {
      d = constrain(d, 0, range);
      dir.setMag(0.5);
      // this.applyForce(dir);
      this.vel.add(dir);
    }
  }
}
