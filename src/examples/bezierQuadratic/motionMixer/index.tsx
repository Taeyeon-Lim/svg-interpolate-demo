import { useState, MouseEvent } from "react";
import RenderWithMotionMixer from "@utils/RenderWithMotionMixer";
import { pointsToQuadraticPath } from "@utils/pointsToPath";
import { linearInterpolate } from "@utils/interpolate";
import { samplingPoints } from "@utils/pathToPoints";

export default function MotionMixerBezierQuadratic() {
  const [pointCount, setPointCount] = useState(180);

  const handlePointCount = (e: MouseEvent<HTMLInputElement>) => {
    setPointCount(Number(e.currentTarget.value));
  };

  const BezierQuadraticMixer = (a: string, b: string) => {
    const { fromPoints, toPoints } = samplingPoints(a, b, pointCount);

    return (t: number) => {
      const points = linearInterpolate(fromPoints, toPoints, t);
      const path = pointsToQuadraticPath(points);

      return path;
    };
  };
  return (
    <RenderWithMotionMixer mixer={BezierQuadraticMixer}>
      {/* point count control */}
      [Point: {pointCount}]
      <input
        type='range'
        min={0}
        max={550}
        step={1}
        defaultValue={pointCount}
        onMouseUp={handlePointCount}
      />
    </RenderWithMotionMixer>
  );
}
