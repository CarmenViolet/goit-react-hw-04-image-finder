import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ text, handlerClick }) => {
  return (
    <>
      <button className={css.button__load} onClick={handlerClick} type="button">
        {text}
      </button>
    </>
  );
};

export default Button;

Button.propTypes = {
    text: PropTypes.string.isRequired,
    handlerClick: PropTypes.func.isRequired,
}

