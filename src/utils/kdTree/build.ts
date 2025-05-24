import { Points } from "@/types/points";
import { KdTreeNode } from "./node";
import { throwError } from "@utils/message";

function buildKdTree(points: Points, depth = 0) {
  throwError(
    "Failed build kd-tree: Check length of points, length of points is 0",
    depth === 0 && points.length === 0
  );

  if (points.length === 0) return null;

  const dimension = points[0].length;
  const axis = depth % dimension;

  points.sort((a, b) => a[axis] - b[axis]);

  const medianIndex = Math.floor(points.length / 2);
  const node = new KdTreeNode(points[medianIndex], axis);

  node.setLeft(buildKdTree(points.slice(0, medianIndex), depth + 1));
  node.setRight(buildKdTree(points.slice(medianIndex + 1), depth + 1));

  return node;
}

export { buildKdTree };
