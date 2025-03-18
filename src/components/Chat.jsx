import Image from 'next/image'
import React from 'react';
import { ImAttachment } from "react-icons/im";


const Chat = () => {
    return (
        <div className="chat-container">
            <div className="cc_inner">
                <div className="cc_head">
                    <div className="d-flex align-items-center gap-4">
                        <Image
                            src="/images/emp_img1.png"
                            width={40}
                            height={40}
                        />
                        <div className="d-flex align-items-center gap-2">
                            <h4>Ashley Dunkin -</h4>
                            <h5>Customer</h5>
                        </div>
                    </div>
                    <button className="btn back_btn">Back to Messages</button>
                </div>
                <div className="cc_body">
                    <div className="cc_text_msg">
                        <div className="cc_text">
                            <Image src="/images/emp_img1.png" width={88} height={88} />
                            <p>Pharetra convallis posuere morbi leo. Vestibulum lectus mauris ultrices eros in. Lobortis elementum nibh tellus molestie nunc. Libero nunc consequataazszzaszsda</p>
                        </div>
                        <div className="cc_text ">
                            <Image src="/images/emp_img1.png" width={88} height={88} />
                            <p>Pharetra convallis posuere morbi leo. Vestibulum lectus mauris ultrices eros in. Lobortis elementum nibh tellus molestie nunc. Libero nunc consequataazszzaszsda</p>
                        </div>
                        <div className="cc_text">
                            <Image src="/images/emp_img1.png" width={88} height={88} />
                            <p>Pharetra convallis posuere morbi leo. Vestibulum lectus mauris ultrices eros in. Lobortis elementum nibh tellus molestie nunc. Libero nunc consequataazszzaszsda</p>
                        </div>
                    </div>
                    <div className="cc_text_area">
                        <textarea name=""  id="" >
                            Write a message
                        </textarea>
                        <div className=" d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-2">
                                <ImAttachment />
                                <ImAttachment />
                                <ImAttachment />
                            </div>
                            <button>SEND</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat