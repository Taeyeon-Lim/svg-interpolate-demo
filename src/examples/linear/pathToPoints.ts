export default function pathToPoints(pathString: string, numPoints: number) {
  const tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  tempSvg.style.position = "absolute";
  tempSvg.style.visibility = "hidden";

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathString);
  tempSvg.appendChild(path);
  document.body.appendChild(tempSvg);

  const pathLength = path.getTotalLength();
  const points = [];
  const pointCount = numPoints - 1;

  for (let i = 0; i < numPoints; i++) {
    const distance = (i / pointCount) * pathLength;
    const point = path.getPointAtLength(distance);
    points.push([point.x, point.y]);
  }

  document.body.removeChild(tempSvg);

  return points;
}
