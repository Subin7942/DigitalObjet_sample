// 공의 형태를 한 움직이는 개체
let entity;
// 시침 분침 초침
let handS;
let handM;
let handH;
// 충돌 가능성 여부를 알리는 변수
let preCollision = false;
// 충돌 여부를 알리는 변수
let collision = false;
// 마우스 위치 벡터
let M;
let radiusM;
// 충돌 판단 시스템
let col;
// 화면의 중심
let centerX, centerY;
// 배경 색상 관련 변수
let randomHue, randomColor;
let colorChangeNum = 0;

let dir;

function setup() {
  createCanvas(windowWidth, windowHeight);

  colorMode(HSB, 360, 100, 100);
  stroke('white');
  randomHue = random(360);

  let randomX = random(width);
  let randomY = random(height);

  entity = new Entity(randomX, randomY, 40);
  centerX = windowWidth / 2;
  centerY = windowHeight / 2;

  handS = new Hand(centerX, centerY, width * 3);
  handM = new Hand(centerX, centerY, width / 4);
  handH = new Hand(centerX, centerY, width / 6);

  col = new CollisionSystem();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centerX = windowWidth / 2;
  centerY = windowHeight / 2;

  handS = new Hand(centerX, centerY, width * 3);
  handM = new Hand(centerX, centerY, width / 4);
  handH = new Hand(centerX, centerY, width / 6);
}

function mouse() {
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

function draw() {
  randomColor = color(randomHue, 70, 70);
  background(randomColor);
  mouse();
  timeIndex();

  let preEnPos = entity.pos.copy();
  let preEnVel = entity.vel.copy();

  // let force = createVector(0.02, 0);
  let force = createVector(0, 0);
  entity.inside();
  entity.show();
  entity.applyForce(force);
  entity.move();
  entity.runAway(M, radiusM);

  // 선 그리기 (show가 rotation 보다 먼저 와야 반응이 제대로 됨)
  let s = second();
  let m = minute();
  let h = hour();
  handS.show();
  handS.rotation(s);
  handM.show();
  handM.rotation(m);
  handH.show();
  handH.rotation(h, 12);

  entity.color = 'white';

  // 초침에 대한 충돌 판단
  // 충돌 가능성이 있으며 충돌 되었다고 판단 되면 작동
  preCollision = col.preColJudge(handS);
  if (preCollision) {
    collision = col.colJudge(handS);

    // 충돌 한 이후 벌어지는 일
    if (collision) {
      // 개체 색 변경
      entity.color = 'red';
      // 배경 색 변경
      colorChangeNum++;
      if (colorChangeNum === 1) {
        randomHue = random(360);
      }
      // 위치 재조정 되고 튕겨나감
      // entity.pos = col.rePosition(handS, preEnPos);
      // entity.vel = col.reVelocity(handS);

      // let reVel = col.reVelocity2(handS);
      // entity.vel = reVel;
      // preEnPos = entity.pos.copy();
      // preEnVel = entity.vel.copy();

      // entity = new Entity(preEnPos.x, preEnPos.y, 40);
      // entity.vel = preEnVel.copy();
      // entity.vel.mult(0.02);
    } else {
      colorChangeNum = 0;
    }
  }
}

// 부딫힘 실패 1 : 항상 오른쪽 아래 구석에 박힘, 박히고 나면 상호작용 불가
// if (collision) {
//       entity.color = 'red';

//       let dirToEn = p5.Vector.sub(entity.pos, handS.normalUnit);

//       dirToEn.setMag(0.001);
//       entity.applyForce(dirToEn);
//       // entity.vel.add(dirToEn);
//     }

// 부딫힘 실패 2 : 색만 바뀌고 튕겨나가질 않음
//  if (collision) {
//       entity.color = 'red';
//       let distToEn = p5.Vector.dist(entity.pos, handS.normalUnit);
//       let dirToEn = p5.Vector.sub(entity.pos, handS.normalUnit);
//       if(distToEn < entity.radius * 2){
//         dirToEn.setMag(0.001);
//         entity.applyForce(dirToEn);
//         // entity.vel.add(dirToEn);
//       }
//     }
