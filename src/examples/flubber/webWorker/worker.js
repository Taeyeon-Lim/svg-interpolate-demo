import { interpolate } from "flubber";

self.onmessage = ({ data }) => {
  const { fromPath, toPath, frameCount, maxSegmentLength } = data;

  // 보간
  const morphFunction = interpolate(fromPath, toPath, {
    maxSegmentLength,
  });

  const frames = [];

  for (let i = 0; i < frameCount; i++) {
    const t = i / frameCount;
    frames.push(morphFunction(t));
  }

  self.postMessage({ frames });
};
