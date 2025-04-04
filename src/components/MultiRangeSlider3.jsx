import { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";

export default function MultiRangeSlider3({ onSubmit }) {
  const [minTime, setMinTime] = useState("08:00");
  const [maxTime, setMaxTime] = useState("20:00");

  const timeToNumber = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours + minutes / 60;
  };

  const numberToTime = (value) => {
    const hours = Math.floor(value).toString().padStart(2, "0");
    const minutes = Math.round((value % 1) * 60).toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="multi-range-slider-container">
      <MultiRangeSlider
        baseClassName="multi-range-slider-black"
        min={0}
        max={24}
        step={0.25} // 15-minute increments
        minValue={timeToNumber(minTime)}
        maxValue={timeToNumber(maxTime)}
        onInput={(e) => {
          const updatedMinTime = numberToTime(e.minValue);
          const updatedMaxTime = numberToTime(e.maxValue);
          setMinTime(updatedMinTime);
          setMaxTime(updatedMaxTime);
          onSubmit({ openingTime: updatedMinTime, closingTime: updatedMaxTime }); // Notify parent
        }}
      />
    </div>
  );
}