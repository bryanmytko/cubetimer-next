import { Dispatch, createContext, useReducer } from "react";

import { initialState } from "./initialState";
import { TimerReducer } from "../../reducers";

import { TimerAction, TimerState } from "../../types/timer";

const TimerContext = createContext<TimerState | null>(null);
const TimerDispatchContext = createContext<Dispatch<TimerAction> | null>(null);

const TimerProvider = ({ children }: any) => {
  const [timer, dispatch] = useReducer(TimerReducer, initialState);

  return (
    <TimerContext.Provider value={timer}>
      <TimerDispatchContext.Provider value={dispatch}>
        {children}
      </TimerDispatchContext.Provider>
    </TimerContext.Provider>
  );
};

export { TimerContext, TimerDispatchContext, TimerProvider };
