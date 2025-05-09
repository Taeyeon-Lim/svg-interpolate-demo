import { useState, MouseEvent } from "react";
import worker from "./worker.js?worker";
import RenderWithWorker from "@utils/RenderWithWorker";

export default function WorkerLinear() {
  const [pointCount, setPointCount] = useState(180);

  const handlePointCount = (e: MouseEvent<HTMLInputElement>) => {
    setPointCount(Number(e.currentTarget.value));
  };

  return (
    <RenderWithWorker WorkerInstance={worker} workerProps={{ pointCount }}>
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
    </RenderWithWorker>
  );
}
