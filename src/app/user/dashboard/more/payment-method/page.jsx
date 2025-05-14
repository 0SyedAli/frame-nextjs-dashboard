import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaPlusCircle, FaRegQuestionCircle } from "react-icons/fa";
import Link from "next/link";

const PaymentMethod = () => {

    return (
        <div className="setting_dash w-100">
            <div className="sd_top">
                <h3>Payment Method</h3>
                <span><FaRegQuestionCircle /></span>
            </div>
            <div className="pm_detail">
                <div className="pd1">
                    <div className="d-flex align-items-center gap-3">
                        <Image
                            src="/images/visa-icon2.png"
                            width={65}
                            height={40}
                            alt=""
                        />
                        <h4>**** 0948</h4>
                    </div>
                    <div className="d-flex align-items-center gap-4">
                        <h4><strong><span>£</span> 1200</strong></h4>
                        <div className="red_arrow">
                            <span><FaArrowRightLong /></span>
                        </div>
                    </div>
                </div>
                <div className="pd1 my-3">
                    <div className="d-flex align-items-center gap-3">
                        <Image
                            src="/images/apple-pay-icon.jpg"
                            width={65}
                            height={40}
                            alt=""
                        />
                        <h4>**** 0948</h4>
                    </div>
                    <div className="d-flex align-items-center gap-4">
                        <h4><strong><span>£</span> 1200</strong></h4>
                        <div className="red_arrow">
                            <span><FaArrowRightLong /></span>
                        </div>
                    </div>
                </div>
                <Link href="new-payment-method" className="pd1">
                    <div className="d-flex align-items-center gap-3">
                        <h5><FaPlusCircle /></h5>
                        <h4>New Payment Method</h4>
                    </div>
                    <div className="d-flex align-items-center gap-4">
                        <div className="red_arrow">
                            <span><FaArrowRightLong /></span>
                        </div>
                    </div>
                </Link>
                <div>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" />
                        <label class="form-check-label" htmlFor="switchCheckChecked">Apple Payment</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;