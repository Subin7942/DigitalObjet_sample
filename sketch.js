let entity;

function setup() {
  createCanvas(windowWidth, windowHeight);
  entity = new Entity(500, 10, 80);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  // circle(mouseX, mouseY, 100);

  // 돌아가는 선
  push();
  let s = second();
  let sL = windowWidth;
  translate(windowWidth / 2, windowHeight / 2);
  rotate(radians(s));
  line(0, 0, sL, 0);
  pop();

  entity.show();
  entity.inside();
  entity.move();
}

// 초침 - 개채가 움직이도록 하는 무언가
// 분침, 시침 - 만나면 작아짐
// 개체 시간이 지날 수록 커짐
