"use client"
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'

const Page = () => {
    const [services, setServices] = useState([{ id: 1 }]);

    const addService = () => {
        setServices((prevServices) => [...prevServices, { id: prevServices.length + 1 }]);
    };

    return (
        <div className="content w-100">
            <div className="auth_container bussiness hair_services">
                <div className="auth_head">
                    <h2>Hair Services</h2>
                    <p>Please provide details of the hair services
                        you are offering.</p>
                </div>
                <div className='w-100'>
                    <form>
                        <div className="auth_upload_hair_cover">
                            <input type="file" name="" id="" />
                            <label htmlFor="">
                                <div className="auhc_img_container">
                                    <img className='d-none' src="" alt="" />
                                    <span className="aic_icon">
                                        <Image
                                            src="/images/upload-icon.png"
                                            width={16}
                                            height={18}
                                            className="pb-icon"
                                            alt="Frame"
                                        />
                                    </span>
                                    <h5>Upload header image for Hair services</h5>
                                    <h5>800px  x  400px</h5>
                                </div>
                            </label>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="bd_fields">
                                    <textarea type="text"  rows="5">Service Introduction text (100 words)</textarea>
                                </div>
                            </div>
                        </div>
                        {services.map((service) => (
                            <div key={service.id}>
                                <div className="row">
                                    <div className="col-12">
                                        <h4 className='bd_h4'>Service #{service.id}</h4>
                                    </div>
                                    <div className="col-12">
                                        <div className="auth_upload_bussiness_logo">
                                            <input type="file" name="" id="" />
                                            <label htmlFor="">
                                                <div className="aubl_img_container">
                                                    <img className='d-none' src="" alt="" />
                                                    <span className="aic_icon">
                                                        <Image
                                                            src="/images/upload-icon.png"
                                                            width={16}
                                                            height={18}
                                                            className="pb-icon"
                                                            alt="Frame"
                                                        />
                                                    </span>
                                                </div>
                                                <h5>Upload business logo</h5>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row pt-3 gy-4">
                                    <div className="col-12">
                                        <div className="bd_fields">
                                            <input type="text" placeholder='Service Title' />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="bd_fields">
                                            <textarea type="text"  rows="4">Service description text (100 words)</textarea>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="row align-items-center">
                                            <div className="col-2">
                                                <h4 className='sp_h4'>Service Price</h4>
                                            </div>
                                            <div className="col-4">
                                                <div className="bd_fields sp_input">
                                                    <input type="number" />
                                                    <span>$</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='mt-5 text-start hs_btns'>
                            <Link href="business-detail" type="button" className="btn theme-btn2">Continue</Link>
                            <button type="button" className="btn theme-btn3" onClick={addService}>
                                <span>+</span>
                                Add Hair Service
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Page;
