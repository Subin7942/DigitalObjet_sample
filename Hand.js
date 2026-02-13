class Hand {
  // 선의 길이
  length;
  // 시작점 위치 벡터
  start;
  // 끝점 위치 벡터
  end;

  // 시작점과 끝점이 이어진 선의 방향
  Ln;
  // 법선(선의 수직 방향을 보여주는 선) 방향을 가진 벡터
  normalUnit;

  handDir;

  constructor(startX, startY, length) {
    this.length = length;

    this.start = createVector(startX, startY);
    this.end = createVector(startX + this.length, startY);
    this.Ln = p5.Vector.sub(this.end, this.start);

    this.normalUnit = this.makeNormalUnit(this.Ln);
  }
  
// 선 벡터를 회전시키기
  rotation(time, range = 60) {
    let angle = map(time, 0, range, 0, TWO_PI);
    let dir = p5.Vector.fromAngle(angle - HALF_PI, this.length);
    // let preDir = dir.copy();
    
    this.end = p5.Vector.add(this.start, dir);
    this.Ln = p5.Vector.sub(this.end, this.start);
    this.normalUnit = this.makeNormalUnit(this.Ln);
  }

  show() {
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  // 선의 법선(직각 방향) 구하기
  makeNormalUnit(lineVector) {
    // 선의 방향 복제
    let copyLine = lineVector.copy();
    // 크기 1로 바꾸고 방향 정보만 남김
    copyLine.normalize();
    // 90도 회전
    copyLine.rotate(-PI / 2);
    return copyLine;
  }
}
