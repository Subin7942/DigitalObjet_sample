class Hand {
  // 시작 점 x y
  sX;
  sY;
  // 선의 길이
  length;
  // 끝 점 x y
  eX;
  eY;
  // 시작 점 위치 벡터
  start;
  // 끝 점 위치 벡터
  end;
  // 선의 방향
  dirL;
  constructor(startX, startY, length) {
    this.sX = startX;
    this.sY = startY;
    this.length = length;
    this.eX = this.sX + this.length;
    this.eY = this.sY;
    this.start = createVector(this.sX, this.sY);
    this.end = createVector(this.eX, this.eY);
    this.dirL = p5.Vector.sub(this.end, this.start);
  }

  // 선을 생성하고 시작 점을 중심으로 회전
  show(time, range = 60) {
    push();
    translate(windowWidth / 2, windowHeight / 2);
    let angle = map(time, 0, range, 0, 360);
    rotate(radians(angle - 90));
    line(this.sX, this.sY, this.sX + this.length, this.sY);
    pop();
  }

  // 선의 직각 방향 구하기
  makeAngleDir() {
    let rightDirL = this.dirL.get();
    rightDirL.normalize();
    rightDirL.rotate(-PI / 2);
    return rightDirL;
  }
}
