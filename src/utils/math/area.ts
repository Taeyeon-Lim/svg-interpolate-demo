import { Points } from "@/types/points";

/**
 * Vector product for scalar.
 * Calculate area(shoelace formula) in two dimensions as close as possible.
 *
 * When the sign of the return value is positive, it is counterclockwise.
 * Otherwise, it is the opposite.
 */
function measureArea(points: Points) {
  const n = points.length;
  let i = -1;
  let prev;
  let next = points[n - 1];
  let area = 0;

  while (++i < n) {
    prev = next;
    next = points[i];
    area += prev[1] * next[0] - prev[0] * next[1];
  }

  return area / 2;
}

export { measureArea };
