import Image from "next/image"
import { FaHeart, FaShoppingCart, FaStar, FaCheckCircle } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { CiClock2 } from "react-icons/ci";
import { TbRoad } from "react-icons/tb";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const Setting = () => {
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
            <div className="md_inner">
                <div className="md_heading">
                    <h3>Jazy Dewo</h3>
                </div>
                <div className="sd_tabs_container">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="about-tab" data-bs-toggle="tab" data-bs-target="#about-tab-pane" type="button" role="tab" aria-controls="about-tab-pane" aria-selected="true">About</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="services-tab" data-bs-toggle="tab" data-bs-target="#services-tab-pane" type="button" role="tab" aria-controls="services-tab-pane" aria-selected="false">Services</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews-tab-pane" type="button" role="tab" aria-controls="reviews-tab-pane" aria-selected="false">Reviews</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="bio-tab" data-bs-toggle="tab" data-bs-target="#bio-tab-pane" type="button" role="tab" aria-controls="bio-tab-pane" aria-selected="false">BIO</button>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="about-tab-pane" role="tabpanel" aria-labelledby="about-tab" tabindex="0">
                            <div className="more_tabs1">
                                <ul>
                                    <li><span><SlLocationPin /></span>No 03,Brooklyn, Los Angeles, California</li>
                                    <li><span><CiClock2 /></span>9AM-10PM, Mon -Sun</li>
                                    <li><span><TbRoad /></span>10 Miles away</li>
                                    <li><span><FaStar /></span>4.7 (312)</li>
                                    <li className="mt-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard</li>
                                </ul>
                                <div className="mt1_redirects">
                                    <Link href="#!" className="mt1r">
                                        <div className="d-flex align-items-center gap-5">
                                            <span><FaStar /></span>
                                            <div>
                                                <h5>Services</h5>
                                                <h4>Hair Style, Hair Color.</h4>
                                            </div>
                                        </div>
                                        <div className="red_arrow">
                                            <span><FaArrowRightLong /></span>
                                        </div>
                                    </Link>
                                    <Link href="#!" className="mt1r">
                                        <div className="d-flex align-items-center gap-5">
                                            <span><FaStar /></span>
                                            <div>
                                                <h5>RATED 4.92</h5>
                                                <h4>1250 Reviews</h4>
                                            </div>
                                        </div>
                                        <div className="red_arrow">
                                            <span><FaArrowRightLong /></span>
                                        </div>
                                    </Link>
                                    <Link href="#!" className="mt1r">
                                        <div className="d-flex align-items-center gap-5">
                                            <span><FaStar /></span>
                                            <div>
                                                <h5>Experience</h5>
                                                <h4>5 Years</h4>
                                            </div>
                                        </div>
                                        <div className="red_arrow">
                                            <span><FaArrowRightLong /></span>
                                        </div>
                                    </Link>
                                    <Link href="#!" className="mt1r">
                                        <div className="d-flex align-items-center gap-5">
                                            <span><FaStar /></span>
                                            <div>
                                                <h5>Languages</h5>
                                                <h4>English, PL</h4>
                                            </div>
                                        </div>
                                        <div className="red_arrow">
                                            <span><FaArrowRightLong /></span>
                                        </div>
                                    </Link>
                                    <Link href="#!" className="mt1r">
                                        <div className="d-flex align-items-center gap-5">
                                            <span><FaStar /></span>
                                            <h4>Fully insured and actively certified</h4>
                                        </div>
                                        <div className="red_arrow">
                                            <span><FaArrowRightLong /></span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="services-tab-pane" role="tabpanel" aria-labelledby="services-tab" tabindex="0">
                            <div className="row g-5">
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
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="reviews-tab-pane" role="tabpanel" aria-labelledby="reviews-tab" tabindex="0">
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
                                            <h5><FaCheckCircle />Verified appointment</h5>
                                        </div>
                                        <p>The strong pressure of this treatment is great for freeing up tense muscles while realigning muscle tissues and speeding up recovery." says Nadege, our lead therapist "Expect elbow, fist and forearm work with a gradual increase in pressure."</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="bio-tab-pane" role="tabpanel" aria-labelledby="bio-tab" tabindex="0">
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
        </div>
    )
}

export default Setting