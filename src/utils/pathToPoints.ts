import { svgPathProperties } from "svg-path-properties";

export default function pathToPoints(pathString: string, numPoints: number) {
  const path = getPathProperties(pathString);
  const pathLength = path.getTotalLength();
  const points = [];

  for (let i = 1; i <= numPoints; i++) {
    const distance = (i / numPoints) * pathLength;
    const point = path.getPointAtLength(distance);
    points.push([point.x, point.y]);
  }

  return points;
}

function getPathProperties(pathString: string) {
  if (typeof window !== "undefined" && window?.document) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathString);

    return path;
  }

  return new svgPathProperties(pathString);
}
