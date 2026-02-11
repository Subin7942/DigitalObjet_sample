// 공의 형태를 한 움직이는 개체
let entity;
// 시침 분침 초침
let handS;
let handM;
let handH;
// let hands = [];
// 충돌 가능성 여부를 알리는 변수
let preCollision;
// 충돌 여부를 알리는 변수
let collision;

function setup() {
  createCanvas(windowWidth, windowHeight);
  entity = new Entity(width / 2, height / 2, 40);
  handS = new Hand(0, 0, 1000);
  handM = new Hand(0, 0, 300);
  handH = new Hand(0, 0, 200);
  // hands.push(handS);
  // hands.push(handM);
  // hands.push(handH);
  // col = new CollisionJudge();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  // circle(mouseX, mouseY, 100);

  // col.EHrun();

  entity.show();
  entity.inside();
  entity.applyForce(0.02);
  entity.move();
  let M = createVector(mouseX, mouseY);
  // entity.runAway(M);

  // 선 그리기
  let s = second();
  let m = minute();
  let h = hour();
  handS.show(s);
  handM.show(m);
  handH.show(h, 12);

  preColJudge();
  colJudge();
  collisionSystem();
}

// 개체와 선이 만날 가능성(충돌 가능성) 여부
function preColJudge() {
  // 개체와 선의 시작점 방향
  let dirEnCenterLnStart = p5.Vector.sub(entity.pos, handS.start);

  // 개체와 선의 시작점을 이은 방향를 선의 법선에 투영해서 개체와 선의 직선 거리(제일 가까운 거리) 알아냄
  let dirEnCenterAndLn = abs(dirEnCenterLnStart.dot(handS.normalUnit));

  // 개체와 선의 거리가 개체의 지름 보다 작으면 충돌 가능성 있음
  if (dirEnCenterAndLn <= entity.radius * 2) {
    return true;
  } else {
    return false;
  }
}

// 개체와 선이 만났는지(충돌) 여부
function colJudge() {
  // 선 벡터(초침) 제곱
  let a = handS.Ln.magSq();

  // 개체에서 선으로 향하는 방향
  let dirLnStartEnCenter = p5.Vector.sub(handS.start, entity.pos);

  // 선 벡터와 방향을 x y 끼리 곱해준 값 (선 벡터와 개체 중심의 위치 관계)
  let b = handS.Ln.x * dirLnStartEnCenter.x + handS.Ln.y * dirLnStartEnCenter.y;

  // 이 위치 관계를 제곱하고 개체의 반지름을 제곱한 값을 빼줌
  let c = dirLnStartEnCenter.magSq() - entity.radius * entity.radius;

  // 이차방정식 계산을 통해 선과 개체가 닿은 정도 알아내기 (개체가 원의 형태를 하고 있어 선이 닿는 지점이 2개 이니, 이차방정식 사용)
  let t1 = (-b + sqrt(b * b - a * c)) / a;
  let t2 = (-b - sqrt(b * b - a * c)) / a;

  if ((t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1)) {
    return true;
  } else {
    return false;
  }
}

// 개체와 선이 부딫히게 만드는 시스템
function collisionSystem() {
  // 충돌 가능성 여부를 변수에 담기
  preCollision = preColJudge();

  // 충돌 가능성 여부가 true면 충돌 여부 계산해서 변수에 담기
  if (preCollision) {
    collision = colJudge();

    // 충돌하면 나오는 결과
    if (collision) {
      entity.vel.x *= -entity.restitution;
      entity.vel.y *= -entity.restitution;
    }
  }
}

// 초침 - 개채가 움직이도록 하는 무언가
// 분침, 시침 - 만나면 작아짐
// 개체 시간이 지날 수록 커짐
