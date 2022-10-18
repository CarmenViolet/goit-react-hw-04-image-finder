import { Component } from 'react';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(event.currentTarget.search.value);
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.button__label}>Search</span>
          </button>

          <input
            name="search"
            className={css.input}
            type="text"
            autoComplete='off'
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
