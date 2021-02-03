import React, {useEffect, useState} from "react";
import { DrawyThing } from "./DrawyThing";
import Time from "./Time";

function App() {
  const [number, setNumber] = useState(1);

  return (
    <div className="App">
      <div className="display">
        <DrawyThing data={number} />
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
        <Time />
    </div>
  );
}

export default App;
