import { Point } from "@/types/points";

function euclideanDistance(a: Point, b: Point) {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

function squaredDistance(a: Point, b: Point) {
  return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
}

export { euclideanDistance, squaredDistance };
