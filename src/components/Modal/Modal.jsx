import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({closeModal, children}) => {
 const closeOverlay = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

 const closeESC = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeESC);

    return () => window.removeEventListener('keydown', closeESC)
  }, [])
 
    return (
      <div className={css.overlay} onClick={closeOverlay}>
        <div className={css.modal}>{children}</div>
      </div>
    );
  }

export default Modal;
