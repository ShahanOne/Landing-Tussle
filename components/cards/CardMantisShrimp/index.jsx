import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import styles from "./index.module.scss";
import knownTimezones from "../../../assets/timezones";
import importantTimezones from "../../../assets/importantTimezones";

const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CardMantisShrimp = ({
  eventLink,
  fullDate,
  title,
  className,
  guestsData,
  remainingTimeText,
  location,
  remainingSpots,
  priceText,
  schedules,
  slug,
  setDateParams,
}) => {
  // const [scheduleId, setScheduleId] = useState(schedules[0]._id);
  return (
    <div
      className={
        className
          ? `${className} ${styles.mainContainer}`
          : styles.mainContainer
      }
    >
      <div className={styles.topContainer}>
        <h3>{title}</h3>
      </div>
      <div className={styles.middleContainer}>
        <div className={styles.twoPartDescription}>
          <p>Location</p>
          <p>{location}</p>
        </div>
        <div className={styles.twoPartDescription}>
          <p>Seats remaining</p>
          <p>{remainingSpots}</p>
        </div>
        <div className={styles.twoPartDescription}>
          <p>Price</p>
          <p>{priceText}</p>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <p className={styles.startsin}>
          <span className="Typography-Body16-Regular">Starts in&nbsp;</span>
          <span className="Typography-Body16-Bold Typography-fruitpunch">
            {remainingTimeText}
          </span>
        </p>
        <FormControl className={styles.textField}>
          {/* <InputLabel id="select-slot">
          Select your slot
        </InputLabel> */}
          <Select
            className={styles.select}
            labelId="select-slot"
            // value={scheduleId}
            // onChange={(e) => {
            //   setScheduleId(e.target.value);
            //   const schedule = schedules.find((s) => s._id === e.target.value);
            //   const sd = schedule
            //     ? new Date(schedule.startDate)
            //     : new Date(eventDetails.start_date);
            //   const ed = schedule
            //     ? new Date(schedule.endDate)
            //     : new Date(eventDetails.end_date);
            //   const startweek = weeks[sd.getDay()];
            //   const startmonth = months[sd.getMonth()];
            //   const startdate = sd.getDate();
            //   setDateParams({
            //     month: startmonth,
            //     week: startweek,
            //     date: startdate,
            //   });
            // }}
          >
            {/* {schedules.map((schedule, index) => {
              const om = -new Date().getTimezoneOffset();
              const offsetMinutes =
                (!importantTimezones.find((tz) => tz.offset === om) ||
                  slug ===
                    "labor--birth-preparation-workshop-with-bharti-goel-5kpycssfv7boxlu5yvuap") &&
                schedule &&
                schedule.timezone
                  ? knownTimezones.find(
                      (tz) => tz.abbreviation === schedule.timezone
                    ).offset
                  : null;
              let sd = schedule
                ? new Date(schedule.startDate)
                : new Date(eventDetails.start_date);
              let ed = schedule
                ? new Date(schedule.endDate)
                : new Date(eventDetails.end_date);
              if (offsetMinutes) {
                const currOffset = sd.getTimezoneOffset();
                sd -= -(currOffset + offsetMinutes) * 60 * 1000;
                ed -= -(currOffset + offsetMinutes) * 60 * 1000;
                sd = new Date(sd);
                ed = new Date(ed);
              }
              const startweek = weeks[sd.getDay()];
              const startmonth = months[sd.getMonth()];
              const startdate = sd.getDate();
              const endweek = weeks[ed.getDay()];
              const endmonth = months[ed.getMonth()];
              const enddate = ed.getDate();
              let starthours = sd.getHours();
              const startampm = starthours >= 12 ? "PM" : "AM";
              starthours %= 12;
              starthours = starthours === 0 ? 12 : starthours;
              let startminutes = sd.getMinutes();
              startminutes =
                startminutes < 10 ? `0${startminutes}` : startminutes;
              let endhours = ed.getHours();
              const endampm = endhours >= 12 ? "PM" : "AM";
              endhours %= 12;
              endhours = endhours === 0 ? 12 : endhours;
              let endminutes = ed.getMinutes();
              endminutes = endminutes < 10 ? `0${endminutes}` : endminutes;
              const offset = -sd.getTimezoneOffset();
              let offsetText = `GMT${offset < 0 ? "-" : "+"}${Math.floor(
                Math.abs(offset) / 60
              )}:${Math.abs(offset) % 60}`;
              offsetText =
                ((!importantTimezones.find((tz) => tz.offset === om) ||
                  slug ===
                    "labor--birth-preparation-workshop-with-bharti-goel-5kpycssfv7boxlu5yvuap") &&
                  schedule &&
                  schedule.timezone) ||
                importantTimezones.find((tz) => tz.offset === om)
                  .abbreviation ||
                offsetText;
              const slotString = `${startweek}, ${startdate} ${startmonth} ${starthours}:${startminutes}${startampm} to ${endhours}:${endminutes}${endampm} ${offsetText}`;
              return (
                <MenuItem
                  key={schedule._id}
                  value={schedule._id}
                  name={schedule._id}
                >
                  {slotString}
                </MenuItem>
              );
            })} */}
          </Select>
        </FormControl>
        <button
          className={`Typography-Body18-Semibold ${styles.bottomButton}`}
          type="button"
          // onClick={() => {
          //   if (!scheduleId) {
          //     alert("select a slot");
          //     return;
          //   }
          //   window.location = `${process.env.NEXT_PUBLIC_REACT_APP_URL}event/onboarding/${slug}?scheduleId=${scheduleId}`;
          // }}
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default CardMantisShrimp;
