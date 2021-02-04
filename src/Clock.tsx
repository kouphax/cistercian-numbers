import React, { useEffect, useState } from "react";
import { CistercianNumber } from "./CistercianNumber";
import { TimeContainer, TimeDisplay, TimeDisplayStatic } from "./styles";

const currentDate = () => {
  const date = new Date();
  return {
    seconds: date.getSeconds(),
    minutes: date.getMinutes(),
    hours: date.getHours(),
    day: date.getDay(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
};

function Clock() {
  const [date, setDate] = useState(currentDate());
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(currentDate());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <TimeContainer>
        <TimeDisplay>
          <CistercianNumber value={date.day} />
        </TimeDisplay>
        <TimeDisplayStatic> / </TimeDisplayStatic>
        <TimeDisplay>
          <CistercianNumber value={date.month} />
        </TimeDisplay>
        <TimeDisplayStatic> / </TimeDisplayStatic>
        <TimeDisplay>
          <CistercianNumber value={date.year} />
        </TimeDisplay>
      </TimeContainer>
      <TimeContainer>
        <TimeDisplay>
          <CistercianNumber value={date.hours} />
        </TimeDisplay>
        <TimeDisplayStatic> : </TimeDisplayStatic>
        <TimeDisplay>
          <CistercianNumber value={date.minutes} />
        </TimeDisplay>
        <TimeDisplayStatic> : </TimeDisplayStatic>
        <TimeDisplay>
          <CistercianNumber value={date.seconds} />
        </TimeDisplay>
      </TimeContainer>
    </>
  );
}

export default Clock;
