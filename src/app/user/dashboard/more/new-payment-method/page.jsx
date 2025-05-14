"use client"
import Image from "next/image";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { FaCheckCircle } from "react-icons/fa";
import { HiClipboardDocument } from "react-icons/hi2";

import { FaRegCalendarCheck } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
const Service = () => {
    const [expiryDate, setExpiryDate] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [countries, setCountries] = useState([]);
    const [countriesName, setCountriesName] = useState([]);
    const [selectedCountryName, setSelectedCountryName] = useState("UK");

    const handleExpiryDateChange = (e) => {
        const value = e.target.value.replace(/[^0-9/]/g, "");
        if (value.length <= 5) {
            const formattedValue = value
                .replace(/^([0-9]{2})([0-9])/, "$1/$2")
                .replace(/^([0-9]{2}\/)([0-9]{2}).*/, "$1$2");
            setExpiryDate(formattedValue);
        }
    };

    const handleCardNumberChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        if (value.length <= 16) {
            const formattedValue = value
                .replace(/(.{4})/g, "$1 ")
                .trim();
            setCardNumber(formattedValue);
        }
    };


    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json())
            .then((data) => {
                const countryList = data.map((country) => ({
                    name: country.name.common,
                    code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ""),
                }));

                // Remove duplicates
                const uniqueCountriesName = Array.from(new Map(countryList.map(c => [c.code, c])).values());

                setCountriesName(uniqueCountriesName);
            })
            .catch((error) => console.error("Error fetching country data:", error));
    }, []);

    return (
        <div className="service_dash setting_dash w-100">
            <div className="sd_top">
                <h2>New Payment Method</h2>
                <span><HiOutlineBellAlert /></span>
            </div>
            <div className="sd_tabs_container">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="upcoming-tab" data-bs-toggle="tab" data-bs-target="#upcoming-tab-pane" type="button" role="tab" aria-controls="upcoming-tab-pane" aria-selected="true">New Card</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="past-tab" data-bs-toggle="tab" data-bs-target="#past-tab-pane" type="button" role="tab" aria-controls="past-tab-pane" aria-selected="false">Others</button>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="upcoming-tab-pane" role="tabpanel" aria-labelledby="upcoming-tab" tabIndex="0">
                        <div className="pm_detail">
                            <form>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="fullName" placeholder="Enter your full name" required />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cardNumber"
                                        placeholder="1234 5678 9101 1121"
                                        maxLength={19}
                                        value={cardNumber}
                                        onChange={handleCardNumberChange}
                                        required
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="expiryDate"
                                            placeholder="MM/YY"
                                            maxLength={5}
                                            value={expiryDate}
                                            onChange={handleExpiryDateChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input type="password" className="form-control" id="cvv" placeholder="CVV/CVC" maxLength={3} required />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <select onChange={(e) => setSelectedCountryName(e.target.value)}>
                                        <option disabled selected>Select Country</option>
                                        {countriesName.map((country) => (
                                            <option key={`${country.name}-${country.code}`} value={country.name}>
                                                {country.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <input type="text" className="form-control" id="postcode" placeholder="Enter your postcode" required />
                                </div>

                                <div className="text-center ea_btn">
                                    <button type="submit" className="theme-btn2">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="past-tab-pane" role="tabpanel" aria-labelledby="past-tab" tabIndex="0">
                        <div className="past_item row g-4">
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service