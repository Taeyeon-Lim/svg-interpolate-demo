import { Points } from "@/types/points";

function linearInterpolate(pointsA: Points, pointsB: Points, t: number) {
  return pointsA.map((pointA, i) => {
    const pointB = pointsB[i];
    return [
      pointA[0] + (pointB[0] - pointA[0]) * t,
      pointA[1] + (pointB[1] - pointA[1]) * t,
    ];
  });
}

export { linearInterpolate };
