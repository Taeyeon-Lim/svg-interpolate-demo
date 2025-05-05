import { CSSProperties } from "react";
import { motion, useTime, useTransform } from "motion/react";

export default function UiFreezingTest() {
  const time = useTime();
  const rotate = useTransform(time, [0, 5000], [0, 360], {
    clamp: false,
  });

  return (
    <motion.p style={{ ...style, rotate }}>
      UiFreezingUiFreezingUiFreezingUiFreezing
      <br />
      UiFreezingUiFreezingUiFreezingUiFreezing
      <br />
      UiFreezingUiFreezingUiFreezingUiFreezing
      <br />
      UiFreezingUiFreezingUiFreezingUiFreezing
    </motion.p>
  );
}

const style: CSSProperties = {
  color: "white",
  lineHeight: 1.2,
  margin: "100px 0px",
};
