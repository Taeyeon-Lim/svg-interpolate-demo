import { motion } from "motion/react";
import { Dispatch, SetStateAction } from "react";

const helperTaps = ["Rotate Text"] as const;
const InterpolateTaps = [
  "flubber + motion mixer",
  "flubber + web worker",
  "linear + motion mixer",
  "linear + web worker",
] as const;

export type Tap =
  | (typeof InterpolateTaps)[number]
  | (typeof helperTaps)[number];

export default function Taps({
  taps,
  setTaps,
}: {
  taps: Tap[];
  setTaps: Dispatch<SetStateAction<Tap[]>>;
}) {
  return (
    <nav className='taps'>
      <p className='taps-subtitle'>Helper</p>
      <ul>
        {helperTaps.map((name) => (
          <Tap key={name} name={name} taps={taps} setTaps={setTaps} />
        ))}
      </ul>

      <p className='taps-subtitle'>Interpolate</p>
      <ul>
        {InterpolateTaps.map((name) => (
          <Tap key={name} name={name} taps={taps} setTaps={setTaps} />
        ))}
      </ul>
    </nav>
  );
}

function Tap({
  name,
  taps,
  setTaps,
}: {
  name: Tap;
  taps: Tap[];
  setTaps: Dispatch<SetStateAction<Tap[]>>;
}) {
  const handleTap = () => {
    taps.includes(name)
      ? setTaps(taps.filter((tap) => tap !== name))
      : setTaps([...taps, name]);
  };

  return (
    <motion.li
      className='tap'
      onClick={handleTap}
      style={{
        color: taps.includes(name) ? "#fff" : "rgba(0, 0, 0, 0.5)",
        background: taps.includes(name)
          ? "linear-gradient(250deg, #888, #f107a3)"
          : "linear-gradient(250deg, #fff, #fff)",
      }}
      whileHover={{
        color: "#000",
        background: "linear-gradient(0deg, #eee, #eee)",
      }}
    >
      {name}
    </motion.li>
  );
}
