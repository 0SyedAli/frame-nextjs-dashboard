"use client"
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import MyModal from "@/components/MyModal";
import Chat from "@/components/Chat";
import AuthGuard from "@/components/AuthGuard";
const Message = () => {
    const [active, setActive] = useState('allMessages'); // Default active button
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <>
            {/* <MyModal isOpen={isModalOpen} onClose={closeModal}>
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
            </MyModal> */}
            {/* <Chat /> */}

            <div className="w-100">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="m_tabs_menu">
                        <button
                            className={`btn ${active === 'allMessages' ? 'active' : ''}`}
                            onClick={() => setActive('allMessages')}
                        >
                            All Messages
                        </button>
                        <button
                            className={`btn ${active === 'newest' ? 'active' : ''}`}
                            onClick={() => setActive('newest')}
                        >
                            Newest
                        </button>
                        <button
                            className={`btn ${active === 'replied' ? 'active' : ''}`}
                            onClick={() => setActive('replied')}
                        >
                            Replied
                        </button>
                    </div>
                    <div className="search_input">
                        <input type="search" placeholder="Search review" id="" />
                    </div>
                </div>

                {active === "allMessages" && (
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

                                </label>
                            </div>
                        </div>
                    </div>
                )}
                {active === "newest" && (
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

                                </label>
                            </div>
                        </div>
                    </div>
                )}
                {active === "replied" && (
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

                                </label>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

const ProtectedMessageDashboard = () => (
    <AuthGuard>
      <Message />
    </AuthGuard>
  );
  
  export default ProtectedMessageDashboard;