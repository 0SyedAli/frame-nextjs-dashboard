"use client"
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';
import Image from 'next/image';
import { PiPencilSimpleLineBold } from 'react-icons/pi';
import Spinner from '@/components/Spinner';
import AuthGuard from '@/components/AuthGuard';

const ServiceDetail = () => {
  const { subServiceId } = useParams();// Extract the serviceId from the URL

  const [serviceDetails, setServiceDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!subServiceId) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/getSubserviceById?subServiceId=${subServiceId}`);
        setServiceDetails(response.data.data);
      } catch (err) {
        setError('Failed to fetch service details.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subServiceId]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  if (!serviceDetails) return <p>No service details found.</p>;

  return (
    // <div>
    //   <h1>{serviceDetails.title}</h1>
    //   <p>Price: ${serviceDetails.price}</p>
    //   <p>{serviceDetails.text}</p>
    //   {serviceDetails.subServiceImage && (
    //     <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${serviceDetails.subServiceImage[0]}`} alt={serviceDetails.title} />
    //   )}
    // </div>
    <div className='add_service_dash pt-0'>
      {/* <div className="asd_head">
        <span className="ah_label">{serviceDetails.title}</span>
        <div className="add_arrows">
          <span><IoIosArrowBack /></span>
          <span><IoIosArrowForward /></span>
        </div>
      </div> */}
      <div className="asd_body">
        <div className="asd_body_head">
          <h4>{serviceDetails.title}</h4>
          <h4>${serviceDetails.price} / treatment</h4>
        </div>
        <div className="asd_body_inner">
          <div className="abi_img">

            {serviceDetails.subServiceImage && (
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${serviceDetails.subServiceImage[0]}`}
                width={144}
                height={144}
                alt={serviceDetails.title}
              />
            )}
          </div>
          <div className='ab_se'>
            <h5>About</h5>
            <Link href={`/dashboard/services/edit/${subServiceId}`}><h5 style={{ color: '#51004F' }}><span><PiPencilSimpleLineBold /></span>Edit details</h5></Link>
          </div>
          <p>
            {serviceDetails.text}
          </p>
          {/* <p>Microneedling is a non-surgical cosmetic procedure designed to stimulate collagen production and improve skin texture and tone. This service uses fine needles to create tiny, controlled micro-injuries on the skin's surface, triggering the body's natural healing response. As a result, new collagen and elastin fibers form, giving the skin a smoother, firmer, and more youthful appearance. It reduces fine lines, wrinkles, acne scars, and large pores.</p>
          <p>Microneedling is minimally invasive and can be customized based on skin type and specific concerns. It is a popular treatment for individuals seeking to rejuvenate their skin without the dow ntime associated with more aggressiv   e procedures. The therapy promotes gradual yet noticeable results, making it a go-to for those looking to achieve radiant, healthy skin.</p>
          <h5 className='mt-4'>Process</h5>
          <ul className='ab_ul'>
            <li><strong style={{ color: '#1A1615' }}>Consultation and Skin Analysis</strong> - The service begins with a professional consultation to assess your skin's condition and determine the appropriate depth and technique for microneedling.</li>
            <li><strong style={{ color: '#1A1615' }}>Cleansing and Numbing</strong> - Your skin is thoroughly cleansed to remove any impurities. A topical numbing cream is applied to ensure a comfortable experience during the procedure.</li>
            <li><strong style={{ color: '#1A1615' }}>Consultation and Skin Analysis</strong> - The service begins with a professional consultation to assess your skin's condition and determine the appropriate depth and technique for microneedling.</li>
            <li><strong style={{ color: '#1A1615' }}>Consultation and Skin Analysis</strong> - The service begins with a professional consultation to assess your skin's condition and determine the appropriate depth and technique for microneedling.</li>
            <li><strong style={{ color: '#1A1615' }}>Cleansing and Numbing</strong> - Your skin is thoroughly cleansed to remove any impurities. A topical numbing cream is applied to ensure a comfortable experience during the procedure.</li>
          </ul> */}
        </div>
        <div className='d-flex align-items-center gap-5'>
        <Link className="btn theme-btn2" href="/dashboard/services">Go back</Link>
          <Link className="btn theme-btn2" href="/dashboard/add-subservice">Add Sub-service</Link>
        </div>
      </div>
    </div>
  );
};

const ProtectedServiceDetailDashboard = () => (
  <AuthGuard>
    <ServiceDetail />
  </AuthGuard>
);

export default ProtectedServiceDetailDashboard;
