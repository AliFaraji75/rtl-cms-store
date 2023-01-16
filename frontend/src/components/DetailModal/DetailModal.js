import React, { useEffect } from "react";
import "./DetailModal.css";
function DetailModal({ onHide,children }) {
  useEffect(() => {
    const checkHide = (e) => {
      if (e.keyCode !=='') {
        onHide();
      }
    };
    window.addEventListener("keydown", checkHide);
    return () => {
      window.removeEventListener("keydown", checkHide);
    };
  });
  return (
    <div className="modal-parent active">
      <div className="details-modal ">
       {children}
      </div>
    </div>
  );
}

export default DetailModal;
