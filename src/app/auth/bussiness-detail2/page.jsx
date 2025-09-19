"use client"
import MultiRangeSlider2 from '@/components/MultiRangeSlider2'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from "react";
import { useRouter } from "next/navigation";
const services = [
    { id: 1, title: "Hair", value: "Hair Services", img: "/images/asi_img1.png", width: 75, height: 79 },
    { id: 2, title: "Nails", value: "Nail Services", img: "/images/asi_img2.png", width: 54, height: 70 },
    { id: 3, title: "Skin", value: "Skin Services", img: "/images/asi_img3.png", width: 71, height: 67 },
    { id: 4, title: "Other", value: "Other Services", img: "/images/asi_img4.png", width: 46, height: 46 },
];

const BussinessDetail = () => {
    const router = useRouter();
    const [selectedService, setSelectedService] = useState(null);

    const handleServiceClick = (serviceValue) => {
        const newSelectedService = selectedService === serviceValue ? null : serviceValue;
        setSelectedService(newSelectedService);
        if (newSelectedService) {
            router.push(`/auth/add-services?service=${encodeURIComponent(newSelectedService)}`);
        }
    };

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
                            <input type="file" accept="image/*" required onChange={handleFileChange} />
                            {formData.businessImage ? (
                                <img src={URL.createObjectURL(formData.businessImage)} alt="Preview" />
                            ) : (
                                <label>
                                    <div className="aubl_img_container">
                                        <span className="aic_icon">
                                            <Image src="/images/upload-icon.png" width={16} height={18} alt="Frame" />
                                        </span>
                                    </div>
                                    <h5>Upload business logo *</h5>
                                </label>
                            )}
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
                                        <option>city 1</option>
                                        <option>city</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="bd_fields">
                                    <textarea type="text">Address</textarea>
                                </div>
                            </div>
                        </div>
                        <div className="avail_serv pt-3">
                            <div className="pb-4">
                                <h4>Available Services </h4>
                            </div>
                            <div className='avail_serve_container'>
                                {services.map((service) => (
                                    <div key={service.id} className="">
                                        <label className="as_item">
                                            <input
                                                type="checkbox"
                                                checked={selectedService === service.value}
                                                onChange={() => handleServiceClick(service.value)}
                                            />
                                            <Image
                                                src={service.img}
                                                width={service.width}
                                                height={service.height}
                                                className="pb-icon"
                                                alt={service.title}
                                            />
                                            <h5>{service.title}</h5>
                                        </label>
                                    </div>
                                ))}

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
                                <div className="auth_form_check auth_form_check2">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked232" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked232">
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
                                <div className="auth_form_check auth_form_check2">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked232" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked232">
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
                                <div className="auth_form_check auth_form_check2">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked232" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked232">
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
                                <div className="auth_form_check auth_form_check2">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked232" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked232">
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
                                <div className="auth_form_check auth_form_check2">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked232" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked232">
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
                                <div className="auth_form_check auth_form_check2">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked232" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked232">
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
                                <div className="auth_form_check auth_form_check2">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked232" />
                                    <label className="form-check-label" htmlFor="flexCheckChecked232">
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

export default BussinessDetail