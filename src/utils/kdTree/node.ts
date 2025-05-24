import { Point } from "@/types/points";

class KdTreeNode {
  readonly point: Point;
  readonly axis: number;
  private left: KdTreeNode | null;
  private right: KdTreeNode | null;

  constructor(point: Point, axis: number) {
    this.point = point;
    this.axis = axis;
    this.left = null;
    this.right = null;
  }

  getLeft() {
    return this.left;
  }

  getRight() {
    return this.right;
  }

  setLeft(node: KdTreeNode | null) {
    this.left = node;
  }

  setRight(node: KdTreeNode | null) {
    this.right = node;
  }

  equals(compare: KdTreeNode | null) {
    if (compare === null) return false;

    return (
      this.point[0] === compare.point[0] &&
      this.point[1] === compare.point[1] &&
      this.axis === compare.axis &&
      this.#equalsChildNodes(this.left, compare.left) &&
      this.#equalsChildNodes(this.right, compare.right)
    );
  }

  #equalsChildNodes(
    target: KdTreeNode | null,
    compare: KdTreeNode | null
  ): boolean {
    if (target === null && compare === null) return true;
    if (target === null || compare === null) return false;
    return target.equals(compare);
  }
}

export { KdTreeNode };
