import styled from "styled-components";
import { animate, AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;

  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BoxSlider = {
  invisible: (back: boolean) => {
    return { opacity: 0, scale: 0, x: back ? -500 : 500 };
  },
  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 1 } },
  exit: (back: boolean) => {
    return {
      opacity: 0,
      scale: 0,
      x: back ? 500 : -500,
      transition: { duration: 1 },
    };
  },
};

function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextPlease = () =>
    setVisible((prev) => {
      setBack(false);
      return prev + 1;
    });
  const prevPlease = () =>
    setVisible((prev) => {
      setBack(true);
      return prev === 1 ? 1 : prev - 1;
    });
  return (
    <Wrapper>
      <button onClick={nextPlease}>next</button>
      <button onClick={prevPlease}>prev</button>
      <AnimatePresence>
        <Box
          custom={back}
          key={visible}
          variants={BoxSlider}
          initial="invisible"
          animate="visible"
          exit="exit"
        >
          {visible}
        </Box>
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
