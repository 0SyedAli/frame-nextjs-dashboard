"use client"
import axios from "axios";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import { useRouter, useSearchParams } from "next/navigation";

const AddSubServicesWrapper = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SubServices />
        </Suspense>
    );
};

const SubServices = () => {
    const searchParams = useSearchParams(); // No destructuring
    const serviceId = searchParams.get("serviceId");
    const serviceTitle = searchParams.get("serviceTitle");
    const [subServices, setSubServices] = useState("")
    const [loading, setLoading] = useState(true)
    // const router = useRouter();

    useEffect(() => {
        fetchSubServices();
    }, [])

    const fetchSubServices = async () => {
        try {
            setLoading(true); // Start loading
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/getSubServicesByServiceId?serviceId=${serviceId}`
            );

            if (response.data.success) {
                const employees = response.data.data;
                setSubServices(employees); // Update employees state
            } else {
                console.error("Failed to fetch employees:", response.data.msg);
            }
        } catch (error) {
            console.error("Error fetching employees:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // const handleRedirect = (serviceId) => {
    //     router.push(`/user/dashboard/setting?serviceId=${serviceId}`)
    // }
    return (
        <div className="service_dash w-100">
            <div className="sd_top">
                <h2>{serviceTitle}</h2>
                <span><IoCartSharp /></span>
            </div>
            <div className="ss_main_body">
                <div className="row g-5">
                    {loading ?
                        (
                            <>
                                <div className="custom_skeleton a">
                                    <Skeleton
                                        height={220}
                                        borderRadius={"10px"}
                                    />
                                    <Skeleton
                                        height={220}
                                        borderRadius={"10px"}
                                    />
                                </div>
                                <div className="custom_skeleton a">
                                    <Skeleton
                                        height={220}
                                        borderRadius={"10px"}
                                    />
                                    <Skeleton
                                        height={220}
                                        borderRadius={"10px"}
                                    />
                                </div>
                            </>
                        )
                        : (
                            Array.isArray(subServices) && subServices.length > 0 ? (
                                subServices.map((subService, index) => (

                                    <div key={index} className="col-6">
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
                                                <h4>{subService?.title}</h4>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No services available</p>
                            )
                        )}
                </div>
            </div>
        </div>
    )
}

export default AddSubServicesWrapper