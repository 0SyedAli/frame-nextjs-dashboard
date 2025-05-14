"use client"
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllServices, fetchSubServices } from "../../../lib/slices/servicesSlice";
import Image from "next/image";
import Link from "next/link";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";

const ServicesDashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [hasFetchedServices, setHasFetchedServices] = useState(false); // New state to track API call

  const { servicesData, serviceIds, loading } = useSelector((state) => state.services);

  useEffect(() => {
    // Ensure this runs only on the client
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token && !hasFetchedServices && !Object.keys(serviceIds).length) {
      dispatch(fetchAllServices(token));
      setHasFetchedServices(true); // Mark that the API call has been made
    }
  }, [dispatch, token, hasFetchedServices, serviceIds]);

  useEffect(() => {
    if (Object.keys(serviceIds).length) {
      Object.entries(serviceIds).forEach(([category, serviceId]) => {
        dispatch(fetchSubServices({ category, serviceId }));
      });
    }
  }, [dispatch, serviceIds]);

  const handleEdit = (service) => {
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
                    : ""
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
    <div className="services_dash w-100 position-relative">
      {loading ? (
        <p>Loading services...</p>
      ) : (
        <>
          <Link className="btn add_appointment" href="/dashboard/add-subservice">Add Sub-service</Link>
          <div className="d-flex align-items-center gap-4">
            <h3 className="mb-0">Hair Services</h3>
          </div>
          <div className="row mt-3 mb-5 flex-nowrap py-4" style={{ overflow: "auto", scrollBehavior: "smooth" }}>{renderServices("hairservices")}</div>

          <h3>Nails Services</h3>
          <div className="row mt-3 mb-5 flex-nowrap py-4" style={{ overflow: "auto", scrollBehavior: "smooth" }}>{renderServices("nailservices")}</div>

          <h3>Skin Services</h3>
          <div className="row mt-3 mb-5 flex-nowrap py-4" style={{ overflow: "auto", scrollBehavior: "smooth" }}>{renderServices("skinservices")}</div>

          <h3>Other Services</h3>
          <div className="row mt-3 mb-5 flex-nowrap py-4" style={{ overflow: "auto", scrollBehavior: "smooth" }}>{renderServices("othersservices")}</div>
        </>
      )}
    </div>
  );
};

const ProtectedServicesDashboard = () => (
  <AuthGuard>
    <ServicesDashboard />
  </AuthGuard>
);

export default ProtectedServicesDashboard;
