import { Points } from "@/types/points";

function pointsToLinearPath(points: Points) {
  let pathData = `M ${points[0][0]} ${points[0][1]}`;

  for (let i = 1; i < points.length; i++) {
    pathData += ` L ${points[i][0]} ${points[i][1]}`;
  }

  return pathData + " Z";
}

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

const smooth = 0.5;

export { pointsToLinearPath, pointsToQuadraticPath };
