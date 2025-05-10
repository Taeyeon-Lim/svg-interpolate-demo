import { MouseEvent, useState } from "react";
import RenderWithMotionMixer from "@utils/RenderWithMotionMixer";
import { pointsToLinearPath } from "@utils/pointsToPath";
import { linearInterpolate } from "@utils/interpolate";
import { pathToPoints } from "@utils/pathToPoints";

export default function MotionMixerLinear() {
  const [pointCount, setPointCount] = useState(180);

  const handlePointCount = (e: MouseEvent<HTMLInputElement>) => {
    setPointCount(Number(e.currentTarget.value));
  };

  const linearMixer = (a: string, b: string) => {
    const pathA = pathToPoints(a, pointCount);
    const pathB = pathToPoints(b, pointCount);

    return (t: number) => {
      const points = linearInterpolate(pathA, pathB, t);
      const path = pointsToLinearPath(points);

      return path;
    };
  };

  return (
    <RenderWithMotionMixer mixer={linearMixer} motionProps={{ pointCount }}>
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
