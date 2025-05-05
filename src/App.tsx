import "@/app.css";
import { Fragment, useState } from "react";
import UiFreezingTest from "@utils/UiFreezingTest";
import WorkerFlubber from "@examples/workerFlubber";
import WorkerCustomLinear from "@examples/workerCustomLinear";
import MotionMixerFlubber from "@examples/motionMixerFlubber";
import Taps, { Tap } from "@utils/Taps";

// github Action 배포하기
// https://www.youtube.com/watch?v=tjV7nVX9CAA

function App() {
  const [taps, setTaps] = useState<Tap[]>([]);

  return (
    <>
      <Taps taps={taps} setTaps={setTaps} />

      {taps.map((tap) => {
        return (
          <Fragment key={tap}>
            {
              {
                "Rotate Text": <UiFreezingTest />,
                "motion mixer + flubber": <MotionMixerFlubber />,
                "web worker + flubber": <WorkerFlubber />,
                "web worker + linear interpolate": <WorkerCustomLinear />,
              }[tap]
            }
          </Fragment>
        );
      })}
    </>
  );
}

export default App;
