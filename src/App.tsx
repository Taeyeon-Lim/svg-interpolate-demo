import "@/app.css";
import { Fragment, useState } from "react";
import Taps, { Tap } from "@utils/Taps";
import UiFreezingTest from "@utils/UiFreezingTest";
import WorkerLinear from "@examples/linear/webWorker";
import WorkerFlubber from "@examples/flubber/webWorker";
import WorkerQuadraticBezier from "@examples/bezierQuadratic/webWorker";
import MotionMixerLinear from "@examples/linear/motionMixer";
import MotionMixerFlubber from "@examples/flubber/motionMixer";
import MotionMixerBezierQuadratic from "@examples/bezierQuadratic/motionMixer";

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
                "flubber + motion mixer": <MotionMixerFlubber />,
                "flubber + web worker": <WorkerFlubber />,
                "linear + motion mixer": <MotionMixerLinear />,
                "linear + web worker": <WorkerLinear />,
                "quadratic bezier + motion mixer": (
                  <MotionMixerBezierQuadratic />
                ),
                "quadratic bezier + web worker": <WorkerQuadraticBezier />,
              }[tap]
            }
          </Fragment>
        );
      })}
    </>
  );
}

export default App;
