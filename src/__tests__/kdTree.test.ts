import { Point, Points } from "@/types/points";
import { buildKdTree } from "@utils/kdTree/build";
import { KdTreeNode } from "@utils/kdTree/node";
import { searchNearestNeighbor } from "@utils/kdTree/search";

describe.skip("kdTree", () => {
  test("should throw an error when input array is empty", () => {
    expect(() => buildKdTree([])).toThrowError();
  });

  test("returns correct kd-tree from given points", () => {
    // Create kdTree
    const points: Points = [
      [2, 3],
      [5, 4],
      [9, 6],
      [4, 7],
      [8, 1],
      [7, 2],
    ];
    const kdTree = buildKdTree(points);

    // Create dummy kdTree
    const axis = {
      x: 0,
      y: 1,
    };
    const rootNode = new KdTreeNode([7, 2], axis.x);
    const leftNode = new KdTreeNode([5, 4], axis.y);
    const rightNode = new KdTreeNode([9, 6], axis.y);
    const leftNode_leftNode = new KdTreeNode([2, 3], axis.x);
    const leftNode_rightNode = new KdTreeNode([4, 7], axis.x);
    const rightNode_leftNode = new KdTreeNode([8, 1], axis.x);

    rootNode.setLeft(leftNode);
    rootNode.setRight(rightNode);
    leftNode.setLeft(leftNode_leftNode);
    leftNode.setRight(leftNode_rightNode);
    rightNode.setLeft(rightNode_leftNode);

    expect(kdTree?.equals(rootNode)).toBe(true);
    expect(kdTree?.equals(leftNode)).toBe(false);
  });

  test("should return the nearest point from the built kd-tree", () => {
    const closestPoint: Point = [1, -1];
    const nearestNode: {
      point?: Point;
      distance: number;
    } = { distance: Infinity };

    const kdTree = buildKdTree([
      [1, 2],
      [-4, 2],
      [-1, -5],
      [6, -3],
      closestPoint,
    ]);
    const points: Points = [
      [-2, 0],
      [2, -2],
      [1, -5],
    ];

    points.forEach((point) => {
      const closestNode = searchNearestNeighbor(kdTree, point);

      if (closestNode.distance < nearestNode.distance) {
        nearestNode.point = closestNode.point;
        nearestNode.distance = closestNode.distance;
      }
    });

    expect(nearestNode.point).toBe(closestPoint);
  });
});
