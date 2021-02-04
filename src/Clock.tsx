import React, {useEffect, useState} from "react";
import {CistercianNumber} from "./CistercianNumber";

function Clock() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [day, setDay] = useState(0);
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setSeconds(date.getSeconds());
      setMinutes(date.getMinutes());
      setHours(date.getHours());
      setDay(date.getDay())
        setMonth(date.getMonth() + 1)
        setYear(date.getFullYear())
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (<>
    <div className="Time">
      <div className="display">
        <CistercianNumber value={day} />
      </div>
      <div className="display static"> - </div>
      <div className="display">
        <CistercianNumber value={month} />
      </div>
      <div className="display static"> - </div>
      <div className="display">
        <CistercianNumber value={year} />
      </div>
    </div>
    <div className="Time">
        <div className="display">
            <CistercianNumber value={hours} />
        </div>{" "}
        <div className="display static"> : </div>
        <div className="display">
            <CistercianNumber value={minutes} />
        </div>
        <div className="display static"> : </div>
        <div className="display">
            <CistercianNumber value={seconds} />
        </div>
    </div>
      </>
  );
}

export default Clock;
