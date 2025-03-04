"use client"
import MultiRangeSlider2 from '@/components/MultiRangeSlider2'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const page = () => {
    return (
        <div className="content w-100">
            <div className="auth_container bussiness">
                <div className="auth_head">
                    <h2>Business Details</h2>
                    <p>Enter your business info to customize your Fraime experience</p>
                </div>
                <div className='w-100'>
                    <form>
                        <div className="auth_upload_bussiness_logo">
                            <input type="file" name="" id="" />
                            <label htmlFor="">
                                <div className="aubl_img_container">
                                    <img src="" alt="" />
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
                        <div className="row pt-4 gy-4">
                            <div className="col-6">
                                <div className="bd_fields">
                                    <input type="text" placeholder='Business Name' />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="bd_fields">
                                    <input type="text" placeholder='Username ' />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="bd_fields">
                                    <select>
                                        <option value="">Select City</option>
                                        <option>abc</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="bd_fields">
                                    <textarea type="text">Address</textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row avail_serv pt-3">
                            <div className="col-12 pb-4">
                                <h4>Available Services </h4>
                            </div>
                            <div className="col-3">
                                <Link href="hair-services">
                                    <div className="as_item">
                                        <Image
                                            src="/images/asi_img1.png"
                                            width={75}
                                            height={79}
                                            className="pb-icon"
                                            alt="Frame"
                                        />
                                        <h5>Hair</h5>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-3">
                                <Link href="hair-services">
                                    <div className="as_item">
                                        <Image
                                            src="/images/asi_img2.png"
                                            width={54}
                                            height={70}
                                            className="pb-icon"
                                            alt="Frame"
                                        />
                                        <h5>Nails</h5>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-3">
                                <Link href="hair-services">
                                    <div className="as_item">
                                        <Image
                                            src="/images/asi_img3.png"
                                            width={71}
                                            height={67}
                                            className="pb-icon"
                                            alt="Frame"
                                        />
                                        <h5>Skin</h5>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-3">
                                <Link href="hair-services">
                                    <div className="as_item">
                                        <Image
                                            src="/images/asi_img4.png"
                                            width={46}
                                            height={46}
                                            className="pb-icon"
                                            alt="Frame"
                                        />
                                        <h5>Other</h5>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="row timings mt-5">
                            <div className="col-6">
                                <h4>Working Days </h4>
                            </div>
                            <div className="col-6">
                                <h4>Hours of Operation</h4>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-3">
                                <div class="auth_form_check auth_form_check2">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked232" />
                                    <label class="form-check-label" for="flexCheckChecked232">
                                        MONDAY
                                    </label>
                                </div>
                            </div>
                            <div className="col-9">
                                <div className="multi_range">
                                    <MultiRangeSlider2 />
                                    <span className='multi_range_center'>12:00</span>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-3">
                                <div class="auth_form_check auth_form_check2">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked232" />
                                    <label class="form-check-label" for="flexCheckChecked232">
                                        Tuesday
                                    </label>
                                </div>
                            </div>
                            <div className="col-9">
                                <div className="multi_range">
                                    <MultiRangeSlider2 />
                                    <span className='multi_range_center'>12:00</span>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-3">
                                <div class="auth_form_check auth_form_check2">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked232" />
                                    <label class="form-check-label" for="flexCheckChecked232">
                                        Wednesday
                                    </label>
                                </div>
                            </div>
                            <div className="col-9">
                                <div className="multi_range">
                                    <MultiRangeSlider2 />
                                    <span className='multi_range_center'>12:00</span>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-3">
                                <div class="auth_form_check auth_form_check2">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked232" />
                                    <label class="form-check-label" for="flexCheckChecked232">
                                        Thursday
                                    </label>
                                </div>
                            </div>
                            <div className="col-9">
                                <div className="multi_range">
                                    <MultiRangeSlider2 />
                                    <span className='multi_range_center'>12:00</span>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-3">
                                <div class="auth_form_check auth_form_check2">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked232" />
                                    <label class="form-check-label" for="flexCheckChecked232">
                                        Friday
                                    </label>
                                </div>
                            </div>
                            <div className="col-9">
                                <div className="multi_range">
                                    <MultiRangeSlider2 />
                                    <span className='multi_range_center'>12:00</span>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-3">
                                <div class="auth_form_check auth_form_check2">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked232" />
                                    <label class="form-check-label" for="flexCheckChecked232">
                                        Saturday
                                    </label>
                                </div>
                            </div>
                            <div className="col-9">
                                <div className="multi_range">
                                    <MultiRangeSlider2 />
                                    <span className='multi_range_center'>12:00</span>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-3">
                                <div class="auth_form_check auth_form_check2">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked232" />
                                    <label class="form-check-label" for="flexCheckChecked232">
                                        Sunday
                                    </label>
                                </div>
                            </div>
                            <div className="col-9">
                                <div className="multi_range">
                                    <MultiRangeSlider2 />
                                    <span className='multi_range_center'>12:00</span>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5 text-start'>
                            <Link href="/dashboard" className="theme-btn2">Continue</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default page