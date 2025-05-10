import { Points } from "@/types/points";

function pointsToLinearPath(points: Points) {
  let pathData = `M ${points[0][0]} ${points[0][1]}`;

  for (let i = 1; i < points.length; i++) {
    pathData += ` L ${points[i][0]} ${points[i][1]}`;
  }

  return pathData + " Z";
}

export { pointsToLinearPath };
