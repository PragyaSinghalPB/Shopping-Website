import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import '../assets/css/style.scss';
import profileIcon from '../assets/images/profile.png';

function ProfileModal(props) {

    const modalRef = useRef();

    const users =
        [
            {
                "Name": "Pragya Singhal",
                "Email": "abc@gmail.com",
                "Password": "123",
                "Gender": "Female",
                "Pincode": 122001,
                "AdminAccess": true
            },
            {
                "Name": "Riddhi Doe",
                "Email": "doe@gmail.com",
                "Password": "doe@123",
                "Gender": "Female",
                "Pincode": 311001,
                "AdminAccess": false
            }
        ]

    const selectedUser = users[0];

    useEffect(() => {

        //for removing scroll on modal open
        document.body.style.overflowY = 'hidden';

        //on window click modal close add eventListener
        document.addEventListener("mousedown", (e) => handleModalClose(e), true);

        return () => {
            document.body.style.overflowY = 'scroll';
        };

    }, []);


    //on window click modal close
    const handleModalClose = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            props.closeModal();
        }
    }


    return ReactDOM.createPortal(

        <div className="modal-wrapper">
            <div className="modal-container" ref={props.modalRef}>
                <span onClick={props.closeModal} className='close'>&times;</span>
                <img src={profileIcon} width={50} height={50} alt='user' className='modal-image m-auto d-block mb-3' />
                {selectedUser && (
                    <>
                        <h4 className='mb-1 text-center'>{selectedUser.Name}</h4>
                        <p><strong>Email:</strong>{selectedUser.Email}</p>
                        <p><strong>Gender:</strong>{selectedUser.Gender}</p>
                        <p><strong>Pincode:</strong>{selectedUser.Pincode}</p>
                    </>
                )

                }
            </div>
        </div>, document.querySelector(".profileModalClass")
    )
}

export default ProfileModal;