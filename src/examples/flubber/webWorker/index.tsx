import { MouseEvent, useState } from "react";
import worker from "./worker.js?worker";
import RenderWithWorker from "@utils/RenderWithWorker";

export default function WorkerFlubber() {
  const [maxSegmentLength, setMaxSegmentLength] = useState(0.5);

  const handleMaxSegmentLength = (e: MouseEvent<HTMLInputElement>) => {
    setMaxSegmentLength(Number(e.currentTarget.value));
  };

  return (
    <RenderWithWorker
      WorkerInstance={worker}
      workerProps={{ maxSegmentLength }}
    >
      {/* flubber option */}
      [maxSegmentLength: {maxSegmentLength}]
      <input
        type='range'
        min={0.05}
        max={5}
        step={0.05}
        defaultValue={maxSegmentLength}
        onMouseUp={handleMaxSegmentLength}
      />
    </RenderWithWorker>
  );
}
