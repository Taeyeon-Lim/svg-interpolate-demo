import { Point } from "@/types/points";

function squaredDistance(a: Point, b: Point) {
  return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
}

export { squaredDistance };
