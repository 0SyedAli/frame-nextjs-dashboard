import Image from "next/image"
import { FaCircleArrowRight } from "react-icons/fa6";
import { BiSolidMessageRounded } from "react-icons/bi";
import { IoIosCard } from "react-icons/io";
import { IoIosChatbubbles } from "react-icons/io";
import { FaLanguage } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const More = () => {
    return (
        <div className="more_dash w-100 h-100 py-5">
            <div className="md_profile">
                <Image
                    src="/images/md_img.png"
                    width={1012}
                    height={145}
                    alt=""
                />
                <div className="mdp_content">
                    <div className="mp_img">
                        JD
                    </div>
                    <div>
                        <h4>David M</h4>
                        <h5>Lorem Ipsum is simply dummy</h5>
                    </div>
                </div>
                <span><FaCircleArrowRight /></span>
            </div>
            <div className="mt1_redirects mt5_redirects">
                <Link href="more/account-setting" className="mt1r">
                    <div className="d-flex align-items-center gap-3">
                        <span><RiUserSettingsFill /></span>
                        <div>
                            <h5>Account Setting</h5>
                        </div>
                    </div>
                    <div className="red_arrow">
                        <span><FaArrowRightLong /></span>
                    </div>
                </Link>
                <Link href="#!" className="mt1r">
                    <div className="d-flex align-items-center gap-3">
                        <span><BiSolidMessageRounded /></span>
                        <div>
                            <h5>Inbox</h5>
                        </div>
                    </div>
                    <div className="red_arrow">
                        <span><FaArrowRightLong /></span>
                    </div>
                </Link>
                <Link href="more/payment-method" className="mt1r">
                    <div className="d-flex align-items-center gap-3">
                        <span><IoIosCard /></span>
                        <div>
                            <h5>Payment Method</h5>
                        </div>
                    </div>
                    <div className="red_arrow">
                        <span><FaArrowRightLong /></span>
                    </div>
                </Link>
                <Link href="more/" className="mt1r">
                    <div className="d-flex align-items-center gap-3">
                        <span><IoIosChatbubbles /></span>
                        <div>
                            <h5>Chat With Support</h5>
                        </div>
                    </div>
                    <div className="red_arrow">
                        <span><FaArrowRightLong /></span>
                    </div>
                </Link>
                <Link href="more/" className="mt1r">
                    <div className="d-flex align-items-center gap-3">
                        <span><FaLanguage /></span>
                        <div>
                            <h5>Language </h5>
                        </div>
                    </div>
                    <div className="red_arrow">
                        <span><FaArrowRightLong /></span>
                    </div>
                </Link>
                <Link href="more/my-address" className="mt1r">
                    <div className="d-flex align-items-center gap-3">
                        <span><FaHome /></span>
                        <div>
                            <h5>Address </h5>
                        </div>
                    </div>
                    <div className="red_arrow">
                        <span><FaArrowRightLong /></span>
                    </div>
                </Link>
                <Link href="about" className="mt1r">
                    <div className="d-flex align-items-center gap-3">
                        <span><FaInfoCircle /></span>
                        <div>
                            <h5>About The App </h5>
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