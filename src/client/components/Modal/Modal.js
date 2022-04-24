import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import "./Modal.css";

const Modal = ({ setIsOpen, modalMessage }) => {
  return (
    <>
      <div className="modal-background" onClick={() => setIsOpen(false)}>
        <div className={`modal-content ${modalMessage.style}`}>
          <h3 className="modal-title">{modalMessage.title}</h3>
          <p>{modalMessage.message}</p>
          <button className="close" onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
