import { pointsToLinearPath } from "@utils/pointsToPath";
import { linearInterpolate } from "@utils/interpolate";
import { samplingPoints } from "@utils/pathToPoints";

self.onmessage = ({ data }) => {
  const { fromPath, toPath, frameCount, pointCount } = data;

  const { fromPoints, toPoints } = samplingPoints(fromPath, toPath, pointCount);

  const frames = [];

  for (let i = 0; i <= frameCount; i++) {
    const t = i / frameCount;
    const points = linearInterpolate(fromPoints, toPoints, t);
    const path = pointsToLinearPath(points);
    frames.push(path);
  }

  self.postMessage({ frames });
};
