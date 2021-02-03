import React, {useEffect, useState} from "react";
import { DrawyThing } from "./DrawyThing";

function Time() {
    const [seconds, setSeconds] = useState(new Date().getSeconds());
    const [minutes, setMinutes] = useState(new Date().getMinutes());
    const [hours, setHours] = useState(new Date().getHours());

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date()
            setSeconds(date.getSeconds());
            setMinutes(date.getMinutes());
            setHours(date.getHours());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

  return (
    <div className="Time">
      <div className="display">
        <DrawyThing data={hours} />
      </div> :
        <div className="display">
            <DrawyThing data={minutes} />
        </div> :
        <div className="display">
            <DrawyThing data={seconds} />
        </div>
    </div>
  );
}

export default Time;
