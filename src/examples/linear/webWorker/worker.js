import { interpolatePoints, pointsToLinearPath } from "../interpolate";
import pathToPoints from "@utils/pathToPoints";

self.onmessage = ({ data }) => {
  const { fromPath, toPath, frameCount, pointCount } = data;

  const fromPoints = pathToPoints(fromPath, pointCount);
  const toPoints = pathToPoints(toPath, pointCount);

  const frames = [];

  for (let i = 0; i <= frameCount; i++) {
    const t = i / frameCount;
    const points = interpolatePoints(fromPoints, toPoints, t);
    const path = pointsToLinearPath(points);
    frames.push(path);
  }

  self.postMessage({ frames });
};
