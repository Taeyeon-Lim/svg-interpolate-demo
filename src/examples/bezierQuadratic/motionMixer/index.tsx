import { useState, MouseEvent } from "react";
import RenderWithMotionMixer from "@utils/RenderWithMotionMixer";
import { pointsToQuadraticPath } from "@utils/pointsToPath";
import { linearInterpolate } from "@utils/interpolate";
import { pathToPoints } from "@utils/pathToPoints";

export default function MotionMixerBezierQuadratic() {
  const [pointCount, setPointCount] = useState(180);

  const handlePointCount = (e: MouseEvent<HTMLInputElement>) => {
    setPointCount(Number(e.currentTarget.value));
  };

  const BezierQuadraticMixer = (a: string, b: string) => {
    const pathA = pathToPoints(a, pointCount);
    const pathB = pathToPoints(b, pointCount);

    return (t: number) => {
      const points = linearInterpolate(pathA, pathB, t);
      const path = pointsToQuadraticPath(points);

      return path;
    };
  };
  return (
    <RenderWithMotionMixer
      mixer={BezierQuadraticMixer}
      motionProps={{ pointCount }}
    >
      {/* point count control */}
      [Point: {pointCount}]
      <input
        type='range'
        min={2}
        max={500}
        step={1}
        defaultValue={pointCount}
        onMouseUp={handlePointCount}
      />
    </RenderWithMotionMixer>
  );
}
