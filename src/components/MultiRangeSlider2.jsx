import { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";

export default function MultiRangeSlider24Hour({ onSubmit }) {
    const [minTime, setMinTime] = useState("12:00 AM");
    const [maxTime, setMaxTime] = useState("12:00 PM");

    // Convert 12-hour format to a numeric value for the slider
    const timeToNumber = (time) => {
        const [timePart, period] = time.split(" ");
        let [hours, minutes] = timePart.split(":").map(Number);

        if (period === "PM" && hours !== 12) hours += 12; // Convert PM to 24-hour format
        if (period === "AM" && hours === 12) hours = 0;   // Handle 12 AM case

        return hours + minutes / 60; // Convert hours and minutes into a decimal value
    };

    // Convert numeric value to 12-hour time with AM/PM
    const numberToTime = (value) => {
        const totalMinutes = Math.round(value * 60); // Convert slider value to total minutes
        const hours24 = Math.floor(totalMinutes / 60); // Extract hours (24-hour format)
        const minutes = totalMinutes % 60; // Extract minutes (0-59)

        const period = hours24 >= 12 ? "PM" : "AM"; // Determine AM/PM
        const hours12 = hours24 % 12 || 12; // Convert to 12-hour format (e.g., 0 becomes 12)

        return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
    };
    // Format the green-circle values for the slider
    const formatTickValue = (value) => {
        return numberToTime(value);
    };

    return (
        <div className="multi-range-slider-container">
            <div className="time-display d-flex align-items-center justify-content-between">
                <span>Start Time: {numberToTime(timeToNumber(minTime))}</span>
                <span>End Time: {numberToTime(timeToNumber(maxTime))}</span>
            </div>
            <MultiRangeSlider
                baseClassName="multi-range-slider-black"
                min={0}
                max={23.99} // 23:59 in decimal form
                step={0.0167} // ~1 minute (1/60 = 0.0167)
                minValue={timeToNumber(minTime)}
                maxValue={timeToNumber(maxTime)}
                onInput={(e) => {
                    setMinTime(numberToTime(e.minValue)); // Update start time
                    setMaxTime(numberToTime(e.maxValue)); // Update end time
                }}
                label={true} // Enable labels
                labelFormatter={numberToTime} // Format values on the thumb
            />
            <div className="mid_label2">
                <span>12:00 (AM)</span>
                <span>12:00 (PM)</span>
                <span>11:59 (PM)</span>
            </div>
        </div>
    );
}
