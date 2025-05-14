import Image from "next/image";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { FaCheckCircle } from "react-icons/fa";
import { HiClipboardDocument } from "react-icons/hi2";

import { FaRegCalendarCheck } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

const Service = () => {
    return (
        <div className="service_dash fav_dash w-100">
            <div className="sd_top">
                <h2>Favorites</h2>
                <span><HiOutlineBellAlert /></span>
            </div>
            <div className="sd_tabs_container">
                {/* <div className="upcoming_item">
                    <Image
                        src="/images/upcoming_img.png"
                        width={650}
                        height={450}
                        alt=""
                    />
                    <div className="ui_content mt-5" style={{ width: '350px', textAlign: 'center' }}>
                        <h4 className="p-0">Favorites</h4>
                        <p>You haven't picked any favorites - tap the heart on your go-to salons and stylist's profile!</p>
                    </div>
                </div> */}
                <div className="row g-5 ">
                    <div className="col-6">
                        <div className="service_user_card">
                            <Image
                                src="/images/fav_img1.png"
                                width={445}
                                height={240}
                                alt=""
                            />
                            <div className="suc">
                                <h4>Haircut</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="service_user_card">
                            <Image
                                src="/images/fav_img1.png"
                                width={445}
                                height={240}
                                alt=""
                            />
                            <div className="suc">
                                <h4>Hair Treatments</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="service_user_card">
                            <Image
                                src="/images/fav_img1.png"
                                width={445}
                                height={240}
                                alt=""
                            />
                            <div className="suc">
                                <h4>Hair Treatments</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="service_user_card">
                            <Image
                                src="/images/fav_img1.png"
                                width={445}
                                height={240}
                                alt=""
                            />
                            <div className="suc">
                                <h4>Hair Treatments</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service