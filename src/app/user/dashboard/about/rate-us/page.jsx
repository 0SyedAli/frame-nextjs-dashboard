"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";

const RateUs = () => {
    const [active, setActive] = useState('clean');
    return (
        <div className="rate_us_dash w-100">
            <h2>Rate This Stylist</h2>
            <Image
                src="/images/emp_img1.png"
                width={120}
                height={120}
                alt=""
            />
            <div className="rud_content">
                <h5>Salena</h5>
                <h3>Haircut & Styling</h3>
                <p>Thursday 01 September</p>
                <h6>16:30 - 17:30 (60 Minutes)</h6>
            </div>
            <form action="">
                <div className="rud_content2">
                    <h5>Rate Your Experience</h5>
                    <div className='stars'>
                        <span><FaStar /></span>
                        <span><FaStar /></span>
                        <span><FaStar /></span>
                        <span><FaStar /></span>
                        <span><FaStar /></span>
                    </div>
                </div>
                <div className="rud_content3">
                    <button type='button' className={`rc3 ${active === 'clean' ? 'active' : ''}`}
                        onClick={() => setActive('clean')}>Clean</button>

                    <button type='button' className={`rc3 ${active === 'professional' ? 'active' : ''}`}
                        onClick={() => setActive('professional')}>Professional</button>

                    <button type='button' className={`rc3 ${active === 'bestService' ? 'active' : ''}`}
                        onClick={() => setActive('bestService')}>Best Service</button>

                    <button type='button' className={`rc3 ${active === 'kind' ? 'active' : ''}`}
                        onClick={() => setActive('kind')}>Kind</button>
                </div>
                <div className="rud_content4">
                    <textarea name="" placeholder="How was your overall experience?" rows="7"></textarea>
                </div>
                <div className='text-center'>
                    <button className="theme-btn2">
                        Done!
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RateUs