import SingleRangeSlider from "@/components/SingleRangeSlider";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";

const Appointment = () => {

    return (
        <div className="content w-100 h-100 align-items-start">
            <div className="auth_container bussiness">
                <div className="auth_head">
                    <h2>Where's your next appointment?</h2>
                    <p className="pt-2">Share your location, and we'll handle the rest!</p>
                </div>
                <div className='w-100'>
                    <form className="next_appointment">
                        <input type="text" placeholder="Enter city or zipcode" />
                        <div>
                            <h5>
                                <span><FaLocationDot /></span>
                                Use my current location
                            </h5>
                        </div>
                        <SingleRangeSlider />
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="switchCheckChecked"  />
                            <label class="form-check-label" htmlFor="switchCheckChecked">Enable home services</label>
                        </div>
                    </form>
                </div>
            </div>
            <Link className="skip_btn" href="confirm-address">Skip</Link>
        </div >
    );
};

export default Appointment;

