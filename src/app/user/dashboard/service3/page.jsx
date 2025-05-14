import Image from "next/image"
import { FaHeart, FaShoppingCart, FaStar, FaCheckCircle } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { CiClock2 } from "react-icons/ci";
import { TbRoad } from "react-icons/tb";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { FaRegCircleDot } from "react-icons/fa6";
import { MdElectricBolt } from "react-icons/md";

const Setting3 = () => {
    return (
        <div className="more_dash service3_dash w-100 h-100">
            <div className="md_top">
                <Image
                    src="/images/md_banner.png"
                    width={1012}
                    height={334}
                    alt=""
                />
                <div className="md_top_icon">
                    <span><FaHeart /></span>
                    <span><FaShoppingCart /></span>
                </div>
            </div>
            <div className="md_inner">
                <div className="md_heading">
                    <h3>Jazy Dewo</h3>
                </div>
                <div className="sd_tabs_container">
                    <div className="more_tabs1">
                        <div className="mt1_redirects">
                            <Link href="#!" className="mt1r">
                                <div className="d-flex align-items-center gap-4">
                                    <span><FaRegClock /></span>
                                    <div>
                                        <h5>Options</h5>
                                        <h4>60 Minutes</h4>
                                    </div>
                                </div>
                                {/* <div className="red_arrow">
                                    <span><FaArrowRightLong /></span>
                                </div> */}
                            </Link>
                            <Link href="#!" className="mt1r">
                                <div className="d-flex align-items-center gap-4">
                                    <span><FaRegCircleDot /></span>
                                    <div>
                                        <h5>You’ve Got</h5>
                                        <h4>Stiff, sore muscle</h4>
                                    </div>
                                </div>
                                {/* <div className="red_arrow">
                                    <span><FaArrowRightLong /></span>
                                </div> */}
                            </Link>
                            <Link href="#!" className="mt1r">
                                <div className="d-flex align-items-center gap-4">
                                    <span><MdElectricBolt /></span>
                                    <div>
                                        <h5>Pressure</h5>
                                        <h4>Strong</h4>
                                    </div>
                                </div>
                                {/* <div className="red_arrow">
                                    <span><FaArrowRightLong /></span>
                                </div> */}
                            </Link>
                        </div>
                        <div className="s3_more_tabs">
                            <h4>Benefits</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <h4>Our recommendation</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <h4>During your treatment</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            <h4>Questions before your treatment? </h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>
                        <div className="text-center ea_btn mt-3">
                            <button type="submit" className="theme-btn2">
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Setting3