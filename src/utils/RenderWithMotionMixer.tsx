import { useEffect, useState, CSSProperties, PropsWithChildren } from "react";
import { motion, useAnimate, useMotionValue, useTransform } from "motion/react";
import { colors, paths, InterpolateConfig as config } from "@utils/pathVars";

export default function RenderWithMotionMixer({
  mixer,
  motionProps,
  children,
}: PropsWithChildren<{
  mixer: ((from: string, to: string) => (v: number) => any) | undefined;
  motionProps?: { [key: string]: number };
}>) {
  // Controls State
  const [viewPoints, setViewPoints] = useState(false);

  // Morphing State
  const [pathIndex, setPathIndex] = useState(0);
  const progress = useMotionValue(0);

  const fill = useTransform(progress, paths.map(getIndex), colors);
  const path = useTransform(progress, paths.map(getIndex), paths, { mixer });

  const [, animate] = useAnimate();

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
        <ViewPointMarker />

        <motion.path
          d={path}
          fill={fill}
          stroke={"transparent"}
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
        <button onClick={() => setViewPoints((prev) => !prev)}>
          View Points
        </button>
      </div>
    </>
  );
}

const getIndex = (_: string, index: number) => index;

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
