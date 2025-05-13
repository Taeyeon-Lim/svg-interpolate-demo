import { linearInterpolate } from "@utils/interpolate";
import { Points } from "@/types/points";

describe("linear interpolate", () => {
  test("should return the correct interpolated coordinates based on t", () => {
    const pointsA: Points = [
      [1, 2],
      [3, 4],
    ];
    const pointsB: Points = [
      [7, 8],
      [9, 10],
    ];

    const times = [0, 0.5, 1];
    const expected: Points[] = [
      pointsA,
      [
        [4, 5],
        [6, 7],
      ],
      pointsB,
    ];

    times.forEach((t, i) => {
      expect(linearInterpolate(pointsA, pointsB, t)).toEqual(expected[i]);
    });
  });
});
