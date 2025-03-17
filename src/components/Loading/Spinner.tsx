import { CSSProperties } from "react";

const Spinner = ({ style }: { style?: CSSProperties }) => (
  <div className="w-20 h-20">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style={style}>
      <rect
        fill="#135F75"
        stroke="#135F75"
        stroke-width="15"
        width="30"
        height="30"
        x="25"
        y="85"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="1.3"
          values="1;0;1;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.4"
        ></animate>
      </rect>
      <rect
        fill="#135F75"
        stroke="#135F75"
        stroke-width="15"
        width="30"
        height="30"
        x="85"
        y="85"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="1.3"
          values="1;0;1;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.2"
        ></animate>
      </rect>
      <rect
        fill="#135F75"
        stroke="#135F75"
        stroke-width="15"
        width="30"
        height="30"
        x="145"
        y="85"
      >
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="1.3"
          values="1;0;1;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="0"
        ></animate>
      </rect>
    </svg>
  </div>
);

export default Spinner;
