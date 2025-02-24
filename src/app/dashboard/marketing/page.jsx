"use client"
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import MyModal from "@/components/MyModal";

const Marketing = () => {
    const [active, setActive] = useState('allReviews'); // Default active button
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <>
            <MyModal isOpen={isModalOpen} onClose={closeModal}>
                <div className="galary_modal">
                    <Image
                        src="/images/mg_1.png"
                        width={170}
                        height={240}
                        alt="Frame"
                        onClick={openModal}
                    />
                    <div className="gm_text">
                        <h5>Non-surgical</h5>
                        <h4>Skin Treatment - Title</h4>
                        <p>A minimally invasive procedure to reduce wrinkles and fine lines by temporarily paralyzing facial muscles.</p>
                        <h6>Emily Ross, David Carter</h6>
                        <button className="theme-btn6">Share</button>
                    </div>
                </div>
            </MyModal>
            <div className="w-100">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="m_tabs_menu">
                        <button
                            className={`theme-btn3 ${active === 'marketing' ? 'active' : ''}`}
                            onClick={() => setActive('marketing')}
                        >
                            Marketing
                        </button>
                        <button
                            className={`theme-btn3 ${active === 'allReviews' ? 'active' : ''}`}
                            onClick={() => setActive('allReviews')}
                        >
                            All Reviews
                        </button>
                        <button
                            className={`theme-btn3 ${active === 'gallery' ? 'active' : ''}`}
                            onClick={() => setActive('gallery')}
                        >
                            Gallery
                        </button>
                    </div>
                    <div className="search_input">
                        <input type="search" placeholder="Search review" id="" />
                    </div>
                </div>

                {active === "marketing" && (
                    <div className="m_tabs_main">
                        <h3>Loyalty rewards</h3>
                        <p>Create ways for your customer to earn and redeem points.</p>
                        <div className="mtm_cards">
                            <div className="mtm_card_item">
                                <span>
                                    <Image
                                        src="/images/multi_user.png"
                                        width={39}
                                        height={21}
                                        className="cal-icon"
                                        alt="Frame"
                                    />
                                </span>
                                <div>
                                    <h4>4,421</h4>
                                    <p>Loyalty Customers</p>
                                </div>
                            </div>
                            <div className="mtm_card_item">
                                <span>
                                    <Image
                                        src="/images/pp.png"
                                        width={31}
                                        height={31}
                                        className="cal-icon"
                                        alt="Frame"
                                    />
                                </span>
                                <div>
                                    <h4>4,421</h4>
                                    <p>Loyalty Customers</p>
                                </div>
                            </div>
                            <div className="mtm_card_item">
                                <span>
                                    <Image
                                        src="/images/pp.png"
                                        width={31}
                                        height={31}
                                        className="cal-icon"
                                        alt="Frame"
                                    />
                                </span>
                                <div>
                                    <h4>4,421</h4>
                                    <p>Loyalty Customers</p>
                                </div>
                            </div>
                            <div className="mtm_card_item">
                                <span>
                                    <Image
                                        src="/images/calender.png"
                                        width={29}
                                        height={30}
                                        className="cal-icon"
                                        alt="Frame"
                                    />
                                </span>
                                <div>
                                    <h4>4,421</h4>
                                    <p>Loyalty Customers</p>
                                </div>
                            </div>
                        </div>
                        <div className="mtm_performance">
                            <h3>Loyalty program performance</h3>
                            <div className="mp_cards">
                                <div className="mp_card_item active">
                                    <h3>587</h3>
                                    <h6>Activity performance</h6>
                                </div>
                                <div className="mp_card_item">
                                    <h3>587</h3>
                                    <h6>Activity performance</h6>
                                </div>
                                <div className="mp_card_item">
                                    <h3>587</h3>
                                    <h6>Activity performance</h6>
                                </div>
                                <div className="mp_card_item">
                                    <h3>587</h3>
                                    <h6>Activity performance</h6>
                                </div>
                                <div className="mp_card_item">
                                    <h3>587</h3>
                                    <h6>Activity performance</h6>
                                </div>
                            </div>
                            <div className="mp_table row">
                                <div className="mpt_chart col-4">

                                </div>
                                <div className="mpt_table col-8">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Services</th>
                                                <th>Total Services</th>
                                                <th>Loyal Customer</th>
                                                <th>Earned Points</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Array(8).fill().map((_, index) => (
                                                <tr key={index}>
                                                    <td>Skin Treatment</td>
                                                    <td>202</td>
                                                    <td>202</td>
                                                    <td>202</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {active === "allReviews" && (
                    <div className="m_tabs_main">
                        <div className="mtm_all_reviews">
                            <div className="mar_item">
                                <input type="checkbox" id="mar1" />
                                <label className="mar_label" htmlFor="mar1">
                                    <span className="mar_profile">
                                        <Image
                                            src="/images/multi_user.png"
                                            width={39}
                                            height={21}
                                            className="d-none"
                                            alt="Frame"
                                        />
                                    </span>
                                    <div>
                                        <div className="d-flex align-items-center gap-3 pb-2">
                                            <h4>Daniel Evans</h4>
                                            <h5 className="mid_line">|</h5>
                                            <h6>Wednesday, 20 Sep 2028, 11:45 AM</h6>
                                        </div>
                                        <p>The microdermabrasion treatment was amazing! My skin feels so much smoother now.
                                            I highly recommend Dr. Lawson for anyone looking to refresh their skin.</p>
                                    </div>
                                    <div className="px-3">
                                        <h6 className="pb-1">Skin Treatment</h6>
                                        <p>Microdermabrasion</p>
                                    </div>
                                    <div className="mar_stars d-flex align-items-center gap-1 ps-4 pe-2">
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                    </div>
                                </label>
                            </div>
                            <div className="mar_item">
                                <input type="checkbox" id="mar1" />
                                <label className="mar_label" htmlFor="mar1">
                                    <span className="mar_profile">
                                        <Image
                                            src="/images/multi_user.png"
                                            width={39}
                                            height={21}
                                            className="d-none"
                                            alt="Frame"
                                        />
                                    </span>
                                    <div>
                                        <div className="d-flex align-items-center gap-3 pb-2">
                                            <h4>Daniel Evans</h4>
                                            <h5 className="mid_line">|</h5>
                                            <h6>Wednesday, 20 Sep 2028, 11:45 AM</h6>
                                        </div>
                                        <p>The microdermabrasion treatment was amazing! My skin feels so much smoother now.
                                            I highly recommend Dr. Lawson for anyone looking to refresh their skin.</p>
                                    </div>
                                    <div className="px-3">
                                        <h6 className="pb-1">Skin Treatment</h6>
                                        <p>Microdermabrasion</p>
                                    </div>
                                    <div className="mar_stars d-flex align-items-center gap-1  ps-4 pe-2">
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                    </div>
                                </label>
                            </div>
                            <div className="mar_item">
                                <input type="checkbox" id="mar1" />
                                <label className="mar_label" htmlFor="mar1">
                                    <span className="mar_profile">
                                        <Image
                                            src="/images/multi_user.png"
                                            width={39}
                                            height={21}
                                            className="d-none"
                                            alt="Frame"
                                        />
                                    </span>
                                    <div>
                                        <div className="d-flex align-items-center gap-3 pb-2">
                                            <h4>Daniel Evans</h4>
                                            <h5 className="mid_line">|</h5>
                                            <h6>Wednesday, 20 Sep 2028, 11:45 AM</h6>
                                        </div>
                                        <p>The microdermabrasion treatment was amazing! My skin feels so much smoother now.
                                            I highly recommend Dr. Lawson for anyone looking to refresh their skin.</p>
                                    </div>
                                    <div className="px-3">
                                        <h6 className="pb-1">Skin Treatment</h6>
                                        <p>Microdermabrasion</p>
                                    </div>
                                    <div className="mar_stars d-flex align-items-center gap-1  ps-4 pe-2">
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                    </div>
                                </label>
                            </div>
                            <div className="mar_item">
                                <input type="checkbox" id="mar1" />
                                <label className="mar_label" htmlFor="mar1">
                                    <span className="mar_profile">
                                        <Image
                                            src="/images/multi_user.png"
                                            width={39}
                                            height={21}
                                            className="d-none"
                                            alt="Frame"
                                        />
                                    </span>
                                    <div>
                                        <div className="d-flex align-items-center gap-3 pb-2">
                                            <h4>Daniel Evans</h4>
                                            <h5 className="mid_line">|</h5>
                                            <h6>Wednesday, 20 Sep 2028, 11:45 AM</h6>
                                        </div>
                                        <p>The microdermabrasion treatment was amazing! My skin feels so much smoother now.
                                            I highly recommend Dr. Lawson for anyone looking to refresh their skin.</p>
                                    </div>
                                    <div className="px-3">
                                        <h6 className="pb-1">Skin Treatment</h6>
                                        <p>Microdermabrasion</p>
                                    </div>
                                    <div className="mar_stars d-flex align-items-center gap-1  ps-4 pe-2">
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                    </div>
                                </label>
                            </div>
                            <div className="mar_item">
                                <input type="checkbox" id="mar1" />
                                <label className="mar_label" htmlFor="mar1">
                                    <span className="mar_profile">
                                        <Image
                                            src="/images/multi_user.png"
                                            width={39}
                                            height={21}
                                            className="d-none"
                                            alt="Frame"
                                        />
                                    </span>
                                    <div>
                                        <div className="d-flex align-items-center gap-3 pb-2">
                                            <h4>Daniel Evans</h4>
                                            <h5 className="mid_line">|</h5>
                                            <h6>Wednesday, 20 Sep 2028, 11:45 AM</h6>
                                        </div>
                                        <p>The microdermabrasion treatment was amazing! My skin feels so much smoother now.
                                            I highly recommend Dr. Lawson for anyone looking to refresh their skin.</p>
                                    </div>
                                    <div className="px-3">
                                        <h6 className="pb-1">Skin Treatment</h6>
                                        <p>Microdermabrasion</p>
                                    </div>
                                    <div className="mar_stars d-flex align-items-center gap-1  ps-4 pe-2">
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                    </div>
                                </label>
                            </div>
                            <div className="mar_item">
                                <input type="checkbox" id="mar1" />
                                <label className="mar_label" htmlFor="mar1">
                                    <span className="mar_profile">
                                        <Image
                                            src="/images/multi_user.png"
                                            width={39}
                                            height={21}
                                            className="d-none"
                                            alt="Frame"
                                        />
                                    </span>
                                    <div>
                                        <div className="d-flex align-items-center gap-3 pb-2">
                                            <h4>Daniel Evans</h4>
                                            <h5 className="mid_line">|</h5>
                                            <h6>Wednesday, 20 Sep 2028, 11:45 AM</h6>
                                        </div>
                                        <p>The microdermabrasion treatment was amazing! My skin feels so much smoother now.
                                            I highly recommend Dr. Lawson for anyone looking to refresh their skin.</p>
                                    </div>
                                    <div className="px-3">
                                        <h6 className="pb-1">Skin Treatment</h6>
                                        <p>Microdermabrasion</p>
                                    </div>
                                    <div className="mar_stars d-flex align-items-center gap-1  ps-4 pe-2">
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                    </div>
                                </label>
                            </div>
                            <div className="mar_item">
                                <input type="checkbox" id="mar1" />
                                <label className="mar_label" htmlFor="mar1">
                                    <span className="mar_profile">
                                        <Image
                                            src="/images/multi_user.png"
                                            width={39}
                                            height={21}
                                            className="d-none"
                                            alt="Frame"
                                        />
                                    </span>
                                    <div>
                                        <div className="d-flex align-items-center gap-3 pb-2">
                                            <h4>Daniel Evans</h4>
                                            <h5 className="mid_line">|</h5>
                                            <h6>Wednesday, 20 Sep 2028, 11:45 AM</h6>
                                        </div>
                                        <p>The microdermabrasion treatment was amazing! My skin feels so much smoother now.
                                            I highly recommend Dr. Lawson for anyone looking to refresh their skin.</p>
                                    </div>
                                    <div className="px-3">
                                        <h6 className="pb-1">Skin Treatment</h6>
                                        <p>Microdermabrasion</p>
                                    </div>
                                    <div className="mar_stars d-flex align-items-center gap-1  ps-4 pe-2">
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                    </div>
                                </label>
                            </div>
                            <div className="mar_item">
                                <input type="checkbox" id="mar1" />
                                <label className="mar_label" htmlFor="mar1">
                                    <span className="mar_profile">
                                        <Image
                                            src="/images/multi_user.png"
                                            width={39}
                                            height={21}
                                            className="d-none"
                                            alt="Frame"
                                        />
                                    </span>
                                    <div>
                                        <div className="d-flex align-items-center gap-3 pb-2">
                                            <h4>Daniel Evans</h4>
                                            <h5 className="mid_line">|</h5>
                                            <h6>Wednesday, 20 Sep 2028, 11:45 AM</h6>
                                        </div>
                                        <p>The microdermabrasion treatment was amazing! My skin feels so much smoother now.
                                            I highly recommend Dr. Lawson for anyone looking to refresh their skin.</p>
                                    </div>
                                    <div className="px-3">
                                        <h6 className="pb-1">Skin Treatment</h6>
                                        <p>Microdermabrasion</p>
                                    </div>
                                    <div className="mar_stars d-flex align-items-center gap-1  ps-4 pe-2">
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                    </div>
                                </label>
                            </div>
                            <div className="mar_item">
                                <input type="checkbox" id="mar1" />
                                <label className="mar_label" htmlFor="mar1">
                                    <span className="mar_profile">
                                        <Image
                                            src="/images/multi_user.png"
                                            width={39}
                                            height={21}
                                            className="d-none"
                                            alt="Frame"
                                        />
                                    </span>
                                    <div>
                                        <div className="d-flex align-items-center gap-3 pb-2">
                                            <h4>Daniel Evans</h4>
                                            <h5 className="mid_line">|</h5>
                                            <h6>Wednesday, 20 Sep 2028, 11:45 AM</h6>
                                        </div>
                                        <p>The microdermabrasion treatment was amazing! My skin feels so much smoother now.
                                            I highly recommend Dr. Lawson for anyone looking to refresh their skin.</p>
                                    </div>
                                    <div className="px-3">
                                        <h6 className="pb-1">Skin Treatment</h6>
                                        <p>Microdermabrasion</p>
                                    </div>
                                    <div className="mar_stars d-flex align-items-center gap-1  ps-4 pe-2">
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                        <span><FaStar /></span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                )}
                {active === "gallery" && (
                    <div className="m_tabs_main pb-0">
                        <div className="mtm_gallary">
                            <h3>Hair Services Gallery</h3>
                            <div className="mg_items">
                                <Image
                                    src="/images/mg_1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                            </div>
                            <h3>Nails Services Gallery</h3>
                            <div className="mg_items">
                                <Image
                                    src="/images/mg_nail1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_nail1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_nail1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_nail1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_nail1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                            </div>
                            <h3>Skin Services Gallery</h3>
                            <div className="mg_items pb-0">
                                <Image
                                    src="/images/mg_skin1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_skin1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_skin1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_skin1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                                <Image
                                    src="/images/mg_skin1.png"
                                    width={170}
                                    height={240}
                                    alt="Frame"
                                    onClick={openModal}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Marketing;