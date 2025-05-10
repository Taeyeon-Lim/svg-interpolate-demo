import { pointsToLinearPath } from "@utils/pointsToPath";
import { Points } from "@/types/points";

/**
 * Linear Interpolate
 */
function linearInterpolate(pointsA: Points, pointsB: Points, t: number) {
  return pointsA.map((pointA, i) => {
    const pointB = pointsB[i];
    return [
      pointA[0] + (pointB[0] - pointA[0]) * t,
      pointA[1] + (pointB[1] - pointA[1]) * t,
    ];
  });
}

const smooth = 0.5;

/**
 * Quadratic Bezier Interpolate
 */
function pointsToQuadraticPath(points: Points) {
  if (points.length < 3) return pointsToLinearPath(points);

  const startPoint = points[0];

  let pathData = `M ${startPoint[0]} ${startPoint[1]}`;

  for (let i = 0; i < points.length - 2; i++) {
    const controlPoint = points[i + 1];
    const endPoint = smoothVisual(points[i + 2], controlPoint, smooth);

    pathData += ` Q ${controlPoint[0]} ${controlPoint[1]} ${endPoint[0]} ${endPoint[1]}`;
  }

  const lastPoint = points[points.length - 1];
  const endPoint = smoothVisual(startPoint, lastPoint, smooth);

  pathData += ` Q ${lastPoint[0]} ${lastPoint[1]} ${endPoint[0]} ${endPoint[1]}`;

  return pathData + " Z";
}

function smoothVisual(
  endPoint: number[],
  controlPoint: number[],
  smooth?: number
) {
  if (smooth) {
    return endPoint.map((end, index) => (end + controlPoint[index]) * smooth);
  }
  return endPoint;
}

export { linearInterpolate, pointsToQuadraticPath };
