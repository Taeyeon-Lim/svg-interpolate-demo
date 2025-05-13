import {
  getPathProperties,
  pathToFeaturePoints,
  samplingPoints,
} from "@utils/pathToPoints";
import { paths } from "@utils/pathVars";

describe("sampling points", () => {
  test("Returns the properties of the path in the SVG path string", () => {
    const path = paths[0];
    const properties = getPathProperties(path);
    const usingMethods = ["getParts", "getTotalLength", "getPointAtLength"];

    usingMethods.forEach((method) => {
      expect(properties).toHaveProperty(method);
    });
  });

  test("Returns the correct feature points in the SVG path string", () => {
    const path = "M 0 0 L 2 0 Q 2 2 0 0 Z";
    const properties = getPathProperties(path);
    const parts = properties.getParts();

    expect(pathToFeaturePoints(parts)).toEqual([
      {
        distance: 0,
        x: 0,
        y: 0,
      },
      {
        distance: 2,
        x: 2,
        y: 0,
      },
    ]);
  });

  test("should generate the same number of points from both paths", () => {
    const targetPaths = [...paths, ...paths.reverse()];

    targetPaths.forEach((fromPath, index, self) => {
      const toPath = self[index + 1];
      const segment = index % 2 === 0 ? 180 : undefined;

      const { fromPoints, toPoints } = samplingPoints(
        fromPath,
        toPath,
        segment
      );

      expect(fromPoints.length === toPoints.length).toBe(true);
    });
  });
});
