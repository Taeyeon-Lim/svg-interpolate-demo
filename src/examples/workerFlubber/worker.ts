import { interpolate } from "flubber";

self.onmessage = ({ data }) => {
  const { fromPath, toPath, steps, maxSegmentLength } = data;

  // 보간
  const morphFunction = interpolate(fromPath, toPath, {
    maxSegmentLength,
  });

  const frames = [];

  for (let i = 0; i < steps; i++) {
    const t = i / steps;
    frames.push(morphFunction(t));
  }

  self.postMessage({ frames });
};
