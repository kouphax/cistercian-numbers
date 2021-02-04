import React, {useState} from "react";
import {CistercianNumber} from "./CistercianNumber";

function Generator() {
  const [number, setNumber] = useState(1);

  return (
    <div className="App">
      <div className="display">
        <CistercianNumber value={number} />
      </div>
      <div className="number">
        <input
          type="number"
          min={1}
          max={9999}
          value={isNaN(number) ? "" : number}
          onChange={(v) => setNumber(parseInt(v.target.value))}
        />
      </div>
    </div>
  );
}

export default Generator;
