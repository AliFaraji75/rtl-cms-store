
import React, { useEffect } from "react";
import './EditModal.css'
function EditModal({children,onClose,onSubmit}) {
    
    useEffect(() => {
        const checkHide = (e) => {
          if (e.keyCode === 27) {
            onClose();
          }
        };
        window.addEventListener("keydown", checkHide);
        return () => {
          window.removeEventListener("keydown", checkHide);
        };
      });

    return (
        <div className='modal-parent active'>
              <form className='edit-modal-form'>
               <h1>اطلاعات جدید را وارد نمایید.</h1>
                {children}

              <button className='edit-form-submit' onClick={onSubmit}>ثبت اطلاعات جدید</button>
              </form>
        </div>
    );
}

export default EditModal;