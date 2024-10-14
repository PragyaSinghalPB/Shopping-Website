import { useState, useEffect, useRef } from 'react';

function useModal(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {

    //for removing scroll on modal open
    document.body.style.overflowY = 'scroll';

    //on window click modal close add eventListener
    document.addEventListener("mousedown", (e) => handleModalClose(e), true);

    return () => {
        document.body.style.overflowY = 'hidden';
    };

}, []);


//on window click modal close
const handleModalClose = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
        props.closeModal();
    }
}


  // Return the modal state, functions, and ref
  return { isModalOpen, openModal, closeModal, modalRef };
}

export default useModal;
