import { pointsToLinearPath } from "@utils/pointsToPath";
import { pathToPoints } from "@utils/pathToPoints";

self.onmessage = ({ data }) => {
  const { fromPath, toPath, frameCount, pointCount } = data;

  const fromPoints = pathToPoints(fromPath, pointCount);
  const toPoints = pathToPoints(toPath, pointCount);

  const frames = [];

  for (let i = 0; i <= frameCount; i++) {
    const t = i / frameCount;
    const points = linearInterpolate(fromPoints, toPoints, t);
    const path = pointsToLinearPath(points);
    frames.push(path);
  }

  self.postMessage({ frames });
};
