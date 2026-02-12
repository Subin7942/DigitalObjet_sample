class CollisionSystem {
  constructor() {}

  // 개체와 선이 만날 가능성(충돌 가능성) 여부
  preColJudge(line) {
    // 개체와 선의 시작점 방향
    let dirEnCenterLnStart = p5.Vector.sub(entity.pos, line.start);

    // 개체와 선의 시작점을 이은 방향를 선의 법선에 투영해서 개체와 선의 직선 거리(제일 가까운 거리) 알아냄
    let dirEnCenterAndLn = abs(dirEnCenterLnStart.dot(line.normalUnit));

    // 개체와 선의 거리가 개체의 지름 보다 작으면 충돌 가능성 있음
    if (dirEnCenterAndLn <= entity.radius * 2) {
      return true;
    } else {
      return false;
    }
  }

  // 개체와 선이 만났는지(충돌) 여부
  colJudge(line) {
    // 선 벡터(초침) 제곱
    let a = line.Ln.magSq();

    // 개체에서 선으로 향하는 방향
    let dirLnStartEnCenter = p5.Vector.sub(line.start, entity.pos);

    // 선 벡터와 방향을 x y 끼리 곱해준 값 (선 벡터와 개체 중심의 위치 관계)
    let b = line.Ln.x * dirLnStartEnCenter.x + line.Ln.y * dirLnStartEnCenter.y;

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
}
