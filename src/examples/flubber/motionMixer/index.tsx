import { motion, useAnimate, useMotionValue, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { interpolate } from "flubber";
import { colors, paths, InterpolateConfig as config } from "@utils/pathVars";

const getIndex = (_: string, index: number) => index;

export default function MotionMixerFlubber() {
  const maxSegmentLength = useMotionValue(0.5);
  const [viewPoints, setViewPoints] = useState(false);

  const [, animate] = useAnimate();
  const [pathIndex, setPathIndex] = useState(0);

  const progress = useMotionValue(pathIndex);
  const fill = useTransform(progress, paths.map(getIndex), colors);
  const path = useTransform(progress, paths.map(getIndex), paths, {
    mixer: (a, b) =>
      interpolate(a, b, { maxSegmentLength: maxSegmentLength.get() }),
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
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='400'
        height='400'
        viewBox='0 0 25 25'
      >
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
          stroke={"transparent"}
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
        {/* flubber option */}
        [maxSegmentLength: {maxSegmentLength.get()}]{" "}
        <input
          type='range'
          min={0.05}
          max={2}
          step={0.05}
          defaultValue={maxSegmentLength.get()}
          onChange={(e) => maxSegmentLength.set(Number(e.currentTarget.value))}
        />
        {/* spot view control */}
        <button onClick={() => setViewPoints((prev) => !prev)}>
          View Points
        </button>
      </div>
    </>
  );
}
