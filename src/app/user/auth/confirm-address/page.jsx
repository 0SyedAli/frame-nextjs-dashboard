"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

const ConfirmAddress = () => {
    const [countries, setCountries] = useState([]);
    const [countriesName, setCountriesName] = useState([]);
    const [selectedCountryName, setSelectedCountryName] = useState("UK");



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
        <div className="content w-100 p-0 align-items-start">
            <div className="auth_container bussiness confirm_address gap-4">
                <div className="auth_head">
                    <h2>Confirm Address</h2>
                </div>
                <div className='w-100 '>
                    <div className="ca_map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1529.5774774280023!2d-105.01570220665658!3d39.937923473807935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876c757667ffdd3b%3A0x5991ac88edb59137!2s13238%20Alcott%20Cir%2C%20Broomfield%2C%20CO%2080020%2C%20USA!5e0!3m2!1sen!2s!4v1746483101139!5m2!1sen!2s" width="600" height="220" style={{ border: "1px", width: "100%" }} loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <form className="next_confirm mt-4">
                        <h3>Address Details</h3>
                        <input type="text" placeholder="Street & Flat No (House / Flat / Room Number)" />
                        <input type="text" placeholder="Street" />
                        <input type="text" placeholder="Postcode" />
                        <select onChange={(e) => setSelectedCountryName(e.target.value)}>
                            <option value="Poland">Poland</option>
                            {countriesName.map((country) => (
                                <option key={`${country.name}-${country.code}`} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        <h3>Address Type</h3>
                        <input type="text" placeholder="Home" />
                        <input type="text" placeholder="Custom Address" />
                        <div className='text-center mt-3'>
                            <button type="submit" className="theme-btn2 w-100">
                                {/* {loading ? <Spinner /> : "Sign Up"} */}
                                Save Address
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default ConfirmAddress;

