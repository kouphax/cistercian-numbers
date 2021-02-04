import React, {useState} from "react";
import {CistercianNumber} from "./CistercianNumber";
import { GeneratorContainer, GeneratorDisplay, GeneratorInput } from "./styles"

function Generator() {
  const [number, setNumber] = useState(1);

  return (
    <GeneratorContainer>
        <GeneratorDisplay>
            <CistercianNumber value={number} />
        </GeneratorDisplay>
        <GeneratorInput
          type="number"
          min={1}
          max={9999}
          value={isNaN(number) ? "" : number}
          onChange={(v) => setNumber(parseInt(v.target.value))}
        />
    </GeneratorContainer>
  );
}

export default Generator;
