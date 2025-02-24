"use client"
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
const Marketing = () => {
    const [active, setActive] = useState('transactions'); // Default active button

    return (
        <div className="w-100">
            <div className="m_tabs_menu">
                <button
                    className={`theme-btn3 ${active === 'accountSettings' ? 'active' : ''}`}
                    onClick={() => setActive('accountSettings')}
                >
                    Account Settings
                </button>
                <button
                    className={`theme-btn3 ${active === 'transactions' ? 'active' : ''}`}
                    onClick={() => setActive('transactions')}
                >
                    Transactions
                </button>
                <button
                    className={`theme-btn3 ${active === 'planSelection' ? 'active' : ''}`}
                    onClick={() => setActive('planSelection')}
                >
                    Plan Selection
                </button>
            </div>

            {active === "accountSettings" && (
                <div className="m_tabs_main">
                    <form action="">
                        <h3>Loyalty rewards</h3>
                        <div className="ast_main">
                            <div className="ast_item">
                                <Image
                                    src="/images/ast_img1.png"
                                    width={64}
                                    height={60}
                                    alt="Frame"
                                />
                                <div className="ast_file">
                                    <input type="file" name="" id="" />
                                    <h5>Change Pictures</h5>
                                    <span><FaRegEdit /></span>
                                </div>
                            </div>
                            <div className="row pt-4 gx-3 gy-3">
                                <div className="col-4">
                                    <div className="am_field">
                                        <label htmlFor="">First Name</label>
                                        <input type="text" value="Jazy" />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="am_field">
                                        <label htmlFor="">Last Name</label>
                                        <input type="text" value="Dewo" />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="am_field">
                                        <label htmlFor="">Email</label>
                                        <input type="email" value="Cameron@abc.com" />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="am_field">
                                        <label htmlFor="">Address</label>
                                        <input type="text" value="Ipsum street 01234..." />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="am_field">
                                        <label htmlFor="">Gender</label>
                                        <input type="text" value="Male" />
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="am_field">
                                        <label htmlFor="">Email</label>
                                        <input type="date" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="am_btn">
                                        <button className="am_submit">Update</button>
                                        <button className="am_cancel">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h3 className="mt-5">About / Bio</h3>
                        <div className="ast_main2">
                            <textarea className="w-100" name="" id="" value="Providing a wide range of personal care and grooming services, including haircuts, styling, coloring, facials, manicures, pedicures, waxing, and makeup. They cater to individual preferences, enhancing clients' confidence and appearance. Using skilled professionals, quality products, and modern techniques, they create a relaxing and rejuvenating experience."></textarea>
                        </div>
                    </form>
                </div>
            )}
            {active === "transactions" && (
                <div className="m_tabs_main">
                    <div className="transaction-main">
                        <div className="tm-item">
                            <div>
                                <h5 className="mb-2">Received from James Wilson</h5>
                                <h5 className="d-flex align-items-center gap-4">
                                    <span>July 17, 2024</span>
                                    <span>Order ID : #456789</span>
                                </h5>
                            </div>
                            <h4>+$400.00</h4>
                        </div>
                        <div className="tm-item">
                            <div>
                                <h5 className="mb-2">Received from James Wilson</h5>
                                <h5 className="d-flex align-items-center gap-4">
                                    <span>July 17, 2024</span>
                                    <span>Order ID : #456789</span>
                                </h5>
                            </div>
                            <h4>+$400.00</h4>
                        </div>
                        <div className="tm-item">
                            <div>
                                <h5 className="mb-2">Received from James Wilson</h5>
                                <h5 className="d-flex align-items-center gap-4">
                                    <span>July 17, 2024</span>
                                    <span>Order ID : #456789</span>
                                </h5>
                            </div>
                            <h4>+$400.00</h4>
                        </div>
                        <div className="tm-item">
                            <div>
                                <h5 className="mb-2">Received from James Wilson</h5>
                                <h5 className="d-flex align-items-center gap-4">
                                    <span>July 17, 2024</span>
                                    <span>Order ID : #456789</span>
                                </h5>
                            </div>
                            <h4>+$400.00</h4>
                        </div>
                        <div className="tm-item">
                            <div>
                                <h5 className="mb-2">Received from James Wilson</h5>
                                <h5 className="d-flex align-items-center gap-4">
                                    <span>July 17, 2024</span>
                                    <span>Order ID : #456789</span>
                                </h5>
                            </div>
                            <h4>+$400.00</h4>
                        </div>
                        <div className="tm-item">
                            <div>
                                <h5 className="mb-2">Received from James Wilson</h5>
                                <h5 className="d-flex align-items-center gap-4">
                                    <span>July 17, 2024</span>
                                    <span>Order ID : #456789</span>
                                </h5>
                            </div>
                            <h4>+$400.00</h4>
                        </div>
                        <div className="tm-item">
                            <div>
                                <h5 className="mb-2">Received from James Wilson</h5>
                                <h5 className="d-flex align-items-center gap-4">
                                    <span>July 17, 2024</span>
                                    <span>Order ID : #456789</span>
                                </h5>
                            </div>
                            <h4>+$400.00</h4>
                        </div>
                        <div className="tm-item">
                            <div>
                                <h5 className="mb-2">Received from James Wilson</h5>
                                <h5 className="d-flex align-items-center gap-4">
                                    <span>July 17, 2024</span>
                                    <span>Order ID : #456789</span>
                                </h5>
                            </div>
                            <h4>+$400.00</h4>
                        </div>
                        <div className="tm-item">
                            <div>
                                <h5 className="mb-2">Received from James Wilson</h5>
                                <h5 className="d-flex align-items-center gap-4">
                                    <span>July 17, 2024</span>
                                    <span>Order ID : #456789</span>
                                </h5>
                            </div>
                            <h4>+$400.00</h4>
                        </div>
                    </div>
                </div>
            )}
            {active === "planSelection" && (
                <div className="m_tabs_main pricing_container ">
                    <div className="pricing_item mt-5">
                        <div className="row">
                            <div className="col-4">
                                <div className="pi_left">
                                    <h5>Basic</h5>
                                    <h2>$45.<span>00</span></h2>
                                    <p>billed every month</p>
                                    <p className="pi_cp">Current Package</p>
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="pi_right">
                                    <p>Access these features when you get this pricing package for your business.</p>
                                    <ul>
                                        <li><span><FaCheck /></span>Sed ut perspiciatis unde omnis</li>
                                        <li><span><FaCheck /></span>Sed ut perspiciatis unde omnis unde omnis</li>
                                        <li><span><FaCheck /></span>Sed ut perspiciatis unde</li>
                                        <li><span><FaCheck /></span>Sed ut perspiciatis unde omnis</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Marketing;