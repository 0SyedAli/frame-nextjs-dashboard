"use client"
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoCartSharp } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";

const AddServiceWrapper = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Service />
        </Suspense>
    );
};

const Service = () => {
    const [employees, setEmployees] = useState()
    const [loading, setLoading] = useState(true)
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState("");
    const [services, setServices] = useState([]); // State to store fetched services
    const searchParams = useSearchParams();
    const router = useRouter();
    const adminId = searchParams.get("adminId");

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            setToken(storedToken)
        } else {
            router.push("/auth/login");
        }
    }, [router]); // Runs once on mount

    useEffect(() => {
        fetchEmployees();
        fetchServices();
    }, [])



    const fetchEmployees = async () => {
        try {
            setLoading(true); // Start loading
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllStylists?adminId=${adminId}`
            );

            if (response.data.success) {
                const employees = response.data.data;
                setEmployees(employees); // Update employees state
            } else {
                console.error("Failed to fetch employees:", response.data.msg);
            }
        } catch (error) {
            console.error("Error fetching employees:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const fetchServices = async () => {
        try {
            setIsLoading(true); // Start loading
            const response = await axios.get(
                   `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllServices?adminId=${adminId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                const employees = response.data.data;
                setServices(employees); // Update employees state
            } else {
                console.error("Failed to fetch employees:", response.data.msg);
            }
        } catch (error) {
            console.error("Error fetching employees:", error);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };
    const handleRedirect = (serviceId, serviceTitle) => {
        router.push(`/user/dashboard/sub-services?serviceId=${serviceId}&serviceTitle=${serviceTitle}`)
    }
    const handleRedirectEmployee = (employeeId) => {
        router.push(`/user/dashboard/setting?employeeId=${employeeId}`)
    }
    return (
        <div className="service_dash w-100">
            <div className="sd_top">
                <h2>Haircut & Styling</h2>
                <span><IoCartSharp /></span>
            </div>
            <div className="sd_tabs_container">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Book By Treatment</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Stylist</button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
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
                                    Array.isArray(services) && services.length > 0 ? (
                                        services.map((service, index) => (
                                            <div
                                                key={index}
                                                className="col-6"
                                                onClick={() => handleRedirect(service._id, service.Title)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className="service_user_card">
                                                    <Image
                                                        src={service.serviceImage ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${service.serviceImage}` : "/images/us2.png"}
                                                        width={445}
                                                        height={260}
                                                        alt=""
                                                    />
                                                    <div className="suc">
                                                        <h4>{service.Title}</h4>
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
                    <div className="tab-pane fade " id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                        <div className="row mb-4">
                            {isLoading ? (
                                <>
                                    <div className="custom_skeleton a mb-4">
                                        <Skeleton
                                            height={220}
                                            borderRadius={"10px"}
                                        />
                                        <Skeleton
                                            height={220}
                                            borderRadius={"10px"}
                                        />
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
                            ) : (
                                Array.isArray(employees) && employees.length > 0 ? (
                                    employees.map((employee, index) => (
                                        <div
                                            key={index}
                                            className="col-3"
                                            onClick={() => handleRedirectEmployee(employee?._id)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className="salon_card">
                                                <Image
                                                    src={
                                                        employee?.employeeImage
                                                            ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${employee.employeeImage}`
                                                            : "/images/sc1.svg"
                                                    }
                                                    width={350}
                                                    height={150}
                                                    alt={`${employee?.employeeName || "Employee"} Image`}
                                                />
                                                <div className="sc_content">
                                                    <h4>{employee?.employeeName || "Unknown Employee"}</h4>
                                                    <div className="d-flex w-100 align-items-center justify-content-between">
                                                        <h5>{employee?.reviewsCount || "0"} Reviews</h5>
                                                        <h5>
                                                            <span><FaStar /></span>
                                                            {employee?.rating || "0.0"}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No employees available</p> // Fallback message if `employees` is not an array or empty
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddServiceWrapper