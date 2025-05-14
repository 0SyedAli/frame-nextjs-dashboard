import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { HiClipboardDocument } from "react-icons/hi2";

import { FaRegCalendarCheck } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

const ReceiptDetail = () => {
    return (
        <div className="service_dash receipt_detail w-100 h-100">
            <div>
                <div className="sd_top">
                    <h2>Receipt Details</h2>
                </div>
                <div className="sd_tabs_container px-5">
                    <div className="past_item row g-4">
                        <div className="col-6">
                            <div className="pi_card">
                                <ul>
                                    <li>
                                        <span><FaCheckCircle /></span>
                                        <div>
                                            <h5>Booking ID</h5>
                                            <h6>#123456789</h6>
                                        </div>
                                    </li>
                                    <li>
                                        <span><FaRegCalendarCheck /></span>
                                        <div>
                                            <h5>Booked On</h5>
                                            <h6>20-Apr-2022|12:00PM</h6>
                                        </div>
                                    </li>
                                    <li>
                                        <span><FaUserDoctor /></span>
                                        <div>
                                            <h5>Practitioners</h5>
                                            <h6>Ray O’Sun</h6>
                                        </div>
                                    </li>
                                    <li>
                                        <span><Image
                                            src="/images/dart_board_icon.png"
                                            width={19}
                                            height={20}
                                            alt=""
                                        /></span>
                                        <div>
                                            <h5>Status</h5>
                                            <h6>Active</h6>
                                        </div>
                                    </li>
                                    <li>
                                        <span><HiClipboardDocument /></span>
                                        <div>
                                            <h5>Total Amount</h5>
                                            <h6>$120</h6>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="pi_card pi_card2">
                                <h4>Payment Options</h4>
                                <div className="pc2_item">
                                    <div className="pc2">
                                        <Image
                                            src="/images/cart1.png"
                                            width={68}
                                            height={41}
                                            alt=""
                                        />
                                        <div>
                                            <h5>Mastercard</h5>
                                            <h5>9432 **** **** ****</h5>
                                        </div>
                                    </div>
                                    <span>
                                        <Image
                                            src="/images/check_circle1.png"
                                            width={33}
                                            height={33}
                                            alt=""
                                        />
                                    </span>
                                </div>
                                <div className="pc3_item">
                                    <h5>Cardholder Name</h5>
                                    <h6>Mariah Johana</h6>
                                </div>
                                <div className="pc4_item">
                                    <div className="d-flex justify-content-between">
                                        <h6>Subtotal</h6>
                                        <h6>$251</h6>
                                    </div>
                                    <div className="d-flex justify-content-between my-3">
                                        <h6>Discount</h6>
                                        <h6>$17</h6>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h6>Tax</h6>
                                        <h6>$0</h6>
                                    </div>
                                </div>
                                <div className="pc5_item">
                                    <div className="d-flex justify-content-between">
                                        <h6><strong>Total Price</strong></h6>
                                        <h6><strong>$249</strong></h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <button type="submit" className="theme-btn2">
                    Confirm Booking
                </button>
            </div>
        </div>
    )
}

export default ReceiptDetail