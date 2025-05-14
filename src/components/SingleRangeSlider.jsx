"use client";

import { useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const SingleRangeSlider = () => {
    const [value, setValue] = useState([1, 5]);

    const handleInput = (newValue) => {
        setValue(newValue);
    };

    return (
        <div className="range-slider-container" style={{ position: "relative", width: "200px" }}>
            {/* Label for the active thumb */}
            <div
                className="slider-label"
                style={{
                    position: "absolute",
                    left: `${(value[1] / 2) * 44}%`, // Dynamically position the label
                    transform: "translateX(-75%)",
                    top: "30px", // Adjust the vertical position
                    color: "#777777",
                    padding: "2px 5px",
                    borderRadius: "5px",
                    fontSize: "20px",
                    minWidth: "90px",
                    maxWidth: '150px'
                }}
            >
                {value[1]+ " " +'Miles'}
            </div>

            {/* Range Slider */}
            <RangeSlider
                className="single-thumb"
                defaultValue={[1, 1]} // Start range from 1
                value={value}
                thumbsDisabled={[true, false]} // First thumb disabled
                rangeSlideDisabled={true} // Range sliding disabled
                min={1} // Minimum value is 1
                max={10} // Maximum value is 10
                onInput={handleInput} // Update state on slider input
            />
        </div>
    );
};

export default SingleRangeSlider;