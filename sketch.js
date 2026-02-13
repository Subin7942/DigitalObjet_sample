
// 공의 형태를 한 움직이는 개체
let entity;
// 시침 분침 초침
let handS;
let handM;
let handH;

// 마우스 위치 벡터
let M;
let radiusM;

// 화면의 중심
let centerX, centerY;

// 배경 색상 관련 변수
let randomHue, randomColor;

// 튕김 쿨다운
let lastBounceMs = -9999;
let bounceCooldownMs = 70; // 50~120 추천

// 속도 제한/최소 속도
let maxSpeed = 12;
let minSpeedAfterBounce = 1.2;

function setup() {
  createCanvas(windowWidth, windowHeight);

  colorMode(HSB, 360, 100, 100);
  stroke('white');
  randomHue = random(360);

  let randomX = random(width);
  let randomY = random(height);

  entity = new Entity(randomX, randomY, 40);

  // restitution은 1 이하 권장 (1 넘기면 충돌할수록 가속됨)
  entity.restitution = 0.9;

  centerX = windowWidth / 2;
  centerY = windowHeight / 2;

  handS = new Hand(centerX, centerY, width * 3);
  handM = new Hand(centerX, centerY, width / 4);
  handH = new Hand(centerX, centerY, width / 6);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centerX = windowWidth / 2;
  centerY = windowHeight / 2;

  handS = new Hand(centerX, centerY, width * 3);
  handM = new Hand(centerX, centerY, width / 4);
  handH = new Hand(centerX, centerY, width / 6);
}

function drawMouseRing() {
  M = createVector(mouseX, mouseY);
  radiusM = 50;
  noFill();
  circle(mouseX, mouseY, radiusM * 2);
}

function timeIndex() {
  push();
  translate(width / 2, height / 2);
  for (let n = 0; n < 12; n++) {
    push();
    rotate(radians(n * 30));
    line(170, 0, 200, 0);
    pop();
  }
  for (let n = 0; n < 60; n++) {
    push();
    rotate(radians(n * 6));
    line(170, 0, 180, 0);
    pop();
  }
  pop();
}

// 점 P에서 선분 AB까지의 가장 가까운 점 + 거리
function closestPointOnSegment(P, A, B) {
  let AB = p5.Vector.sub(B, A);
  let AP = p5.Vector.sub(P, A);

  let ab2 = AB.magSq();
  if (ab2 === 0) {
    return { point: A.copy(), t: 0, dist: p5.Vector.dist(P, A) };
  }

  let t = AP.dot(AB) / ab2;
  t = constrain(t, 0, 1);

  let closest = p5.Vector.add(A, p5.Vector.mult(AB, t));
  let dist = p5.Vector.dist(P, closest);

  return { point: closest, t, dist };
}

// 거울 반사: v' = v - 2*(v·n)*n
function reflectVelocity(v, nUnit) {
  let vel = v.copy();
  let n = nUnit.copy();
  if (n.magSq() === 0) n = createVector(1, 0);
  n.normalize();

  // 법선이 속도와 같은 방향이면 뒤집어서 "안쪽으로" 튕기지 않게
  if (vel.dot(n) > 0) n.mult(-1);

  let dot = vel.dot(n);
  vel.sub(p5.Vector.mult(n, 2 * dot));
  return vel;
}

function draw() {
  randomColor = color(randomHue, 70, 70);
  background(randomColor);

  drawMouseRing();
  timeIndex();

  // ————— 엔티티 업데이트 —————
  entity.inside();
  entity.move();

  // 마우스 인터랙션은 항상 적용
  entity.runAway(M, radiusM);

  // 너무 빨라지지 않게 항상 제한
  entity.vel.limit(maxSpeed);

  // ---------- 바늘 업데이트 ----------
  let s = second();
  let m = minute();
  let h = hour();

  handS.rotation(s);
  handM.rotation(m);
  handH.rotation(h, 12);

  // ---------- 그리기 ----------
  handS.show();
  handM.show();
  handH.show();

  entity.color = 'white';
  entity.show();

  // ===========================
  // ✅ 초침 충돌 (안정 버전)
  // ===========================
  let A = handS.start.copy();
  let B = handS.end.copy();
  let P = entity.pos.copy();

  let hit = closestPointOnSegment(P, A, B);
  let isCollide = hit.dist <= entity.radius;

  let now = millis();
  if (isCollide && now - lastBounceMs > bounceCooldownMs) {
    lastBounceMs = now;

    entity.color = 'red';
    randomHue = random(360);

    // 1) 충돌 법선(closest -> entity)
    let n = p5.Vector.sub(entity.pos, hit.point);
    if (n.magSq() === 0) n = handS.normalUnit.copy();
    n.normalize();

    // 2) 겹침 해소: 선 밖으로 확실히 밀기(+1px 여유)
    let push = entity.radius - hit.dist + 1.0;
    entity.pos.add(p5.Vector.mult(n, push));

    // 3) 반사: "현재 속도"로 반사 (preEnVel 쓰면 0일 때 멈출 수 있음)
    let reflected = reflectVelocity(entity.vel, n);

    // 4) restitution (절대 1 초과 금지)
    let r = min(entity.restitution, 1.0);
    reflected.mult(r);

    // 5) 멈춤 방지: 너무 느리면 최소 속도 부여
    if (reflected.mag() < minSpeedAfterBounce) {
      reflected.setMag(minSpeedAfterBounce);
    }

    // 6) 최종 적용 + 상한
    reflected.limit(maxSpeed);
    entity.vel = reflected;
  }
}
