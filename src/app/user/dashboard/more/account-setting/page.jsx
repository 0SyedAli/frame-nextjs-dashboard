import { FaRegQuestionCircle } from "react-icons/fa";

const PaymentMethod = () => {

    return (
        <div className="setting_dash w-100 h-100">
            <div className="sd_top">
                <h3>Account Settings</h3>
                <span><FaRegQuestionCircle /></span>
            </div>
            <div className="pm_detail">
                <form>
                    <input type="text" placeholder="Name" />
                    <input type="tel" placeholder="Phone No" />
                    <input type="city" placeholder="City" />
                    <div className="pd_bottom">
                        <h4>Other Settings</h4>
                        <button type="button">Delete My Account</button>
                    </div>
                    <div className="pmd_btn">
                        <button className="theme-btn2">Save Changes</button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default PaymentMethod;