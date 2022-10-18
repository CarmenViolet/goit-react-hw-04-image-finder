import { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  closeOverlay = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  closeESC = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeESC);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeESC);
  }
  render() {
    return (
      <div className={css.overlay} onClick={this.closeOverlay}>
        <div className={css.modal}>{this.props.children}</div>
      </div>
    );
  }
}

export default Modal;
