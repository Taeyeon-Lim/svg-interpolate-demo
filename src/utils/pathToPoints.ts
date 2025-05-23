import { svgPathProperties } from "svg-path-properties";
import { PartProperties, Point } from "svg-path-properties/dist/types/types";
import { Points, FeaturePoint } from "@/types/points";
import { measureArea } from "./math/area";
import { squaredDistance } from "./math/distance";

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
  let toPoints = sampling(
    toFeaturePoints,
    toPathProperties.getTotalLength(),
    toPathProperties.getPointAtLength,
    fromFeaturePoints.length > toFeaturePoints.length
      ? fromFeaturePoints.length - toFeaturePoints.length + segment
      : segment
  );

  sortPoints(fromPoints, toPoints);

  const startIndex = findNearestIndex(fromPoints, toPoints);
  const forwardToPoints = toPoints.splice(startIndex);

  return {
    fromPoints,
    toPoints: [...forwardToPoints, ...toPoints],
  };
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

function sortPoints(fromPoints: Points, toPoints: Points) {
  if (measureArea(fromPoints) < 0) {
    fromPoints.reverse();
  }
  if (measureArea(toPoints) < 0) {
    toPoints.reverse();
  }
}

function findNearestIndex(A: Points, B: Points) {
  let minDistance = Infinity;
  let bestIndex = [0, 0];

  for (let i = 0; i < B.length; i++) {
    for (let j = 0; j < A.length; j++) {
      const distance = squaredDistance(A[j], B[i]);

      if (distance < minDistance) {
        minDistance = distance;
        bestIndex = [i, j];
      }
    }
  }

  return Math.abs(bestIndex[0] - bestIndex[1]);
}

export { samplingPoints, pathToFeaturePoints, getPathProperties };
