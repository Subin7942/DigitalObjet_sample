let entity;
let handS;
let hendM;
let hendH;
let a;

function setup() {
  createCanvas(windowWidth, windowHeight);
  entity = new Entity(width / 2, height / 2, 40);
  handS = new Hand(0, 0, 1000);
  handM = new Hand(0, 0, 300);
  handH = new Hand(0, 0, 200);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  // circle(mouseX, mouseY, 100);

  let M = createVector(mouseX, mouseY);
  let D = dist(entity.pos, M);

  entity.show();
  entity.inside();
  entity.setVel(0.1);
  entity.move();
  entity.avoidMouse(D, 100);

  // 선 그리기
  let s = second();
  let m = minute();
  let h = hour();
  handS.show(s);
  handM.show(m);
  handH.show(h, 12);
}

// 초침 - 개채가 움직이도록 하는 무언가
// 분침, 시침 - 만나면 작아짐
// 개체 시간이 지날 수록 커짐
