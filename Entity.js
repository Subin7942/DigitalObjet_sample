
class Entity {
  pos;
  vel;
  radius;

  // 튕김 계수
  restitution = 0.4;

  color = 'white';

  constructor(x, y, radius) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.radius = radius;
  }

  // 형태 그리기
  show() {
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.radius * 2);
  }

  // 벽 충돌
  inside() {
    if (this.pos.x + this.radius > width || this.pos.x - this.radius < 0) {
      this.pos.x = constrain(this.pos.x, this.radius, width - this.radius);
      this.vel.x *= -this.restitution;
    }

    if (this.pos.y + this.radius > height || this.pos.y - this.radius < 0) {
      this.pos.y = constrain(this.pos.y, this.radius, height - this.radius);
      this.vel.y *= -this.restitution;
    }
  }

  // ❌ 가속 완전 제거 → 속도로만 이동
  move() {
    this.pos.add(this.vel);
  }

  // 마우스에서 밀려나는 힘 (속도 직접 조정)
  runAway(posVector, range) {
    if (!posVector) return;

    let d = p5.Vector.dist(this.pos, posVector);
    if (d > this.radius + range) return;

    let dir = p5.Vector.sub(this.pos, posVector);
    if (dir.magSq() === 0) dir = createVector(random(-1, 1), random(-1, 1));
    dir.normalize();

    // 가까울수록 강하게 (부드럽게)
    let strength = map(d, this.radius + range, this.radius, 0.2, 1.2, true);
    dir.mult(strength);

    this.vel.add(dir);

    // ✅ 마우스 힘 때문에 폭주 방지
    this.vel.limit(12);
  }
}
