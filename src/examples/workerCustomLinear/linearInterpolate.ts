type point = [number, number][];

self.onmessage = ({ data }) => {
  const { fromPath, toPath, steps } = data;

  // 선형 보간
  function interpolatePoints(pointsA: point, pointsB: point, t: number): point {
    return pointsA.map((pointA, i) => {
      const pointB = pointsB[i];
      return [
        pointA[0] + (pointB[0] - pointA[0]) * t,
        pointA[1] + (pointB[1] - pointA[1]) * t,
      ];
    });
  }

  // 점 배열을 path 문자열로 변환
  function pointsToPath(points: point) {
    let pathData = `M ${points[0][0].toFixed(3)} ${points[0][1].toFixed(3)}`;

    for (let i = 1; i < points.length; i++) {
      pathData += `L ${points[i][0].toFixed(3)} ${points[i][1].toFixed(3)}`;
    }

    return pathData + "Z";
  }

  const frames = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const points = interpolatePoints(fromPath, toPath, t);
    const path = pointsToPath(points);
    frames.push(path);
  }

  self.postMessage({ frames });
};
