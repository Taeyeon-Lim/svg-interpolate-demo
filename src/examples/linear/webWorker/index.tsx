import { motion, useAnimate, useMotionValue, useTransform } from "motion/react";
import { useState, useEffect } from "react";
import { paths, colors, InterpolateConfig as config } from "@utils/pathVars";
import Worker from "./worker.js?worker";

export default function WorkerLinear() {
  // Setting State
  const frame = useMotionValue(180);
  const pointCount = useMotionValue(180);
  const [viewPoints, setViewPoints] = useState(false);

  // Morphing State
  const [, animate] = useAnimate();
  const [pathIndex, setPathIndex] = useState(0);
  const path = useMotionValue("");

  const progress = useMotionValue(0);
  const fill = useTransform(
    progress,
    [0, 1],
    [colors[pathIndex], colors[pathIndex + 1]]
  );

  useEffect(() => {
    if (!window.Worker) return;

    const worker = new Worker();

    worker.postMessage({
      fromPath: paths[pathIndex],
      toPath: paths[pathIndex + 1],
      steps: frame.get(),
      pointCount: pointCount.get(),
    });

    worker.onmessage = (e) => {
      if (e.data.frames) {
        path.set(e.data.frames[0]);

        runAnimation(e.data.frames);
      }
    };

    // animating
    const runAnimation = async (frames: string[]) => {
      const colorAnimation = animate(progress, 1, config);
      const maxFrame = frames.length - 1;

      const frameAnimation = animate(0, maxFrame, {
        ...config,
        onUpdate: (latest) => {
          const currentFrame = Math.min(Math.round(latest), maxFrame);

          path.set(frames[currentFrame]);
        },
      });

      await Promise.all([colorAnimation, frameAnimation]);

      progress.set(0);

      setPathIndex((i) => (i + 1) % (paths.length - 1));
    };

    return () => worker.terminate();
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
        {/* frame count control */}
        [Frame: {frame.get()}]{" "}
        <input
          type='range'
          min={1}
          max={1000}
          step={1}
          defaultValue={frame.get()}
          onChange={(e) => {
            frame.set(Number(e.currentTarget.value));
          }}
        />
        {/* spot view control */}
        <button onClick={() => setViewPoints((prev) => !prev)}>
          View Points
        </button>
      </div>
    </>
  );
}
