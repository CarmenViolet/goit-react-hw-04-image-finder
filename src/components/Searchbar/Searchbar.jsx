import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(event.currentTarget.search.value);
  };
  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.button__label}>Search</span>
        </button>

        <input
          name="search"
          className={css.input}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
