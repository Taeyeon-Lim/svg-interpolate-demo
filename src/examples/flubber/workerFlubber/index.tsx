import { useMotionValue, useTransform, motion, useAnimate } from "motion/react";
import { useState, useEffect } from "react";
import { colors, paths, InterpolateConfig as config } from "@utils/pathVars";
import Worker from "./worker.js?worker";

export default function WorkerFlubber() {
  const maxSegmentLength = useMotionValue(0.5);
  const [viewPoints, setViewPoints] = useState(false);

  const [, animate] = useAnimate();
  const [pathIndex, setPathIndex] = useState(0);

  const progress = useMotionValue(0);
  const path = useMotionValue(paths[0]);
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
      steps: 360,
      maxSegmentLength: maxSegmentLength.get(),
    });

    worker.onmessage = (e) => {
      if (e.data.frames) {
        path.set(e.data.frames[0]);

        runAnimation(e.data.frames);
      }
    };

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
  }, [animate, pathIndex]);

  return (
    <>
      <svg width='400' height='400' viewBox='0 0 30 30'>
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
