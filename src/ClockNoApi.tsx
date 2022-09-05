import { useEffect, useState } from "react";
function ClockNoApi() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const secondsStyle = {
    transform: `rotate(${time.seconds * 6}deg)`,
  };
  const minutesStyle = {
    transform: `rotate(${time.minutes * 6}deg)`,
  };
  const hoursStyle = {
    transform: `rotate(${time.hours * 30}deg)`,
  };

  function handleDate() {
    const date = new Date();
    date.setHours(date.getHours());
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    setTime({ hours, minutes, seconds });
  }

  useEffect(() => {
    let clockInterval = setInterval(handleDate, 1000);

    // Specify how to clean up after this effect:
    return function cleanup() {
      clearInterval(clockInterval);
    };
  });

  return (
    <div className={"clock"}>
      <h3>Clock</h3>
      <div className={"analog-clock"}>
        <div className={"dial seconds"} style={secondsStyle} />
        <div className={"dial minutes"} style={minutesStyle} />
        <div className={"dial hours"} style={hoursStyle} />
      </div>
      <div className={"digital-clock"}>
        {time.hours}:{time.minutes}:{time.seconds}
      </div>
    </div>
  );
}

export default ClockNoApi;
