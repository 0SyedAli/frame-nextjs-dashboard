"use client";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MyModal from "@/components/MyModal";
import { FaRegCheckCircle } from "react-icons/fa";
import Link from "next/link";
import Tabs from "@/components/Tabs";
import { IoLockOpenOutline } from "react-icons/io5";
import Image from "next/image";
import Spinner from "@/components/Spinner";

const BillingDetails = () => {
    // modal 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    // modal 


    const adminId = useSelector((state) => state.auth.user?._id || ""); // Get adminId from Redux
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        countryRegion: "",
        street: "",
        appartment: "",
        postCode: "",
        city: "",
        phNumber: "",
        username: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!adminId) {
            setError("Admin ID is missing. Please log in again.");
            return;
        }

        // Validation (Ensure required fields are filled)
        const requiredFields = [
            "firstName",
            "lastName",
            "countryRegion",
            "street",
            "city",
            "phNumber",
            "username",
        ];
        for (let field of requiredFields) {
            if (!formData[field]) {
                setError(`Please fill in ${field.replace(/([A-Z])/g, " $1")}.`);
                return;
            }
        }

        setLoading(true);
        setError("");

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/addBilling`,
                {
                    adminId,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    companyName: formData.companyName,
                    countryRegion: formData.countryRegion,
                    street: formData.street,
                    appartment: formData.appartment,
                    postCode: formData.postCode,
                    city: formData.city,
                    phNumber: formData.phNumber,
                    username: formData.username,
                    differentAddress: false,
                    order: "124",
                },
                { headers: { "Content-Type": "application/json" } }
            );

            openModal();

            setFormData({
                firstName: "",
                lastName: "",
                companyName: "",
                countryRegion: "",
                street: "",
                appartment: "",
                postCode: "",
                city: "",
                phNumber: "",
                username: "",
            });
        } catch (error) {
            setError("Failed to save billing details.");
            console.error(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

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
                        <form onSubmit={handleSubmit}>
                            <div className="row gx-3">
                                {[
                                    { name: "firstName", label: "First name *" },
                                    { name: "lastName", label: "Last name *" },
                                    { name: "companyName", label: "Company name (optional)" },
                                    { name: "countryRegion", label: "Country / Region *" },
                                    { name: "street", label: "Street address *" },
                                    { name: "appartment", label: "Apartment" },
                                    { name: "postCode", label: "Postcode / ZIP (optional)" },
                                    { name: "city", label: "Town / City *" },
                                    { name: "phNumber", label: "Phone *" },
                                    { name: "username", label: "User Name *" },
                                ].map(({ name, label }) => (
                                    <div key={name} className="col-6">
                                        <div className="auth_form_field">
                                            <label htmlFor={name}>{label}</label>
                                            <input
                                                type="text"
                                                name={name}
                                                value={formData[name]}
                                                onChange={handleChange}
                                                required={label.includes("*")}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div className="col-12">
                                    <div className="auth_form_check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            Ship to a different address?
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {error && <p className="error text-danger">{error}</p>}
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
                                    <button type="submit" className="btn gradient_btn" disabled={loading}>
                                        {loading ? <Spinner /> : "Pay now"}
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
            </div>
        </>
    );
};

export default BillingDetails;