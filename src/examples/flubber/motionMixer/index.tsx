import { MouseEvent, useState } from "react";
import { interpolate } from "flubber";
import RenderWithMotionMixer from "@utils/RenderWithMotionMixer";

export default function MotionMixerFlubber() {
  const [maxSegmentLength, setMaxSegmentLength] = useState(0.5);

  const handleMaxSegmentLength = (e: MouseEvent<HTMLInputElement>) => {
    setMaxSegmentLength(Number(e.currentTarget.value));
  };

  const flubberMixer = (a: string, b: string) =>
    interpolate(a, b, { maxSegmentLength });

  return (
    <RenderWithMotionMixer mixer={flubberMixer}>
      {/* flubber option */}
      [maxSegmentLength: {maxSegmentLength}]
      <input
        type='range'
        min={0.05}
        max={2}
        step={0.05}
        defaultValue={maxSegmentLength}
        onMouseUp={handleMaxSegmentLength}
      />
    </RenderWithMotionMixer>
  );
}
