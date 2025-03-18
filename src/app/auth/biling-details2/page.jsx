"use client"
import MyModal from '@/components/MyModal';
import Image from 'next/image'
import Link from 'next/link';
import { FaRegCheckCircle } from "react-icons/fa";

import React, { useState } from 'react'
import { IoLockOpenOutline } from "react-icons/io5";
import Tabs from '@/components/Tabs';
const BillingDetails2 = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <>
            <MyModal isOpen={isModalOpen} onClose={closeModal} myModalContent="bd_content">
                <div className="bd_modal_body">
                    <div className="bmd_top">
                        <span><FaRegCheckCircle /></span>
                        <h4>Payment Processed</h4>
                    </div>
                    <div className="bmd_bottom">
                        <Link href="business-detail">Get Started</Link>
                        <p>Access these features when you get this pricing package for your business.</p>
                    </div>
                </div>
            </MyModal>
            <div className="content w-100">
                <div className="auth_container pricing">
                    <div className="auth_head">
                        <h2>Billing Details</h2>
                        <p>Get started in minutes and transform your business</p>
                    </div>
                    <div className="auth_form">
                        <form>
                            <div className="row gx-3">
                                <div className="col-6">
                                    <div className="auth_form_field">
                                        <label htmlFor="">First name *</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="auth_form_field">
                                        <label htmlFor="">Last name *</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="auth_form_field">
                                        <label htmlFor="">Company name (optional)</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="auth_form_field">
                                        <label htmlFor="">Country / Region *</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="auth_form_field">
                                        <label htmlFor="">Street address *</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="auth_form_field">
                                        <label htmlFor="">Appartment</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="auth_form_field">
                                        <label htmlFor="">Postcode / ZIP (optional)</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="auth_form_field">
                                        <label htmlFor="">Town / City *</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="auth_form_field">
                                        <label htmlFor="">Phone *</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="auth_form_field">
                                        <label htmlFor="">Email address *</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="auth_form_field">
                                        <label htmlFor="">Account username *</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="auth_form_field">
                                        <label htmlFor="">Create account password *</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="auth_form_check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            Ship to a different address?
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="payment_head">
                                        <h4>Payment</h4>
                                        <p>All transactions are secure and <br />encrypted.</p>
                                    </div>
                                    <div className="payment1">
                                        {/* <div className="p1_head">
                                            <div className="auth_form_radio">
                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    Credit card
                                                </label>
                                            </div>
                                            <Image
                                                src="/images/payment_cards.png"
                                                width={375.56}
                                                height={40.13}
                                                className="pb-icon"
                                                alt="Frame"
                                            />
                                        </div>
                                        <div className="payment1_body">
                                            <div className="row gy-4">
                                                <div className="col-12">
                                                    <input type="text" placeholder='Card number' />
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" placeholder='Expiration date (MM / YY)' />
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" placeholder='Security code' />
                                                </div>
                                                <div className="col-12">
                                                    <input type="text" placeholder='Name on card' />
                                                </div>
                                                <div className="col-12">
                                                    <div className="auth_form_radio pt-1">
                                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                            Use shipping address as billing address
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p1_head p2_head" style={{ borderBottom: '0' }}>
                                            <div className="auth_form_radio">
                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                    Paypal
                                                </label>
                                            </div>
                                            <Image
                                                src="/images/paypal.png"
                                                width={80.51}
                                                height={21}
                                                className="pb-icon"
                                                alt="Frame"
                                            />
                                        </div>
                                        <div className="payment1_body">
                                            <div className="row gy-4">
                                                <div className="col-12">
                                                    <input type="text" placeholder='Card number' />
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" placeholder='Expiration date (MM / YY)' />
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" placeholder='Security code' />
                                                </div>
                                                <div className="col-12">
                                                    <input type="text" placeholder='Name on card' />
                                                </div>
                                                <div className="col-12">
                                                    <div className="auth_form_radio pt-1">
                                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                            Use shipping address as billing address
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p1_head p2_head" style={{ borderEndEndRadius: '8px', borderEndStartRadius: '8px', paddingTop: '12px', paddingBottom: '12px' }}>
                                            <div className="auth_form_radio">
                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                                                <label className="form-check-label" htmlFor="flexRadioDefault3">
                                                    Credit / Debit Card
                                                </label>
                                            </div>
                                            <Image
                                                src="/images/visa-icon.png"
                                                width={71.85}
                                                height={54}
                                                className="pb-icon"
                                                alt="Frame"
                                            />
                                        </div>
                                        <div className="payment1_body">
                                            <div className="row gy-4">
                                                <div className="col-12">
                                                    <input type="text" placeholder='Card number' />
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" placeholder='Expiration date (MM / YY)' />
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" placeholder='Security code' />
                                                </div>
                                                <div className="col-12">
                                                    <input type="text" placeholder='Name on card' />
                                                </div>
                                                <div className="col-12">
                                                    <div className="auth_form_radio pt-1">
                                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                            Use shipping address as billing address
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}

                                        <Tabs />
                                        <h3 className='my-3 text-start'>Remember me</h3>
                                        <div className="p1_head p2_head p3_head" style={{ borderEndEndRadius: '8px', borderEndStartRadius: '8px' }}>
                                            <div className="auth_form_radio">
                                                <input className="form-check-input" type="checkbox" name="flexRadioDefaultx" id="flexRadioDefault6" />
                                                <label className="form-check-label" htmlFor="flexRadioDefault6">

                                                </label>
                                                <h5> Save my information for a faster checkout</h5>
                                            </div>
                                        </div>
                                        <h4><span><IoLockOpenOutline /></span>Secure and encrypted</h4>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button onClick={openModal} type='button' className="btn gradient_btn">
                                        Pay now
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="progess-bottom-icons">
                        <div className="pbi_inner w-100">
                            <div className="pbi_item">
                                <Image
                                    src="/images/pricing_bottom1.png"
                                    width={36}
                                    height={36}
                                    className="pb-icon"
                                    alt="Frame"
                                />
                                <h5>30 days money back <br />Guarantee</h5>
                            </div>
                            <div className="pbi_item">
                                <Image
                                    src="/images/pricing_bottom2.png"
                                    width={36}
                                    height={36}
                                    className="pb-icon"
                                    alt="Frame"
                                />
                                <h5>No setup fees<br />
                                    100% hassle-free</h5>
                            </div>
                            <div className="pbi_item">
                                <Image
                                    src="/images/pricing_bottom3.png"
                                    width={36}
                                    height={36}
                                    className="pb-icon"
                                    alt="Frame"
                                />
                                <h5>No monthly subscription <br />
                                    Pay once and for all</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default BillingDetails2