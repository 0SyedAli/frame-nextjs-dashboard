import Image from "next/image";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { FaCheckCircle } from "react-icons/fa";
import { HiClipboardDocument } from "react-icons/hi2";

import { FaRegCalendarCheck } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

const Service = () => {
    return (
        <div className="service_dash w-100">
            <div className="sd_top">
                <h2>Bookings</h2>
                <span><HiOutlineBellAlert /></span>
            </div>
            <div className="sd_tabs_container">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="upcoming-tab" data-bs-toggle="tab" data-bs-target="#upcoming-tab-pane" type="button" role="tab" aria-controls="upcoming-tab-pane" aria-selected="true">Upcoming</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="past-tab" data-bs-toggle="tab" data-bs-target="#past-tab-pane" type="button" role="tab" aria-controls="past-tab-pane" aria-selected="false">Past</button>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="upcoming-tab-pane" role="tabpanel" aria-labelledby="upcoming-tab" tabindex="0">
                        <div className="upcoming_item">
                            <Image
                                src="/images/upcoming_img.png"
                                width={650}
                                height={450}
                                alt=""
                            />
                            <div className="ui_content">
                                <h4>No appointments yet? Time<br /> to treat yourself!</h4>
                                <div className="text-center">
                                    <button type="submit" className="theme-btn2 w-100">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="past-tab-pane" role="tabpanel" aria-labelledby="past-tab" tabindex="0">
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
                                        <li>
                                            <button type="submit" className="theme-btn2 w-100">
                                                Rebook
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
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
                                        <li>
                                            <button type="submit" className="theme-btn2 w-100">
                                                Rebook
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
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
                                        <li>
                                            <button type="submit" className="theme-btn2 w-100">
                                                Rebook
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
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
                                        <li>
                                            <button type="submit" className="theme-btn2 w-100">
                                                Rebook
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service