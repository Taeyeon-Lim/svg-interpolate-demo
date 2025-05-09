/**
 * Linear Interpolate
 */

import { Points } from "@/types/points";

function interpolatePoints(pointsA: Points, pointsB: Points, t: number) {
  return pointsA.map((pointA, i) => {
    const pointB = pointsB[i];
    return [
      pointA[0] + (pointB[0] - pointA[0]) * t,
      pointA[1] + (pointB[1] - pointA[1]) * t,
    ];
  });
}

function pointsToLinearPath(points: Points) {
  let pathData = `M ${points[0][0]} ${points[0][1]}`;

  for (let i = 1; i < points.length; i++) {
    pathData += ` L ${points[i][0]} ${points[i][1]}`;
  }

  return pathData + " Z";
}

export { interpolatePoints, pointsToLinearPath };
