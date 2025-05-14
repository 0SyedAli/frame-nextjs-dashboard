import { BiSolidMessageRounded } from "react-icons/bi";
import { IoIosCard } from "react-icons/io";
import { IoIosChatbubbles } from "react-icons/io";
import { FaLanguage } from "react-icons/fa6";
import { FaRegQuestionCircle } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const More = () => {
    return (
        <div className="more_dash setting_dash w-100 h-100 py-5">
            <div className="sd_top py-0">
                <h3>About Us</h3>
                <span><FaRegQuestionCircle /></span>
            </div>
            <div className="mt1_redirects mt5_redirects p-0">
                <Link href="about/about-app" className="mt1r">
                    <div className="d-flex align-items-center gap-3">
                        <span><RiUserSettingsFill /></span>
                        <div>
                            <h5>About</h5>
                        </div>
                    </div>
                    <div className="red_arrow">
                        <span><FaArrowRightLong /></span>
                    </div>
                </Link>
                <Link href="about/privacy-policy" className="mt1r">
                    <div className="d-flex align-items-center gap-3">
                        <span><RiUserSettingsFill /></span>
                        <div>
                            <h5>Privacy Policy</h5>
                        </div>
                    </div>
                    <div className="red_arrow">
                        <span><FaArrowRightLong /></span>
                    </div>
                </Link>
                <Link href="about/terms" className="mt1r">
                    <div className="d-flex align-items-center gap-3">
                        <span><BiSolidMessageRounded /></span>
                        <div>
                            <h5>Terms & Conditions</h5>
                        </div>
                    </div>
                    <div className="red_arrow">
                        <span><FaArrowRightLong /></span>
                    </div>
                </Link>
                <Link href="about/licenses" className="mt1r">
                    <div className="d-flex align-items-center gap-3">
                        <span><IoIosCard /></span>
                        <div>
                            <h5>Licenses</h5>
                        </div>
                    </div>
                    <div className="red_arrow">
                        <span><FaArrowRightLong /></span>
                    </div>
                </Link>
                <Link href="about/rate-us" className="mt1r">
                    <div className="d-flex align-items-center gap-3">
                        <span><IoIosChatbubbles /></span>
                        <div>
                            <h5>Rate us on Play Store</h5>
                        </div>
                    </div>
                    <div className="red_arrow">
                        <span><FaArrowRightLong /></span>
                    </div>
                </Link>
                <Link href="#!" className="mt1r">
                    <div className="d-flex align-items-center gap-3">
                        <span><FaLanguage /></span>
                        <div>
                            <h5>Share App </h5>
                        </div>
                    </div>
                    <div className="red_arrow">
                        <span><FaArrowRightLong /></span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default More