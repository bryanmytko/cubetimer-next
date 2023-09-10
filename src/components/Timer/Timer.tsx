import { TimerProvider } from "./TimerContext";
import { TimerContainer } from "./";

const Timer = () => {
  return (
    <TimerProvider>
      <TimerContainer />
    </TimerProvider>
  );
};

export default Timer;
