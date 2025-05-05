/**
 * Linear Interpolate
 */

type Point = number[][];

function interpolatePoints(pointsA: Point, pointsB: Point, t: number) {
  return pointsA.map((pointA, i) => {
    const pointB = pointsB[i];
    return [
      pointA[0] + (pointB[0] - pointA[0]) * t,
      pointA[1] + (pointB[1] - pointA[1]) * t,
    ];
  });
}

function pointsToPath(points: Point) {
  let pathData = `M ${points[0][0].toFixed(3)} ${points[0][1].toFixed(3)}`;

  for (let i = 1; i < points.length; i++) {
    pathData += `L ${points[i][0].toFixed(3)} ${points[i][1].toFixed(3)}`;
  }

  return pathData + "Z";
}

export { interpolatePoints, pointsToPath };
