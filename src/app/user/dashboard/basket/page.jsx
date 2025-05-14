import React from 'react'
import { IoCartSharp } from 'react-icons/io5'

const Basket = () => {
    return (
        <div className="service_dash s4_dash w-100">
            <div className="sd_top">
                <h2>Basket</h2>
                <div className="st_cart">
                    <h5>1</h5>
                    <span><IoCartSharp /></span>
                </div>
            </div>
            <form action="" className="s4_form">
                <div className="row">
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
                                <option value="" disabled>Please Choose Start Time</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Basket