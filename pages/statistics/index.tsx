import React from 'react';
import './style.css';

const Statistics = () => {
  return <div className="container statistics-container">
    <h1>Statistics</h1>
    <div className="row">
      <div className="col s12">
        <p>Best Time: 19.34</p>
        <p>Best Average: 22.21</p>
        <table>
          <tr>
            <th>Date</th>
            <th>Average</th>
            <th colSpan={13}>Times</th>
          </tr>
          <tr>
            <td>11/5/1955</td>
            <td>19.87</td>
            <td>14.44</td>
            <td>21.37</td>
            <td>20.43</td>
            <td>19.87</td>
            <td>19.21</td>
            <td>21.33</td>
            <td>22.33</td>
            <td>13.87</td>
            <td>11.89</td>
            <td>14.97</td>
            <td>18.02</td>
            <td>13.33</td>
          </tr>
          <tr>
            <td>11/3/1955</td>
            <td>19.87</td>
            <td>14.44</td>
            <td>21.37</td>
            <td>20.43</td>
            <td>19.87</td>
            <td>19.21</td>
            <td>21.33</td>
            <td>22.33</td>
            <td>13.87</td>
            <td>11.89</td>
            <td>14.97</td>
            <td>18.02</td>
            <td>13.33</td>
          </tr>
        </table>
      </div>
    </div>
  </div>;
};

export default Statistics;
