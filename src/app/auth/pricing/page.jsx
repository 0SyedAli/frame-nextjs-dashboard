import Image from "next/image";
import Link from "next/link";
import { FaCheck } from "react-icons/fa6";
const page = () => {
    return (
        <div className="content w-100">
            <div className="auth_container pricing">
                <div className="auth_head">
                    <h2>Pricing</h2>
                    <p>Get started in minutes and transform your business</p>
                </div>
                <div className="pricing_container">
                    <div className="pricing_item">
                        <Link href="biling-details" prefetch={true}>
                            <div className="row">
                                <div className="col-4">
                                    <div className="pi_left">
                                        <h5>Basic</h5>
                                        <h2>$45.<span>00</span></h2>
                                        <p>billed every month</p>
                                        <button className="btn pi-btn-white">Get Started</button>
                                        <p>01 user</p>
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="pi_right">
                                        <p>Access these features when you get this pricing package for your business.</p>
                                        <ul>
                                            <li><span><FaCheck /></span>Sed ut perspiciatis unde omnis</li>
                                            <li><span><FaCheck /></span>Sed ut perspiciatis unde omnis unde omnis</li>
                                            <li><span><FaCheck /></span>Sed ut perspiciatis unde</li>
                                            <li><span><FaCheck /></span>Sed ut perspiciatis unde omnis</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="pricing_item">
                        <Link href="biling-details" prefetch={true}>
                            <div className="row">
                                <div className="col-4">
                                    <div className="pi_left">
                                        <h5>Premium</h5>
                                        <h2>$75.<span>00</span></h2>
                                        <p>billed every month</p>
                                        <button className="btn pi-btn-white">Get Started</button>
                                        <p>2-5 user</p>
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="pi_right">
                                        <p>Access these features when you get this pricing package for your business.</p>
                                        <ul>
                                            <li><span><FaCheck /></span>Sed ut perspiciatis unde omnis</li>
                                            <li><span><FaCheck /></span>Sed ut perspiciatis unde omnis unde omnis</li>
                                            <li><span><FaCheck /></span>Sed ut perspiciatis unde</li>
                                            <li><span><FaCheck /></span>Sed ut perspiciatis unde omnis</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="pricing_item">
                        <Link href="biling-details" prefetch={true}>
                            <div className="row">
                                <div className="col-4">
                                    <div className="pi_left">
                                        <h5>Premium PRO</h5>
                                        <h2>$95.<span>00</span></h2>
                                        <p>billed every month</p>
                                        <button className="btn pi-btn-white">Get Started</button>
                                        <p>6-10 user</p>
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="pi_right">
                                        <p>Access these features when you get this pricing package for your business.</p>
                                        <ul>
                                            <li><span><FaCheck /></span>Sed ut perspiciatis unde omnis</li>
                                            <li><span><FaCheck /></span>Sed ut perspiciatis unde omnis unde omnis</li>
                                            <li><span><FaCheck /></span>Sed ut perspiciatis unde</li>
                                            <li><span><FaCheck /></span>Sed ut perspiciatis unde omnis</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="pricing_item">
                        <div className="row">
                            <div className="col-4">
                                <div className="pi_left pir_left">
                                    <h5>Use Referral Code</h5>
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="pi_right pir_input">
                                    <input type="text" placeholder="enter code" />
                                    <button className="btn btn-brown">SUBMIT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="progess-container">
                    <h4>PROGRESS</h4>
                    <div className="progress_item"></div>
                    <h4>20%</h4>
                </div>
                <div className="progess-bottom-icons">
                    <div className="pbi_inner">
                        <div className="pbi_item">
                            <Image
                                src="/images/pricing_bottom1.png"
                                width={36}
                                height={36}
                                className="pb-icon"
                                alt="Frame"
                            />
                            <h5>14 days<br />
                                free trial</h5>
                        </div>
                        <div className="pbi_item">
                            <Image
                                src="/images/pricing_bottom2.png"
                                width={36}
                                height={36}
                                className="pb-icon"
                                alt="Frame"
                            />
                            <h5>No setup fees<br />
                                100% hassle-free</h5>
                        </div>
                        <div className="pbi_item">
                            <Image
                                src="/images/pricing_bottom3.png"
                                width={36}
                                height={36}
                                className="pb-icon"
                                alt="Frame"
                            />
                            <h5>Anytime<br />
                                Cancelation</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page