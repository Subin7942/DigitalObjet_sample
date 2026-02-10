let entity;
let handS;
let handM;
let handH;
let hands = [];
let preCollision;
let collision;

function setup() {
  createCanvas(windowWidth, windowHeight);
  entity = new Entity(width / 2, height / 2, 40);
  handS = new Hand(0, 0, 1000);
  handM = new Hand(0, 0, 300);
  handH = new Hand(0, 0, 200);
  hands.push(handS);
  hands.push(handM);
  hands.push(handH);
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
  entity.setVel(0.1);
  entity.move();

  // 선 그리기
  let s = second();
  let m = minute();
  let h = hour();
  handS.show(s);
  handM.show(m);
  handH.show(h, 12);

  preColJudge();
  colJudge();
  run();
}

// 개체와 선이 만날 가능성 여부
function preColJudge() {
  // 개체와 선의 시작점 거리
  let distEL = p5.Vector.sub(entity.pos, hands[0].start);
  let distECenterAndL = abs(distEL.dot(hands[0].normalUnit));
  if (distECenterAndL <= entity.radius * 2) {
    return true;
  } else {
    return false;
  }
}

// 개체와 선이 만났는지 여부
function colJudge() {
  let a = hands[0].Ln.magSq();
  let cs = p5.Vector.sub(hands[0].start, entity.pos);
  let b = hands[0].Ln.x * cs.x + hands[0].Ln.y + cs.y;
  let c = cs.magSq() - entity.radius * entity.radius;
  let t1 = (-b + sqrt(b * b - a * c)) / a;
  let t2 = (-b - sqrt(b * b - a * c)) / a;

  if ((t1 >= 0 && t1 <= 1) || (t2 >= 0 && t2 <= 1)) {
    return true;
  } else {
    return false;
  }
}

function run() {
  // 충돌 가능성 여부를 변수에 담기
  preCollision = preColJudge();

  // 충돌 가능성이 있으면 충돌 여부 계산해서 변수에 담기
  if (preCollision) {
    collision = colJudge();
  }

  // 충돌하면 나오는 결과
  if (collision) {
    entity.vel.x *= -entity.restitution;
    entity.vel.y *= -entity.restitution;
  }
}

// 초침 - 개채가 움직이도록 하는 무언가
// 분침, 시침 - 만나면 작아짐
// 개체 시간이 지날 수록 커짐
