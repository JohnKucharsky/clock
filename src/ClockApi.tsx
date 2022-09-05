import { useEffect, useState } from "react";

interface timeProps {
  abbreviation: string;
  client_ip: string;
  datetime: string;
  day_of_week: number;
  day_of_year: number;
  dst: boolean;
  dst_from: number | null;
  dst_offset: number;
  dst_until: number | null;
  raw_offset: number;
  timezone: string;
  unixtime: number;
  utc_datetime: string;
  utc_offset: string;
  week_number: number;
}

function ClockApi() {
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

  useEffect(() => {
    let clockInterval = setInterval(fetchTime, 1000);
    function fetchTime() {
      const request = new Request(
        "https://worldtimeapi.org/api/timezone/Europe/Moscow",
        {
          method: "GET",
        },
      );
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error("Something went wrong on API server!");
          }
        })
        .then((response: timeProps) => {
          const d = new Date(response.datetime);
          setTime({
            hours: d.getHours(),
            minutes: d.getMinutes(),
            seconds: d.getSeconds(),
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      clearInterval(clockInterval);
    };
  });

  return (
    <div className={"clock"}>
      <h3>Clock Api</h3>
      <div className={"analog-clock"}>
        <div className={"dial seconds"} style={secondsStyle} />
        <div className={"dial minutes"} style={minutesStyle} />
        <div className={"dial hours"} style={hoursStyle} />
      </div>
      <div className={"digital-clock"}>
        {time.hours}:{time.minutes < 10 ? "0" + time.minutes : time.minutes}:
        {time.seconds < 10 ? "0" + time.seconds : time.seconds}
      </div>
    </div>
  );
}

export default ClockApi;
