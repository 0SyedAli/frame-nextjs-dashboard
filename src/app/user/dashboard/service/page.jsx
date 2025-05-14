import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
const Service = () => {
    return (
        <div className="service_dash w-100">
            <div className="sd_top">
                <h2>Haircut & Styling</h2>
                <span><IoCartSharp /></span>
            </div>
            <div className="sd_tabs_container">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Book By Treatment</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Stylist</button>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                        <div className="row g-5 ">
                            <div className="col-6">
                                <div className="service_user_card">
                                    <Image
                                        src="/images/us1.png"
                                        width={445}
                                        height={260}
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
                                        src="/images/us2.png"
                                        width={445}
                                        height={260}
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
                                        src="/images/us2.png"
                                        width={445}
                                        height={260}
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
                                        src="/images/us1.png"
                                        width={445}
                                        height={260}
                                        alt=""
                                    />
                                    <div className="suc">
                                        <h4>Hair Treatments</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                        <div className="row mb-4">
                            <div className="col-3">
                                <div className="salon_card">
                                    <Image
                                        src="/images/sc1.svg"
                                        width={350}
                                        height={150}
                                        alt=""
                                    />
                                    <div className="sc_content">
                                        <h4>Ray O’Sun</h4>
                                        <div className="d-flex w-100 align-items-center justify-content-between"> 
                                            <h5>106 Reviews</h5>
                                            <h5><span><FaStar /></span>4.98</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="salon_card">
                                    <Image
                                        src="/images/sc1.svg"
                                        width={350}
                                        height={150}
                                        alt=""
                                    />
                                    <div className="sc_content">
                                        <h4>Ray O’Sun</h4>
                                        <div className="d-flex w-100 align-items-center justify-content-between"> 
                                            <h5>106 Reviews</h5>
                                            <h5><span><FaStar /></span>4.98</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="salon_card">
                                    <Image
                                        src="/images/sc1.svg"
                                        width={350}
                                        height={150}
                                        alt=""
                                    />
                                    <div className="sc_content">
                                        <h4>Ray O’Sun</h4>
                                        <div className="d-flex w-100 align-items-center justify-content-between"> 
                                            <h5>106 Reviews</h5>
                                            <h5><span><FaStar /></span>4.98</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="salon_card">
                                    <Image
                                        src="/images/sc1.svg"
                                        width={350}
                                        height={150}
                                        alt=""
                                    />
                                    <div className="sc_content">
                                        <h4>Ray O’Sun</h4>
                                        <div className="d-flex w-100 align-items-center justify-content-between"> 
                                            <h5>106 Reviews</h5>
                                            <h5><span><FaStar /></span>4.98</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <div className="salon_card">
                                    <Image
                                        src="/images/sc1.svg"
                                        width={350}
                                        height={150}
                                        alt=""
                                    />
                                    <div className="sc_content">
                                        <h4>Ray O’Sun</h4>
                                        <div className="d-flex w-100 align-items-center justify-content-between"> 
                                            <h5>106 Reviews</h5>
                                            <h5><span><FaStar /></span>4.98</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="salon_card">
                                    <Image
                                        src="/images/sc1.svg"
                                        width={350}
                                        height={150}
                                        alt=""
                                    />
                                    <div className="sc_content">
                                        <h4>Ray O’Sun</h4>
                                        <div className="d-flex w-100 align-items-center justify-content-between"> 
                                            <h5>106 Reviews</h5>
                                            <h5><span><FaStar /></span>4.98</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="salon_card">
                                    <Image
                                        src="/images/sc1.svg"
                                        width={350}
                                        height={150}
                                        alt=""
                                    />
                                    <div className="sc_content">
                                        <h4>Ray O’Sun</h4>
                                        <div className="d-flex w-100 align-items-center justify-content-between"> 
                                            <h5>106 Reviews</h5>
                                            <h5><span><FaStar /></span>4.98</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="salon_card">
                                    <Image
                                        src="/images/sc1.svg"
                                        width={350}
                                        height={150}
                                        alt=""
                                    />
                                    <div className="sc_content">
                                        <h4>Ray O’Sun</h4>
                                        <div className="d-flex w-100 align-items-center justify-content-between"> 
                                            <h5>106 Reviews</h5>
                                            <h5><span><FaStar /></span>4.98</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service