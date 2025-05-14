import Image from "next/image";
import Link from "next/link";
import { FaPlusCircle, FaRegQuestionCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const PaymentMethod = () => {

    return (
        <div className="setting_dash w-100 h-100    ">
            <div className="sd_top py-0">
                <h3>Add New Addresses</h3>
                <span><FaRegQuestionCircle /></span>
            </div>
            <div className="sd_mid">
                <h3>Where's your next appointment?</h3>
                <p>Share your location, and we'll handle the rest!</p>
            </div>
            <div className="pm_detail ana">
                <input type="text" placeholder="Enter address" />
            </div>
            <div className="d-flex align-items-end gap-2 ana_find_loc">
                <h5><FaLocationDot /></h5>
                <h4>Or Find my location</h4>
            </div>
            <div className="text-center ea_btn2">
                <button type="submit" className="theme-btn2">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default PaymentMethod;