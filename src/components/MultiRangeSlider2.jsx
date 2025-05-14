import { useState, useEffect, useCallback } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import debounce from "lodash/debounce";

export default function MultiRangeSlider24Hour({ onSubmit }) {
    const [minTime, setMinTime] = useState("12:00 AM");
    const [maxTime, setMaxTime] = useState("12:00 PM");

    const timeToNumber = (time) => {
        const [timePart, period] = time.split(" ");
        let [hours, minutes] = timePart.split(":").map(Number);
        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;
        return hours + minutes / 60;
    };

    const numberToTime = (value) => {
        const totalMinutes = Math.round(value * 60);
        const hours24 = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const period = hours24 >= 12 ? "PM" : "AM";
        const hours12 = hours24 % 12 || 12;
        return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
    };

    // Debounced version of onSubmit
    const debouncedSubmit = useCallback(
        debounce((openingTime, closingTime) => {
            onSubmit({ openingTime, closingTime });
        }, 300), // 300ms delay
        []
    );

    const handleInput = (e) => {
        const updatedMinTime = numberToTime(e.minValue);
        const updatedMaxTime = numberToTime(e.maxValue);
        setMinTime(updatedMinTime);
        setMaxTime(updatedMaxTime);
        debouncedSubmit(updatedMinTime, updatedMaxTime);
    };

    return (
        <div className="multi-range-slider-container">
            <div className="time-display d-flex align-items-center justify-content-between">
                <span>Start Time: {minTime}</span>
                <span>End Time: {maxTime}</span>
            </div>
            <MultiRangeSlider
                baseClassName="multi-range-slider-black"
                min={0}
                max={23.99}
                step={0.0167}
                minValue={timeToNumber(minTime)}
                maxValue={timeToNumber(maxTime)}
                onInput={handleInput}
                label={true}
                labelFormatter={numberToTime}
            />
            <div className="mid_label2">
                <span>12:00 (AM)</span>
                <span>12:00 (PM)</span>
                <span>11:59 (PM)</span>
            </div>
        </div>
    );
}
