"use client"
import Image from "next/image"
import { FaCheckCircle, FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { CiClock2 } from "react-icons/ci";
import { TbRoad, TbWorld } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { HiBadgeCheck } from "react-icons/hi";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import api from "@/api/axiosInstance";
const AddSettingWrapper = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Setting />
        </Suspense>
    );
};
const Setting = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const employeeId = searchParams.get("employeeId");
    const [employeeData, setEmployeeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!employeeId) {
            router.push("/user/dashboard")
        } else {
            fetchEmployee();
        }
    }, []);

    const fetchEmployee = async () => {
        try {
            setLoading(true);
            // const response = await axios.get(
            //     `${process.env.NEXT_PUBLIC_API_URL}/admin/getEmployee?employeeId=${employeeId}`
            // );
            const response = await api.get(
                `/admin/getEmployee?employeeId=${employeeId}`
            );
            const employees = response.data.data;
            setEmployeeData(employees);
        } catch (error) {
            console.error("Error fetching employees:", error);
            setError(error?.response?.data?.msg || "Error fetching employee");
        } finally {
            setLoading(false);
        }
    };

    // Wait until employeeData is available to avoid destructuring null
    const employeeImage = employeeData?.employeeImage;
    const employeeName = employeeData?.employeeName;
    const about = employeeData?.about;
    const availableServices = employeeData?.availableServices || [];
    const workinDays = employeeData?.workinDays || [];

    return (
        <div className="more_dash w-100 h-100">
            <div className="md_top">
                <Image
                    src="/images/md_banner.png"
                    width={1012}
                    height={334}
                    alt=""
                />
                <div className="md_top_icon">
                    <span><FaHeart /></span>
                    <span><FaShoppingCart /></span>
                </div>
            </div>

            {loading ? (
                <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                    <Spinner borderWidth="border-5" />
                </div>
            ) : error ? (
                <p className="p-5 text-danger">{error}</p>
            ) : !employeeData ? (
                <p className="p-5">No employee details found.</p>
            ) : (
                <div className="md_inner">
                    <div className="md_heading emp_md_heading">
                        <Image
                            src={employeeImage ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${employeeImage}` : "/images/emp_img1.png"}
                            width={80}
                            height={80}
                            alt=""
                        />
                        <h3>{employeeName || "Unknown Person"}</h3>
                    </div>

                    <div className="sd_tabs_container">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="about-tab" data-bs-toggle="tab" data-bs-target="#about-tab-pane" type="button" role="tab" aria-controls="about-tab-pane" aria-selected="true">About</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="services-tab" data-bs-toggle="tab" data-bs-target="#services-tab-pane" type="button" role="tab" aria-controls="services-tab-pane" aria-selected="false">Services</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews-tab-pane" type="button" role="tab" aria-controls="reviews-tab-pane" aria-selected="false">Reviews</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="bio-tab" data-bs-toggle="tab" data-bs-target="#bio-tab-pane" type="button" role="tab" aria-controls="bio-tab-pane" aria-selected="false">BIO</button>
                            </li>
                        </ul>

                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="about-tab-pane" role="tabpanel" aria-labelledby="about-tab">
                                <div className="more_tabs1">
                                    <ul>
                                        <li>
                                            <span><SlLocationPin />
                                            </span>
                                            No 03, Brooklyn, Los Angeles, California
                                        </li>
                                        <li className="align-items-start">
                                            <span className="mt-2"><CiClock2 /></span>
                                            <div className="mts1_wt">
                                                {(() => {
                                                    const formatTime = (time) => {
                                                        const [hour, minute] = time.split(":");
                                                        const hourInt = parseInt(hour, 10);
                                                        const isPM = hourInt >= 12;
                                                        const formattedHour = hourInt % 12 || 12;
                                                        return `${formattedHour}:${minute} ${isPM ? "PM" : "AM"}`;
                                                    };

                                                    const groupedDays = {};
                                                    workinDays.forEach(({ day, startTime, endTime }) => {
                                                        const timeSlot = `${formatTime(startTime)} - ${formatTime(endTime)}`;
                                                        if (!groupedDays[timeSlot]) groupedDays[timeSlot] = [];
                                                        groupedDays[timeSlot].push(day);
                                                    });

                                                    const groups = Object.entries(groupedDays);

                                                    if (groups.length === 1) {
                                                        const [timeSlot, days] = groups[0];
                                                        if (days.length === 7) {
                                                            return <span>Mon - Sun {timeSlot}</span>;
                                                        }
                                                    }

                                                    if (groups.length > 1) {
                                                        const primaryGroup = groups.find(([_, days]) =>
                                                            ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].every(d => days.includes(d))
                                                        );

                                                        const exceptions = groups.filter(([_, days]) => !primaryGroup || days.some(d => !primaryGroup[1].includes(d)));

                                                        if (primaryGroup && exceptions.length) {
                                                            const [primaryTimeSlot] = primaryGroup;
                                                            const exceptionDetails = exceptions.map(([timeSlot, days]) => (
                                                                <span key={timeSlot}>{days.join(", ")} {timeSlot}</span>
                                                            ));
                                                            return (
                                                                <>
                                                                    <span>Mon - Fri {primaryTimeSlot}</span>
                                                                    {exceptionDetails}
                                                                </>
                                                            );
                                                        }
                                                    }

                                                    return workinDays.map(({ day, startTime, endTime }, index) => (
                                                        <span key={index}>
                                                            <strong>{day}</strong>: {formatTime(startTime)} - {formatTime(endTime)}
                                                        </span>
                                                    ));
                                                })()}
                                            </div>
                                        </li>
                                        <li><span><TbRoad /></span>10 Miles away</li>
                                        <li><span><FaStar /></span>4.7 (312)</li>
                                        <li><span><ImProfile /></span>{about || "No description"}</li>
                                    </ul>

                                    <div className="mt1_redirects">
                                        <div className="mt1r">
                                            <div className="d-flex align-items-center gap-4">
                                                <span><MdOutlineMiscellaneousServices /></span>
                                                <div>
                                                    <h5>Services</h5>
                                                    <h4>
                                                        {availableServices.map((service) => service?.title || "No Services available").join(", ")}
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt1r">
                                            <div className="d-flex align-items-center gap-4">
                                                <span><FaStar /></span>
                                                <div>
                                                    <h5>Experience</h5>
                                                    <h4>Not available</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt1r">
                                            <div className="d-flex align-items-center gap-4">
                                                <span><TbWorld /></span>
                                                <div>
                                                    <h5>Languages</h5>
                                                    <h4>Not available</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt1r">
                                            <div className="d-flex align-items-center gap-4">
                                                <span><HiBadgeCheck /></span>
                                                <h4>Not available</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="services-tab-pane" role="tabpanel" aria-labelledby="services-tab" tabIndex="0">
                                <div className="row g-5">
                                    {availableServices.map((service, index) => (
                                        <div key={index} className="col-6">
                                            <div className="service_user_card">
                                                <div className="md_card_img">
                                                    <Image
                                                        src={
                                                            service.subServiceImage && service.serviceImage?.length
                                                                ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${service.serviceImage[0]}`
                                                                : "/images/us1.png"
                                                        }
                                                        width={445}
                                                        height={260}
                                                        alt=""
                                                    />
                                                    <div className="mci_btn">
                                                        <button type="submit" className="theme-btn2 ">
                                                            Booking
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="suc">
                                                    <h4>{service?.title}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* <div className="col-6">
                                        <div className="service_user_card">
                                            <div className="md_card_img">
                                                <Image
                                                    src="/images/us1.png"
                                                    width={445}
                                                    height={260}
                                                    alt=""
                                                />
                                                <div className="mci_btn">
                                                    <button type="submit" className="theme-btn2 ">
                                                        Booking
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="suc">
                                                <h4>Hair Treatments</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="service_user_card">
                                            <div className="md_card_img">
                                                <Image
                                                    src="/images/us1.png"
                                                    width={445}
                                                    height={260}
                                                    alt=""
                                                />
                                                <div className="mci_btn">
                                                    <button type="submit" className="theme-btn2 ">
                                                        Booking
                                                    </button>
                                                </div>
                                            </div>
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
                                    </div> */}
                                </div>
                            </div>
                            <div className="tab-pane fade" id="reviews-tab-pane" role="tabpanel" aria-labelledby="reviews-tab" tabIndex="0">
                                <div className="more_tabs1 more_tabs3">
                                    <h4 className="mb-1">1250 Reviews</h4>
                                    <h5>4.88 out of 5.0</h5>
                                    <ul>
                                        <li>
                                            <div className="d-flex align-items-center gap-4">
                                                <div className="d-flex align-items-center gap-1">
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                </div>
                                                <h4>255</h4>
                                            </div>
                                            <h5>(40%)</h5>
                                        </li>
                                        <li>
                                            <div className="d-flex align-items-center gap-4">
                                                <div className="d-flex align-items-center gap-1">
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                </div>
                                                <h4>200</h4>
                                            </div>
                                            <h5>(37%)</h5>
                                        </li>
                                        <li>
                                            <div className="d-flex align-items-center gap-4">
                                                <div className="d-flex align-items-center gap-1">
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                </div>
                                                <h4>25</h4>
                                            </div>
                                            <h5>(10%)</h5>
                                        </li>
                                        <li>
                                            <div className="d-flex align-items-center gap-4">
                                                <div className="d-flex align-items-center gap-1">
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                </div>
                                                <h4>25</h4>
                                            </div>
                                            <h5>(10%)</h5>
                                        </li>
                                        <li>
                                            <div className="d-flex align-items-center gap-4">
                                                <div className="d-flex align-items-center gap-1">
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                </div>
                                                <h4>010</h4>
                                            </div>
                                            <h5>(2%)</h5>
                                        </li>
                                    </ul>
                                    <div className="review_cards">
                                        <div className="rc1">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-1">
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                </div>
                                                <h5><FaCheckCircle /> Verified appointment</h5>
                                            </div>
                                            <p>The strong pressure of this treatment is great for freeing up tense muscles while realigning muscle tissues and speeding up recovery." says Nadege, our lead therapist "Expect elbow, fist and forearm work with a gradual increase in pressure."</p>
                                        </div>
                                        <div className="rc1">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-1">
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                </div>
                                                <h5><FaCheckCircle /> Verified appointment</h5>
                                            </div>
                                            <p>The strong pressure of this treatment is great for freeing up tense muscles while realigning muscle tissues and speeding up recovery." says Nadege, our lead therapist "Expect elbow, fist and forearm work with a gradual increase in pressure."</p>
                                        </div>
                                        <div className="rc1">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-1">
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                </div>
                                                <h5><FaCheckCircle /> Verified appointment</h5>
                                            </div>
                                            <p>The strong pressure of this treatment is great for freeing up tense muscles while realigning muscle tissues and speeding up recovery." says Nadege, our lead therapist "Expect elbow, fist and forearm work with a gradual increase in pressure."</p>
                                        </div>
                                        <div className="rc1">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-1">
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                </div>
                                                <h5><FaCheckCircle /> Verified appointment</h5>
                                            </div>
                                            <p>The strong pressure of this treatment is great for freeing up tense muscles while realigning muscle tissues and speeding up recovery." says Nadege, our lead therapist "Expect elbow, fist and forearm work with a gradual increase in pressure."</p>
                                        </div>
                                        <div className="rc1">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-1">
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                    <span><FaStar /></span>
                                                </div>
                                                <h5><FaCheckCircle /> Verified appointment</h5>
                                            </div>
                                            <p>The strong pressure of this treatment is great for freeing up tense muscles while realigning muscle tissues and speeding up recovery." says Nadege, our lead therapist "Expect elbow, fist and forearm work with a gradual increase in pressure."</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="bio-tab-pane" role="tabpanel" aria-labelledby="bio-tab" tabIndex="0">
                                <div className="md_bio_tab">
                                    <h3>Bio</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet enim ac enim pretium ornare. Aenean sagittis libero vitae metus cursus tincidunt. Ut eget imperdiet lacus, nec pretium justo. Etiam ac nunc tellus. Pellentesque sed accumsan ex. Aliquam dictum imperdiet est, ut faucibus quam eleifend nec. Aliquam eleifend erat vel pulvinar dapibus. Morbi sodales mauris nec placerat rutrum. Sed quam quam, luctus vitae commodo nec,</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet enim ac enim pretium ornare. Aenean sagittis libero vitae metus cursus tincidunt. Ut eget imperdiet lacus, nec pretium justo. Etiam ac nunc tellus. Pellentesque sed accumsan ex. Aliquam dictum imperdiet est, ut faucibus quam eleifend nec. Aliquam eleifend erat vel pulvinar dapibus. Morbi sodales mauris nec placerat rutrum. Sed quam quam, luctus vitae commodo nec,</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet enim ac enim pretium ornare. Aenean sagittis libero vitae metus cursus tincidunt. Ut eget imperdiet lacus, nec pretium justo. Etiam ac nunc tellus. Pellentesque sed accumsan ex. Aliquam dictum imperdiet est, ut faucibus quam eleifend nec. Aliquam eleifend erat vel pulvinar dapibus. Morbi sodales mauris nec placerat rutrum. Sed quam quam, luctus vitae commodo nec,</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet enim ac enim pretium ornare. Aenean sagittis libero vitae metus cursus tincidunt. Ut eget imperdiet lacus, nec pretium justo. Etiam ac nunc tellus. Pellentesque sed accumsan ex. Aliquam dictum imperdiet est, ut faucibus quam eleifend nec. Aliquam eleifend erat vel pulvinar dapibus. Morbi sodales mauris nec placerat rutrum. Sed quam quam, luctus vitae commodo nec,</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddSettingWrapper;
