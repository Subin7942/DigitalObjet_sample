class CollisionJudge {
  // 충돌 판단 전 충돌 가능성 여부
  preColJudge;
  // 충돌했는지 여부
  colJudge;

  // entity;
  // handS;
  // hendM;
  // hendH;
  constructor() {
    // entity = new Entity(width / 2, height / 2, 40);
    // handS = new Hand(0, 0, 1000);
    // handM = new Hand(0, 0, 300);
    // handH = new Hand(0, 0, 200);
  }

  // EHrun() {
  //   entity.show();
  //   entity.inside();
  //   entity.setVel(0.1);
  //   entity.move();

  //   let s = second();
  //   let m = minute();
  //   let h = hour();
  //   handS.show(s);
  //   handM.show(m);
  //   handH.show(h, 12);
  // }

  preColJudge() {
    // 개체와 선의 시작점 거리
    let distEL = p5.Vector.sub(entity.pos, handS.start);
    let distECenterAndL = abs(distEL.dot(Hand.normalUnit));
    if (distECenterAndL <= entity.radius * 2) {
      return true;
    } else {
      return false;
    }
  }
}
