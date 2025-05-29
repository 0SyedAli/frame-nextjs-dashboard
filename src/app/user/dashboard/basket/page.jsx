import React from 'react'
import { IoCartSharp } from 'react-icons/io5'
import { RxCross2 } from "react-icons/rx";
import { FaDollarSign } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";

import Image from 'next/image';

const Basket = () => {
    return (
        <div className="service_dash s4_dash s5_dash w-100">
            <div className="sd_top">
                <h2>Basket</h2>
                <div className="st_cart">
                    <h5>1</h5>
                    <span><IoCartSharp /></span>
                </div>
            </div>
            <form action="" className="s4_form">
                <div className="row" style={{ rowGap: "60px" }}>
                    <div className="col-6">
                        <div className="dt_select_location">
                            <label htmlFor="select_location" className="select_location">Book At</label>
                            <select name="" id="select_location">
                                <option value="Lakewood, California">Lakewood, California</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="dt_select_location">
                            <label htmlFor="select_location" className="select_location">Start At</label>
                            <select name="" id="select_location">
                                <option value="">Please Choose Start Time</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="dt_select_location">
                            <label htmlFor="select_location" className="select_location">Total Duration</label>
                            <input type="text" readOnly placeholder='60 Minutes' />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="dt_select_location">
                            <label htmlFor="select_location" className="select_location">Appointment With</label>
                            <select name="" id="select_location">
                                <option value="">Your Pro</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="dt_cart">
                            <div className='dt_cart_item'>
                                <h5>Service 1</h5>
                                <button className='dtc_cross'><RxCross2 /></button>
                            </div>
                            <div className='dt_cart_item mt-4'>
                                <div className="dtci">
                                    <span>
                                        <Image
                                            src="/images/cart_user.svg"
                                            width={20}
                                            height={20}
                                            alt=''
                                        />
                                    </span>
                                    <h4>Haircut & Styling</h4>
                                </div>
                                <div className="dtci gap-1">
                                    <span>
                                        <FaDollarSign />
                                    </span>
                                    <h4>10 <span>USD</span></h4>
                                </div>
                            </div>
                            <div className='dt_cart_item mt-4'>
                                <div className="dtci gap-3 timing">
                                    <span>
                                        <BiTimeFive />
                                    </span>
                                    <h4 className='active'>60 Minutes</h4>
                                    <h4>60 Minutes Recommended</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="dt_cart">
                            <div className='dt_cart_item'>
                                <h5>Service 2</h5>
                                <button className='dtc_cross'><RxCross2 /></button>
                            </div>
                            <div className='dt_cart_item mt-4'>
                                <div className="dtci">
                                    <span>
                                        <Image
                                            src="/images/cart_user.svg"
                                            width={20}
                                            height={20}
                                            alt=''
                                        />
                                    </span>
                                    <h4>Haircut & Styling</h4>
                                </div>
                                <div className="dtci gap-1">
                                    <span>
                                        <FaDollarSign />
                                    </span>
                                    <h4>10 <span>USD</span></h4>
                                </div>
                            </div>
                            <div className='dt_cart_item mt-4'>
                                <div className="dtci gap-3 timing">
                                    <span>
                                        <BiTimeFive />
                                    </span>
                                    <h4 className='active'>60 Minutes</h4>
                                    <h4>60 Minutes Recommended</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="text-center mt-5">
                            <button type="submit" className="theme-btn2 ">
                                Continue To Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Basket