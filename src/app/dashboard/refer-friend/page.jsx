"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoStar } from "react-icons/go";
import { RxCaretSort } from "react-icons/rx";


const referFriend = () => {
    const [tab, setTab] = useState();
    const [activeTab, setActiveTab] = useState('complete');
    useEffect(() => {
        setTab();
        setTimeout(() => {
            setTab(activeTab);
        }, 1);
    }, [activeTab])
    const orders = [
        {
            cust_id: "PB-001",
            name: "Claire Thompson",
            treatment: "Facial Rejuvenation",
            date: "2028-09-12, 9:00 AM",
            status: activeTab,
        },
        {
            cust_id: "PB-001",
            name: "Ronald Richards",
            treatment: "Burger",
            date: "2028-09-12, 9:00 AM",
            status: activeTab,
        },
        {
            cust_id: "PB-001",
            name: "Ronald Richards",
            treatment: "Facial Rejuvenation",
            date: "2028-09-12, 9:00 AM",
            status: activeTab,
        },
        {
            cust_id: "PB-001",
            name: "Ronald Richards",
            treatment: "Burger",
            date: "2028-09-12, 9:00 AM",
            status: activeTab,
        },
        {
            cust_id: "PB-001",
            name: "Ronald Richards",
            treatment: "Burger",
            date: "2028-09-12, 9:00 AM",
            status: activeTab,
        }
    ];

    if (!tab) {
        return <></>;
    }
    return (
        <div className="w-100">
            <div className="refer_friend">
                <div className="rf_top">
                    <span><GoStar /></span>
                    <h4>Refer a friend and get $5.00 discount
                        <br />on your next bill </h4>
                </div>
                <form className="rf_email">
                    <div className="rf_field">
                        <label htmlFor="">Enter email address</label>
                        <input type="text" placeholder="lorem ipsum dolor sit" />
                    </div>
                    <div className="text-center pt-5">
                        <button className="theme-btn4">
                            Send a Referral
                        </button>
                    </div>
                </form>
                <div className="rf_list">
                    <div className="rfl_top">
                        <h5>Referrals Sent </h5>
                        <Link href="/" >View All</Link>
                    </div>
                    <div className="dr_table">
                        <div className="pt-2 dash_list page">
                            <div className="table-responsive">
                                <table className="table caption-top">
                                    <thead>
                                        <tr className="borderless">
                                            <th scope="col">Referral ID <span><RxCaretSort /></span></th>
                                            <th scope="col">Name <span><RxCaretSort /></span></th>
                                            <th scope="col">Date & Time <span><RxCaretSort /></span></th>
                                            <th scope="col">Status <span><RxCaretSort /></span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders
                                            .filter((val) => val.status.toLowerCase().includes(activeTab))
                                            .map((order, index) => (
                                                <tr key={index}>
                                                    <td scope="row">{order.cust_id}</td>
                                                    <td className="user_td">
                                                        {order.name}
                                                    </td>
                                                    <td>{order.date}</td>
                                                    <td className={`status_td ${order.status.toLowerCase()}`}>
                                                        <span>{order.status}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* <div className="pagination justify-content-end">
                                      <button className="active">1</button>
                                      <button>2</button>
                                      <button>3</button>
                                      <button>4</button>
                                      <button>&gt;&gt;</button>
                                    </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default referFriend