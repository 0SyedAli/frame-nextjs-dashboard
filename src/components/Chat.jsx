import Image from 'next/image'
import React from 'react'

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
            </div>
        </div>
    )
}

export default Chat