class Hand {
  // 시작점 x y
  sX;
  sY;
  // 선의 길이
  length;
  // 끝점 x y
  eX;
  eY;
  // 시작점 위치 벡터
  start;
  // 끝점 위치 벡터
  end;
  // 시작점과 끝점이 이어진 선
  Ln;
  // 법선 방향을 가진 벡터
  normalUnit;
  constructor(startX, startY, length) {
    this.sX = startX;
    this.sY = startY;
    this.length = length;
    this.eX = this.sX + this.length;
    this.eY = this.sY;
    this.start = createVector(this.sX, this.sY);
    this.end = createVector(this.eX, this.eY);
    this.Ln = p5.Vector.sub(this.end, this.start);
  }

  // 선을 생성하고 시작점을 중심으로 회전
  show(time, range = 60) {
    push();
    translate(windowWidth / 2, windowHeight / 2);
    let angle = map(time, 0, range, 0, 360);
    rotate(radians(angle - 90));
    line(this.sX, this.sY, this.eX, this.eY);
    pop();
  }

  // 선의 법선(직각 방향) 구하기
  makeAngleDir() {
    normalUnit = this.Ln.get();
    normalUnit.normalize();
    normalUnit.rotate(-PI / 2);
    return normalUnit;
  }
}
