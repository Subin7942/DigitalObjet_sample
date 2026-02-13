class CollisionSystem {
  constructor() {}

  // 점 P에서 선분 AB까지의 가장 가까운 점 + 거리 구하기
  closestPointOnSegment(P, A, B) {
    let AB = p5.Vector.sub(B, A);
    let AP = p5.Vector.sub(P, A);

    let ab2 = AB.magSq();
    if (ab2 === 0) {
      // A와 B가 같은 점이면
      return { point: A.copy(), t: 0, dist: p5.Vector.dist(P, A) };
    }

    let t = AP.dot(AB) / ab2;
    t = constrain(t, 0, 1);

    let closest = p5.Vector.add(A, p5.Vector.mult(AB, t));
    let dist = p5.Vector.dist(P, closest);

    return { point: closest, t, dist };
  }

  // (넓게) 충돌 가능성 여부: 선분-원 거리로 판단 (빠르고 안정적)
  preColJudge(line) {
    // 선분 시작/끝
    let A = line.colStart ? line.colStart : line.start;
    let B = line.end;

    let hit = this.closestPointOnSegment(entity.pos, A, B);

    // 여유값(닿기 직전에도 판정이 켜지게)
    let margin = entity.radius * 0.5;
    return hit.dist <= entity.radius + margin;
  }

  // 실제 충돌 여부: 선분-원 최단거리 <= 반지름
  colJudge(line) {
    let A = line.colStart ? line.colStart : line.start;
    let B = line.end;

    let hit = this.closestPointOnSegment(entity.pos, A, B);
    return hit.dist <= entity.radius;
  }

  // 개체가 선에 닿았을 때 위치 재조정 (겹침 해소)
  rePosition(line) {
    let A = line.colStart ? line.colStart : line.start;
    let B = line.end;

    let hit = this.closestPointOnSegment(entity.pos, A, B);

    // 밀어낼 방향 = closest -> entity
    let pushDir = p5.Vector.sub(entity.pos, hit.point);

    // 완전히 겹쳐서 방향이 0이면 법선 사용
    if (pushDir.magSq() === 0) {
      pushDir = line.normalUnit.copy();
    } else {
      pushDir.normalize();
    }

    // 겹친 만큼 + 살짝(0.8px) 더 밀어서 다음 프레임에도 붙어있는 현상 방지
    let pushAmount = entity.radius - hit.dist + 0.8;
    pushDir.mult(pushAmount);

    return p5.Vector.add(entity.pos, pushDir);
  }

  // 반사 속도 계산(항상 반사) — 방향은 충돌 법선 기반
  reVelocity(line, inputVel) {
    let vel = inputVel ? inputVel.copy() : entity.vel.copy();

    let A = line.colStart ? line.colStart : line.start;
    let B = line.end;

    let hit = this.closestPointOnSegment(entity.pos, A, B);

    // 충돌 법선(closest -> entity)
    let n = p5.Vector.sub(entity.pos, hit.point);

    if (n.magSq() === 0) {
      n = line.normalUnit.copy();
    } else {
      n.normalize();
    }

    // vel' = vel - 2*(vel·n)*n
    let dot = vel.dot(n);
    let reflect = p5.Vector.mult(n, 2 * dot);
    vel.sub(reflect);

    return vel;
  }
}
