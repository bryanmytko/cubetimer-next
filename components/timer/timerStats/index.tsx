import React from 'react';
import M from 'materialize-css';

import './style.css';
import { CalculateService, FormatService } from '../../../services';

const { humanReadableTime } = FormatService;

document.addEventListener('DOMContentLoaded', function() {
  const elems = document.querySelectorAll('select');
  M.FormSelect.init(elems);
});

const TimerStats = (props: TimerStatsProps) => {
  return <div className="timer-stats">
    <div className="col s6 m6 l6 left-align">
      <p>Cubes Solved: {props.solveTimes.length}</p>
      <p>Average: {humanReadableTime(CalculateService.runningAverage(props.solveTimes))}</p>
      <p>Ao5: {humanReadableTime(CalculateService.ao5(props.solveTimes))}</p>
      <p>Ao10: {humanReadableTime(CalculateService.ao10(props.solveTimes))}</p>
    </div>
    <div className="col s6 m6 l6 right-align">
      <p>Fastest: {humanReadableTime(CalculateService.fastestTime(props.solveTimes))}</p>
      <p>Slowest: {humanReadableTime(CalculateService.slowestTime(props.solveTimes))}</p>
      <select name="puzzle-type"
        defaultValue={'3x3'}
        onChange={(e) => {
          e.preventDefault();
          props.dispatch({ type: 'PUZZLE_TYPE', puzzle: e.target.value  })
        }
      }>
        <option value="2x2">2x2</option>
        <option value="3x3">3x3</option>
        <option value="4x4">4x4</option>
        <option value="5x5">5x5</option>
        <option value="6x6">6x6</option>
        <option value="7x7">7x7</option>
        {/* <option value="pyraminx">Pyraminx</option> */}
        {/* <option value="megaminx">Megaminx</option> */}
      </select>
    </div>
  </div>;
};

export default TimerStats;
