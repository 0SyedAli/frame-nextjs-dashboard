import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { PiPencilSimpleLineBold } from 'react-icons/pi';
const AddService = () => {
  return (
    <div className='add_service_dash'>
      <div className="asd_head">
        <span className="ah_label">Skin Treatment</span>
        <div className="add_arrows">
          <span><IoIosArrowBack /></span>
          <span><IoIosArrowForward /></span>
        </div>
      </div>
      <div className="asd_body">
        <div className="asd_body_head">
          <h4>Service Title</h4>
          <h4>$350 / treatment</h4>
        </div>
        <div className="asd_body_inner">
          <div className="abi_img">
            <Image
              src="/images/emp_img1.png"
              width={144}
              height={144}
              className="d-none"
              alt="Frame"
            />
          </div>
          <div className='ab_se'>
            <h5>About the Service</h5>
            <Link href="add-service"><h5 style={{ color: '#51004F' }}><span><PiPencilSimpleLineBold /></span>Edit details</h5></Link>
          </div>
          <p>Microneedling is a non-surgical cosmetic procedure designed to stimulate collagen production and improve skin texture and tone. This service uses fine needles to create tiny, controlled micro-injuries on the skin's surface, triggering the body's natural healing response. As a result, new collagen and elastin fibers form, giving the skin a smoother, firmer, and more youthful appearance. It reduces fine lines, wrinkles, acne scars, and large pores.</p>
          <p>Microneedling is minimally invasive and can be customized based on skin type and specific concerns. It is a popular treatment for individuals seeking to rejuvenate their skin without the dow ntime associated with more aggressiv   e procedures. The therapy promotes gradual yet noticeable results, making it a go-to for those looking to achieve radiant, healthy skin.</p>
          <h5 className='mt-4'>Process</h5>
          <ul className='ab_ul'>
            <li><strong style={{ color: '#1A1615' }}>Consultation and Skin Analysis</strong> - The service begins with a professional consultation to assess your skin's condition and determine the appropriate depth and technique for microneedling.</li>
            <li><strong style={{ color: '#1A1615' }}>Cleansing and Numbing</strong> - Your skin is thoroughly cleansed to remove any impurities. A topical numbing cream is applied to ensure a comfortable experience during the procedure.</li>
            <li><strong style={{ color: '#1A1615' }}>Consultation and Skin Analysis</strong> - The service begins with a professional consultation to assess your skin's condition and determine the appropriate depth and technique for microneedling.</li>
            <li><strong style={{ color: '#1A1615' }}>Consultation and Skin Analysis</strong> - The service begins with a professional consultation to assess your skin's condition and determine the appropriate depth and technique for microneedling.</li>
            <li><strong style={{ color: '#1A1615' }}>Cleansing and Numbing</strong> - Your skin is thoroughly cleansed to remove any impurities. A topical numbing cream is applied to ensure a comfortable experience during the procedure.</li>
          </ul>
        </div>
        <div>
          <button className="btn theme-btn2">Continue</button>
        </div>
      </div>
    </div>
  )
}

export default AddService