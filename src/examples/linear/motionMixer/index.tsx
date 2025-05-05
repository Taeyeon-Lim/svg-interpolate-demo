import { motion, useAnimate, useMotionValue, useTransform } from "motion/react";
import { useState, useEffect } from "react";
import pathToPoints from "../pathToPoints";
import { interpolatePoints, pointsToPath } from "../interpolate";
import { paths, colors, InterpolateConfig as config } from "@utils/pathVars";

const getIndex = (_: string, index: number) => index;

export default function MotionMixerLinear() {
  // Setting State
  const pointCount = useMotionValue(400);
  const [viewPoints, setViewPoints] = useState(false);

  // Morphing State
  const [, animate] = useAnimate();
  const [pathIndex, setPathIndex] = useState(0);

  const progress = useMotionValue(pathIndex);
  const fill = useTransform(progress, paths.map(getIndex), colors);
  const path = useTransform(progress, paths.map(getIndex), paths, {
    mixer: (a, b) => {
      const pathA = pathToPoints(a, pointCount.get());
      const pathB = pathToPoints(b, pointCount.get());

      return (t) => {
        const points = interpolatePoints(pathA, pathB, t);
        const path = pointsToPath(points);

        return path;
      };
    },
  });

  useEffect(() => {
    const play = async () => {
      await animate(progress, pathIndex, {
        ...config,
        onComplete: () => {
          if (pathIndex === paths.length - 1) {
            progress.set(0);
            setPathIndex(1);
          } else {
            setPathIndex(pathIndex + 1);
          }
        },
      });
    };

    play();
  }, [pathIndex, animate]);

  return (
    <>
      <svg width='400' height='400' viewBox='0 0 25 25'>
        <defs>
          <marker
            id='dot'
            viewBox='0 0 4 4'
            refX='2'
            refY='2'
            markerWidth='2'
            markerHeight='2'
            orient='auto'
          >
            <circle cx='2' cy='2' r='.25' fill='#000' />
          </marker>
        </defs>

        <motion.path
          d={path}
          fill={fill}
          stroke='transparent'
          markerStart={viewPoints ? "url(#dot)" : ""}
          markerMid={viewPoints ? "url(#dot)" : ""}
        />
      </svg>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 25,
        }}
      >
        {/* point count control */}
        [Point: {pointCount.get()}]{" "}
        <input
          type='range'
          min={2}
          max={500}
          step={1}
          defaultValue={pointCount.get()}
          onChange={(e) => pointCount.set(Number(e.currentTarget.value))}
        />
        {/* spot view control */}
        <button onClick={() => setViewPoints((prev) => !prev)}>
          View Points
        </button>
      </div>
    </>
  );
}
