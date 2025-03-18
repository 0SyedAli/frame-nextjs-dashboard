import React from "react";
import "../styles/globals.css"; // Import the CSS file for styling

const MyModal = ({ isOpen, onClose, children, myModalContent }) => {

    if (isOpen)
    return (
        <div className="myModal-overlay">
            <div className={`myModal-content ${myModalContent ? myModalContent : ""}`}>
                {/* <button className="myModal-close" onClick={onClose}>
                    <span>&times;</span>
                </button> */}
                {children}
            </div>
        </div>
    );
};

export default MyModal;