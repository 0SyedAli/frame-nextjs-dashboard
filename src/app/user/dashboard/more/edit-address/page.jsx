
import { FaRegQuestionCircle } from "react-icons/fa";


const PaymentMethod = () => {

    return (
        <div className="setting_dash w-100">
            <form className="ea_form">
                <div className="sd_top py-0">
                    <h3>Edit Address</h3>
                    <span><FaRegQuestionCircle /></span>
                </div>
                <h4>Address Details</h4>
                <div className="pm_detail ana ea">
                    <input type="text" placeholder="Street & Flat No" />
                    <input type="text" placeholder="Street" />
                    <input type="text" placeholder="Postcode" />
                    <input type="text" placeholder="City" />
                </div>
                <h4>Address Type</h4>
                <div className="pm_ana_radio">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="addressType" id="homeDefault2" />
                        <label class="form-check-label" htmlFor="homeDefault2">
                            Home
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="addressType" id="customAddress2" />
                        <label class="form-check-label" htmlFor="customAddress2">
                            Custom Address
                        </label>
                    </div>
                </div>
                <h4>Additional Information</h4>
                <div className="ai_detail">
                    <select name="city" >
                        <option value="">Do you have any stairs? Please Select</option>
                        <option value="">one</option>
                        <option value="">two</option>
                        <option value="">three</option>
                    </select>
                    <div>
                        <div class="form-check form-switch pt-4">
                            <input class="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" />
                            <label class="form-check-label" htmlFor="switchCheckChecked">I have cat(s)</label>
                        </div>
                        <div class="form-check form-switch pt-4">
                            <input class="form-check-input" type="checkbox" role="switch" id="switchCheckChecked" />
                            <label class="form-check-label" htmlFor="switchCheckChecked">I have dog(s)</label>
                        </div>
                    </div>
                    <div className="mt-4">
                        <textarea rows="4" placeholder="Parking Information and any other directions?"></textarea>
                    </div>
                </div>
                <div className="text-center ea_btn">
                    <button type="submit" className="theme-btn2 ea_rem_btn">
                        Remove Address
                    </button>
                    <button type="submit" className="theme-btn2">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentMethod;