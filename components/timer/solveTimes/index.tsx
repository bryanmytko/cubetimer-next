import React from 'react';

import { FormatService } from '../../../services';
import './style.css';

const { humanReadableTime } = FormatService;

const SolveTimes = (props: TimerStatsProps) => {
  return <div className="solve-times col s12 m3 l3">
    <h5>Solve Times</h5>
    <ul>
    {
      props.solveTimes.map((t: number, index: number) => {
        return (
          <li key={index} className="time">{humanReadableTime(t)}
            <button
              onClick={() => props.dispatch({ type: 'REMOVE_TIME', index })}
            >
              [x]
            </button>
          </li>
        );
      })
    }
    </ul>
  </div>;
};

export default SolveTimes;
