import Image from "next/image";
import Link from "next/link";
import { FaPlusCircle, FaRegQuestionCircle } from "react-icons/fa";

const PaymentMethod = () => {

    return (
        <div className="setting_dash w-100">
            <div className="sd_top">
                <h3>Payment Method</h3>
                <span><FaRegQuestionCircle /></span>
            </div>
            <div className="pm_detail">
                <label className="pd-label">Home</label>
                <Link href="edit-address" className="pd1">
                    <div className="d-flex align-items-center gap-3">
                        <Image
                            src="/images/home_icon.svg"
                            width={65}
                            height={30}
                            alt=""
                        />
                        <h4>Lorem Ipsum street 456789</h4>
                    </div>
                </Link>
                <Link href="add-new-address" className="pd1 mt-3">
                    <div className="d-flex align-items-center gap-3">
                        <h5><FaPlusCircle /></h5>
                        <h4>Add New Address</h4>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default PaymentMethod;