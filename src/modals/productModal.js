/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import '../assets/css/style.scss';

function ProductModal(props) {

    const modalRef = useRef();

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
            <div className="modal-container" ref={modalRef}>
                <span onClick={props.closeModal} className='close'>&times;</span>
                <img src={props.productImg} width={120} height={120} className='modal-image m-auto d-block mb-3' />
                <h5 className='my-2'><strong>{props.prodcutTitle}</strong></h5>
                <p>{props.description}</p>
                <p className='pt-3'><strong>Price: <em className='ruppee-icon'>₹</em>{Number(props.productPrice).toFixed(2)}</strong></p>
            </div>
        </div>, document.querySelector(".productModalclass")

    )
}

export default ProductModal;