"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Signup = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  // Static list of cities
  const cities = ["City1", "City2", "City3"];

  useEffect(() => {
    // Fetch country codes
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryList = data.map((country) => ({
          name: country.name.common,
          code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ""),
        }));
        setCountries(countryList);
      })
      .catch((error) => console.error("Error fetching country data:", error));
  }, []);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <div className="content align-self-center mw-600">
      <div className="auth_container mw-600">
        <div className="auth_head">
          <h2>Sign Up</h2>
          <p>Get started in minutes and transform your business</p>
        </div>
        <form action="#!">
          <div className="row">
            <div className="col-6">
              <input type="text" placeholder="Username" />
            </div>
            <div className="col-6">
              <input type="text" placeholder="Last Name" />
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <select onChange={handleCountryChange}>
                <option value="">+92</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-10">
              <input type="tel" placeholder="Phone number" />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <select>
                <option value="">Select City</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='text-center'>
            <Link href="pricing" className="theme-btn2">Sign up</Link>
            <div className='register_link'>
              <h5>Already have an account?<Link href="signin">Signin</Link></h5>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
