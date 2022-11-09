import React, { useEffect, useReducer } from 'react';
import './style.css';

import { Scramble } from '../';
import TimerStats from './timerStats';
import SolveTimes from './solveTimes';
import { TimerReducer, TimerActionKind } from '../../reducers';
import { FormatService, ScrambleService } from '../../services';

const { humanReadableTime } = FormatService;

const initialState: TimerState = {
  running: false,
  ready: false,
  time: 0,
  solveTimes: [],
  scramble: new ScrambleService('3x3').generate()
};

const Timer = () => {
  const [state, dispatch] = useReducer(TimerReducer, initialState);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if(state.running) {
      interval = setInterval(() => dispatch({ type: TimerActionKind.TICK }), 10);
    }

    const handleKeydown = (e: KeyboardEvent) => {
      if(e.key !== ' ') return;
      e.preventDefault();
      dispatch({ type: TimerActionKind.READY });
    };

    const handleKeyup = (e: KeyboardEvent) => {
      if(e.key !== ' ') return;
      e.preventDefault();
      dispatch({ type: TimerActionKind.TOGGLE });
    };

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [state.running]);

  return <div className="container timer-container">
      <div className="row">
        <div className="col s12 m9 l9">
          <Scramble scramble={state.scramble} />
          <div className="timer-window card">
            <span>{humanReadableTime(state.time, '0:00')}</span>
          </div>
          <button id="timer-btn"
            className={`timer-btn-start ${state.ready ? 'timer-btn-ready' : '' }`}
            onClick={() => dispatch({ type: TimerActionKind.TOGGLE })}>Press spacebar or click to begin!
        </button>
        <TimerStats dispatch={dispatch} solveTimes={state.solveTimes} />
        </div>
        <SolveTimes dispatch={dispatch} solveTimes={state.solveTimes} />
      </div>
    </div>;
}

export default Timer;
