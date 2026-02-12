// 공의 형태를 한 움직이는 개체
let entity;
// 시침 분침 초침
let handS;
let handM;
let handH;
// 충돌 가능성 여부를 알리는 변수
let preCollision;
// 충돌 여부를 알리는 변수
let collision;
// 마우스 위치 벡터
let M;
let rangeM;
// 충돌 판단 시스템
let col;
// 중심
let centerX, centerY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let randomX = random(width);
  let randomY = random(height);
  entity = new Entity(randomX, randomY, 40);
  centerX = windowWidth / 2;
  centerY = windowHeight / 2;
  handS = new Hand(centerX, centerY, 1000);
  handM = new Hand(centerX, centerY, 300);
  handH = new Hand(centerX, centerY, 200);

  col = new CollisionSystem();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouse() {
  M = createVector(mouseX, mouseY);
  rangeM = 100;
  circle(mouseX, mouseY, rangeM);
}

function draw() {

  background(255);
  // translate(windowWidth / 2, windowHeight / 2);
  mouse();

  // let force = createVector(0.02, 0);
  let force = createVector(0, 0);
  entity.inside();
  entity.show();
  entity.applyForce(force);
  entity.move();
  entity.runAway(M, rangeM);

  // 선 그리기 (show가 update 보다 먼저 와야 반응이 제대로 됨)
  let s = second();
  let m = minute();
  let h = hour();
  handS.update(s);
  handS.show();
  handM.show();
  handM.update(m);
  handH.show();
  handH.update(h, 12);

  entity.color = 'white';

  // 초침에 대한 충돌 판단
  preCollision = col.preColJudge(handS);
  if (preCollision) {
    collision = col.colJudge(handS);

    if (collision) {
      entity.color = 'red';
      let dirToEn = p5.Vector.sub(entity.pos, handS.normalUnit);

      dirToEn.setMag(0.001);
      // entity.applyForce(dirToEn);
      entity.vel.add(dirToEn);
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
