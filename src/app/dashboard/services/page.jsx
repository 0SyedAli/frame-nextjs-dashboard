"use client";

import { useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllServices, fetchSubServices } from "../../../lib/slices/servicesSlice";
import Image from "next/image";
import Link from "next/link";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { useRouter } from "next/navigation";

const ServicesDashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const token = localStorage.getItem("token");
  const { servicesData, serviceIds, loading } = useSelector((state) => state.services);

  useLayoutEffect(() => {
    if (token && !Object.keys(serviceIds).length) {
      dispatch(fetchAllServices(token));
    }
  }, [dispatch, token, serviceIds]);

  useEffect(() => {
    if (Object.keys(serviceIds).length) {
      Object.entries(serviceIds).forEach(([category, serviceId]) => {
        dispatch(fetchSubServices({ category, serviceId }));
      });
    }
  }, [dispatch, serviceIds]);

  const handleEdit = (service) => {
    // Navigate to edit page with service ID (Alternative: Open Modal)
    router.push(`/dashboard/services/edit/${service._id}`);
  };

  const renderServices = (category) => {
    const services = servicesData[category] || [];
    if (services.length === 0) {
      return <p>No services found for {category}.</p>;
    }

    return services.map((service) => (
      <div className="col-4 sd_card" key={service._id}>
        <span onClick={() => handleEdit(service)} style={{ cursor: "pointer" }}>
          <PiPencilSimpleLineBold />
        </span>
        <Link href={`services/${service._id}`}>
          <div className="sd_item">
            <div className="sd_item_img">
              <Image
                src={
                  service.subServiceImage?.[0]
                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${service.subServiceImage[0]}`
                    : "/images/default_service.png"
                }
                width={144}
                height={144}
                className="emp_img"
                alt={service.title || "Service Image"}
              />

            </div>
            <div className="sd_item_content">
              <h4>{service.title}</h4>
              <p className="mb-3">{service.text || "Description not available"}</p>
              <p>Price: ${service.price || "N/A"}</p>
            </div>
          </div>
        </Link>
      </div>
    ));
  };

  return (
    <div className="services_dash w-100">
      {loading ? (
        <p>Loading services...</p>
      ) : (
        <>
          <div className="d-flex align-items-center gap-4">
            <h3 className="mb-0">Hair Services</h3>
            {/* <div className="add_service_btn5">
              Add Subservice
              <span>+</span>
            </div> */}
          </div>
          <div className="row mt-3 mb-5">{renderServices("hairservices")}</div>

          <h3>Nails Services</h3>
          <div className="row mt-3 mb-5">{renderServices("nailservices")}</div>

          <h3>Skin Services</h3>
          <div className="row mt-3 mb-5">{renderServices("skinservices")}</div>

          <h3>Other Services</h3>
          <div className="row mt-3 mb-5">{renderServices("othersservices")}</div>
        </>
      )}
    </div>
  );
};

export default ServicesDashboard;
