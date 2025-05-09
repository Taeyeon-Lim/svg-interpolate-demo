import { useState, useEffect, PropsWithChildren, CSSProperties } from "react";
import { motion, useAnimate, useTransform, useMotionValue } from "motion/react";
import { colors, paths, InterpolateConfig as config } from "@utils/pathVars";

export default function RenderWithWorker({
  WorkerInstance,
  workerProps,
  workerOptions = { frameCount: 180 },
  children,
}: PropsWithChildren<{
  WorkerInstance: new (options?: { name?: string }) => Worker;
  workerProps?: { [key: string]: number };
  workerOptions?: { frameCount: number };
}>) {
  // Controls State
  const frameCount = useMotionValue(workerOptions.frameCount);
  const [viewPoints, setViewPoints] = useState(false);

  // Morphing State
  const [pathIndex, setPathIndex] = useState(0);
  const progress = useMotionValue(0);

  const path = useMotionValue(paths[0]);
  const fill = useTransform(
    progress,
    [0, 1],
    [colors[pathIndex], colors[pathIndex + 1]]
  );

  const [, animate] = useAnimate();

  useEffect(() => {
    if (!window.Worker) return;

    const worker = new WorkerInstance();

    worker.postMessage({
      fromPath: paths[pathIndex],
      toPath: paths[pathIndex + 1],
      ...workerProps,
      frameCount: frameCount.get(),
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
      <svg width='400' height='400' viewBox='0 0 25 25'>
        <ViewPointMarker />

        <motion.path
          d={path}
          fill={fill}
          stroke='transparent'
          markerStart={viewPoints ? "url(#dot)" : ""}
          markerMid={viewPoints ? "url(#dot)" : ""}
        />
      </svg>

      <div style={controlsStyle}>
        {/*
         * interpolate option controls
         */}
        {children}
        {/*
         * common option controls
         */}
        [Frame: {frameCount.get()}]{" "}
        <input
          type='range'
          min={1}
          max={500}
          step={1}
          defaultValue={frameCount.get()}
          onMouseUp={(e) => {
            frameCount.set(Number(e.currentTarget.value));
          }}
        />
        <button onClick={() => setViewPoints((prev) => !prev)}>
          View Points
        </button>
      </div>
    </>
  );
}

function ViewPointMarker() {
  return (
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
  );
}

const controlsStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 25,
};
