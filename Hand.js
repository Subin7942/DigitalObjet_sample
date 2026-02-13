
class Hand {
  // 선의 길이
  length;

  // 시작점(원래 중심)
  start;

  // 충돌 판정용 시작점(중심에서 살짝 떨어진 점)
  colStart;

  // 끝점
  end;

  // (충돌 판정용) 선 벡터
  Ln;

  // 법선 단위 벡터
  normalUnit;

  // 중심에서 이만큼은 충돌 무시(피벗 구멍)
  innerOffset;

  constructor(startX, startY, length, innerOffset = 60) {
    this.length = length;
    this.innerOffset = innerOffset;

    this.start = createVector(startX, startY);
    this.colStart = createVector(startX, startY);
    this.end = createVector(startX + this.length, startY);

    // 초기 Ln/normal
    this.Ln = p5.Vector.sub(this.end, this.colStart);
    this.normalUnit = this.makeNormalUnit(this.Ln);
  }

  // 선 벡터 회전
  rotation(time, range = 60) {
    let angle = map(time, 0, range, 0, TWO_PI);

    // 방향(단위벡터)
    let dirUnit = p5.Vector.fromAngle(angle - HALF_PI, 1);

    // ✅ 충돌 판정 시작점: 중심에서 innerOffset만큼 떨어진 곳
    this.colStart = p5.Vector.add(
      this.start,
      p5.Vector.mult(dirUnit, this.innerOffset),
    );

    // 끝점은 길이만큼
    this.end = p5.Vector.add(this.start, p5.Vector.mult(dirUnit, this.length));

    // 충돌 판정용 선벡터는 colStart -> end
    this.Ln = p5.Vector.sub(this.end, this.colStart);
    this.normalUnit = this.makeNormalUnit(this.Ln);
  }

  show() {
    // 화면에 보이는 초침도 colStart부터 그리면 자연스러움
    line(this.colStart.x, this.colStart.y, this.end.x, this.end.y);
  }

  // 법선(직각 방향) 구하기
  makeNormalUnit(lineVector) {
    let copyLine = lineVector.copy();
    copyLine.normalize();
    copyLine.rotate(-PI / 2);
    return copyLine;
  }
}
