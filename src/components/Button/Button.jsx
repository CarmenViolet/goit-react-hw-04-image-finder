import css from "./Button.module.css"

const Button = ({text, handlerClick}) => {
    return (
        <>
        <button className={css.button__load} onClick={handlerClick} type="button">{text}</button>
        </>
    )
}

export default Button;