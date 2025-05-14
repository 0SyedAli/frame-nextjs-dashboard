import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";

const Service = () => {
    return (
        <div className="service_dash s4_dash w-100">
            <div className="sd_top">
                <h2>Choose Date & Time</h2>
                <div className="st_cart">
                    <h5>1</h5>
                    <span><IoCartSharp /></span>
                </div>
            </div>
            <div className="s4_appointment">
                <div className="s4a">
                    <label htmlFor="">Date: </label>
                    <input type="date" />
                </div>
                <div className="s4a">
                    <label htmlFor="">Time: </label>
                    <input type="time" />
                </div>
            </div>
            <div className="sd_tabs_container">
                <div className="row mb-4">
                    <div className="col-3">
                        <div className="salon_card">
                            <Image
                                src="/images/sc1.svg"
                                width={350}
                                height={150}
                                alt=""
                            />
                            <div className="sc_content">
                                <h4>Ray O’Sun</h4>
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <h5>106 Reviews</h5>
                                    <h5><span><FaStar /></span>4.98</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="salon_card">
                            <Image
                                src="/images/sc1.svg"
                                width={350}
                                height={150}
                                alt=""
                            />
                            <div className="sc_content">
                                <h4>Ray O’Sun</h4>
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <h5>106 Reviews</h5>
                                    <h5><span><FaStar /></span>4.98</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="salon_card">
                            <Image
                                src="/images/sc1.svg"
                                width={350}
                                height={150}
                                alt=""
                            />
                            <div className="sc_content">
                                <h4>Ray O’Sun</h4>
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <h5>106 Reviews</h5>
                                    <h5><span><FaStar /></span>4.98</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="salon_card">
                            <Image
                                src="/images/sc1.svg"
                                width={350}
                                height={150}
                                alt=""
                            />
                            <div className="sc_content">
                                <h4>Ray O’Sun</h4>
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <h5>106 Reviews</h5>
                                    <h5><span><FaStar /></span>4.98</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <div className="salon_card">
                            <Image
                                src="/images/sc1.svg"
                                width={350}
                                height={150}
                                alt=""
                            />
                            <div className="sc_content">
                                <h4>Ray O’Sun</h4>
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <h5>106 Reviews</h5>
                                    <h5><span><FaStar /></span>4.98</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="salon_card">
                            <Image
                                src="/images/sc1.svg"
                                width={350}
                                height={150}
                                alt=""
                            />
                            <div className="sc_content">
                                <h4>Ray O’Sun</h4>
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <h5>106 Reviews</h5>
                                    <h5><span><FaStar /></span>4.98</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="salon_card">
                            <Image
                                src="/images/sc1.svg"
                                width={350}
                                height={150}
                                alt=""
                            />
                            <div className="sc_content">
                                <h4>Ray O’Sun</h4>
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <h5>106 Reviews</h5>
                                    <h5><span><FaStar /></span>4.98</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="salon_card">
                            <Image
                                src="/images/sc1.svg"
                                width={350}
                                height={150}
                                alt=""
                            />
                            <div className="sc_content">
                                <h4>Ray O’Sun</h4>
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <h5>106 Reviews</h5>
                                    <h5><span><FaStar /></span>4.98</h5>
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