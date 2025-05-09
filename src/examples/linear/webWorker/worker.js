import { interpolatePoints, pointsToLinearPath } from "../interpolate";

self.onmessage = ({ data }) => {
  const { fromPath, toPath, steps } = data;
  const frames = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const points = interpolatePoints(fromPath, toPath, t);
    const path = pointsToLinearPath(points);
    frames.push(path);
  }

  self.postMessage({ frames });
};
