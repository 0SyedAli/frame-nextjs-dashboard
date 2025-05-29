"use client"
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import { FaStar } from "react-icons/fa";
import { GrMap } from "react-icons/gr";
import { IoLocationOutline, IoCart } from "react-icons/io5";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bussinessProfiles, setBussinessProfiles] = useState([]); // State to store fetched services
  const router = useRouter();

  const handleRedirect = (adminId) => {
    router.push(`/user/dashboard/service?adminId=${adminId}`);
  };

  const fetchProfiles = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/allBusinessProfiles`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userAccessToken")}`,
          },
        }
      );

      // Assuming response contains services data
      setBussinessProfiles(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="w-100 user-dashboard py-5">
      <div className="dash_top_header">
        <div className="dtu_top">
          <div className="dt_select_location">
            <span> <IoLocationOutline /></span>
            <label htmlFor="select_location" className="select_location">Location</label>
            <select name="" id="select_location">
              <option value="Lakewood, California">Lakewood, California</option>
            </select>
          </div>
          <div className="dsl_icons">
            <span><IoCart /></span>
            <span><HiOutlineBellAlert /></span>
          </div>
        </div>
      </div>
      <div className="dash_user_home">
        <div className="du_search">
          <span><BsSearch /></span>
          <input type="search" placeholder="Search Stylists" id="" />
        </div>
        <div className="du_banner">
          <h3>Morning Special!</h3>
          <h2>Get 20% Off</h2>
          <p>on All Hair Treatment Between 9-10 AM.</p>
          <button className="book_btn btn">Book Now</button>
        </div>
        <div className="du_service_tab_container">
          <h3>Services</h3>
          <div className="dst_menu">
            <div className="dst_nav active">
              <Image
                src="/images/dn1.svg"
                width={19}
                height={19}
                alt=""
              />
              <span>
                Massage
              </span>
            </div>
            <div className="dst_nav">
              <Image
                src="/images/dn2.svg"
                width={19}
                height={19}
                alt=""
              />
              <span>
                Hair Treatment
              </span>
            </div>
            <div className="dst_nav">
              <Image
                src="/images/dn3.svg"
                width={19}
                height={19}
                alt=""
              />
              <span>
                Hair Color
              </span>
            </div>
          </div>
          <div className="near_salo">
            <h3>Nearby Salons</h3>
            <h6>
              <span><GrMap /></span>
              View on Map
            </h6>
          </div>
          <div className="row g-4">
            {isLoading ?
              <div className="custom_skeleton a">
                <Skeleton
                  height={120}
                  borderRadius={"10px"}
                />
                <Skeleton
                  height={120}
                  borderRadius={"10px"}
                />
              </div>
              // </SkeletonTheme>
              : (bussinessProfiles.map((profile, index) => (
                <div
                  key={index}
                  className="col-12 col-md-6 col-xxl-5"
                  onClick={() => handleRedirect(profile.adminId)}
                  style={{ cursor: 'pointer' }} // Optional: Makes the div appear clickable
                >
                  <div className="dm_card">
                    <Image
                      src={profile.profileImage ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${profile.profileImage}` : "/images/dc1.svg"}
                      width={115}
                      height={115}
                      alt=""
                    />
                    <div className="dc_content">
                      <h4>{profile.businessName} <span>2 mi</span></h4>
                      <h5>
                        <span><SlLocationPin /></span>
                        Lakewood, California
                      </h5>
                      <div className="dc_star">
                        <span><FaStar /></span>
                        <h6>4.7 <span>(312)</span></h6>
                      </div>
                    </div>
                  </div>
                </div>
              )))}
          </div>
        </div>
      </div>
    </div>
  );
}


export default Dashboard;