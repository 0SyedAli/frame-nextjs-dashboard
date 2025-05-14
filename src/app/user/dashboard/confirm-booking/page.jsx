"use client"
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6';
import { MdOutlinePayment } from "react-icons/md";
import { FaApplePay } from "react-icons/fa";

const ConfirmBooking = () => {
    const [active, setActive] = useState('clean');
    return (
        <div className="rate_us_dash w-100 h-100 pb-4">
            <h2>Confirm Booking</h2>
            <Image
                src="/images/emp_img1.png"
                width={120}
                height={120}
                alt=""
            />
            <div className="rud_content">
                <h5>USD</h5>
                <h3>Haircut & Styling</h3>
                <p>Thursday 01 September</p>
                <h6>16:30 - 17:30 (60 Minutes)</h6>
            </div>
            <Link href="more/payment-method" className="mt1r">
                <div className="d-flex align-items-center gap-3">
                    <span><MdOutlinePayment /></span>
                    <div>
                        <h5>Payment Method</h5>
                    </div>
                </div>
                <div className="red_arrow">
                    <span><FaArrowRightLong /></span>
                </div>
            </Link>
            <div className="cb_list">
                <div className='cbl_item'>
                    <h4>Deep tissue massage</h4>
                    <h4><span>$</span>88.00</h4>
                </div>
                <div className='cbl_item cbl_bold'>
                    <h4>Subtotal</h4>
                    <h4><span>$</span>88.00</h4>
                </div>
                <div className='cbl_item cbl_bold'>
                    <h4>Total to pay</h4>
                    <h4><span>$</span>88.00</h4>
                </div>
            </div>
            <Link href="more/payment-method" className="mt1r cb_mt1r">
                <div className="d-flex align-items-center gap-3">
                    <span><FaApplePay /></span>

                </div>
                <div className="red_arrow">
                    <span><FaArrowRightLong /></span>
                </div>
            </Link>
            <div className="rud_para">
                <p>By Booking, you acknowledge and accept <a href="#!">our terms & privacy policy</a></p>
            </div>
            <div className="text-center ea_btn">
                <button type="submit" className="theme-btn2">
                    Book & Pay <span>£ 88.00</span>
                </button>
            </div>
        </div>
    )
}

export default ConfirmBooking