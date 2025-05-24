import { KdTreeNode } from "./node";
import { Point } from "@/types/points";
import { squaredDistance } from "@utils/math/distance";

/**
 * Find the nearest neighbor index of a point in a kd-tree.
 * To be faster than "brute-force", you must calculate at least 1000 points(expected).
 */
// function findNearestIndexWithKdTree(A: Points, B: Points) {
//   const nearestNode: {
//     point?: Point;
//     distance: number;
//     index: number;
//   } = { distance: Infinity, index: 0 };

//   const kdTree = buildKdTree(A);

//   for (let j = 0; j < B.length; j++) {
//     const closestNode = searchNearestNeighbor(kdTree, B[j]);

//     if (closestNode.distance < nearestNode.distance) {
//       nearestNode.point = closestNode.point;
//       nearestNode.distance = closestNode.distance;
//       nearestNode.index = j;
//     }
//   }

//   const fromIndex = A.findIndex((p) => {
//     if (!nearestNode.point) return false;

//     return p[0] === nearestNode.point[0] && p[1] === nearestNode.point[1];
//   });

//   return Math.abs(fromIndex - nearestNode.index);
// }

function searchNearestNeighbor(kdTree: KdTreeNode | null, query: Point) {
  const closestNode: {
    point?: Point;
    distance: number;
    count: number;
  } = {
    distance: Infinity,
    count: 0,
  };

  if (kdTree === null) return closestNode;

  const stack: KdTreeNode[] = [kdTree];

  while (stack.length > 0) {
    closestNode.count++;
    const node = stack.pop()!;

    const distance = squaredDistance(node.point, query);

    if (distance < closestNode.distance) {
      closestNode.point = node.point;
      closestNode.distance = distance;
    }

    const axis = node.axis;
    const diff = query[axis] - node.point[axis];
    const left = node.getLeft();
    const right = node.getRight();

    if (diff < 0) {
      if (left) stack.push(left);
      if (right && diff * diff < closestNode.distance) {
        stack.push(right);
      }
    } else {
      if (right) stack.push(right);
      if (left && diff * diff < closestNode.distance) {
        stack.push(left);
      }
    }
  }

  closestNode.distance = Math.sqrt(closestNode.distance);

  return closestNode;
}

export { searchNearestNeighbor };
