import { svgPathProperties } from "svg-path-properties";
import { PartProperties, Point } from "svg-path-properties/dist/types/types";
import { Points, FeaturePoint } from "@/types/points";

function samplingPoints(fromPath: string, toPath: string, segment: number = 0) {
  const fromPathProperties = getPathProperties(fromPath);
  const toPathProperties = getPathProperties(toPath);

  const fromFeaturePoints = pathToFeaturePoints(fromPathProperties.getParts());
  const toFeaturePoints = pathToFeaturePoints(toPathProperties.getParts());

  const fromPoints = sampling(
    fromFeaturePoints,
    fromPathProperties.getTotalLength(),
    fromPathProperties.getPointAtLength,
    fromFeaturePoints.length < toFeaturePoints.length
      ? toFeaturePoints.length - fromFeaturePoints.length + segment
      : segment
  );
  const toPoints = sampling(
    toFeaturePoints,
    toPathProperties.getTotalLength(),
    toPathProperties.getPointAtLength,
    fromFeaturePoints.length > toFeaturePoints.length
      ? fromFeaturePoints.length - toFeaturePoints.length + segment
      : segment
  );

  return { fromPoints, toPoints };
}

function pathToFeaturePoints(parts: PartProperties[]) {
  const featurePoints: FeaturePoint[] = [];
  let accumulate = 0;

  parts.forEach((point) => {
    if (point.length === 0) return;

    featurePoints.push({
      x: point.start.x,
      y: point.start.y,
      distance: accumulate,
    });

    accumulate += point.length;
  });

  return featurePoints;
}

function sampling(
  pathPoints: FeaturePoint[],
  pathLength: number,
  getPointAtLength: (fractionLength: number) => Point,
  count: number
) {
  const points: Points = [];
  let cursor = 0;

  for (let i = 1; i <= count; i++) {
    const distance = (i / (count + 1)) * pathLength;

    while (pathPoints[cursor] && pathPoints[cursor].distance < distance) {
      const { x, y } = pathPoints[cursor];

      points.push([x, y]);
      cursor++;
    }

    const { x, y } = getPointAtLength(distance);
    points.push([x, y]);
  }

  while (cursor < pathPoints.length) {
    const { x, y } = pathPoints[cursor];

    points.push([x, y]);
    cursor++;
  }

  return points;
}

function getPathProperties(pathString: string) {
  // DOM
  // if (typeof window !== "undefined" && window?.document) {
  //   const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  //   path.setAttribute("d", pathString);
  //   return path;
  // }

  // Node
  return new svgPathProperties(pathString);
}

export { samplingPoints };
