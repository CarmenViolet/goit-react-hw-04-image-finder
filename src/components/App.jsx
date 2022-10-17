import { Component } from 'react';
import { fetchApi } from 'utils/api/fetch';
import css from './App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import Button from './Button';
import { mapper } from 'utils/mapper';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    perPage: 12,
    searchRequest: '',
    isLoading: false,
    isShown: false,
    error: null,
    isOpenModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchRequest, page, perPage } = this.state;
    if (prevState.searchRequest !== searchRequest || prevState.page !== page) {
      this.fetchImages(searchRequest, page, perPage);
    }
  }

  onSubmit = event => {
    event.preventDefault();
  };

  fetchImages = (searchRequest, page, perPage) => {
    try {
      this.setState({ isLoading: true });
      const data = fetchApi(searchRequest, page, perPage);
      const maxAmountImage = data.totalHits;
      const imagesPerPage = data.hits;

      this.setState(prevState => ({
        images: [...prevState.images, ...mapper(imagesPerPage)],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  closeModal=()=>{
    this.setState({isOpenModal: false})
  }

  render() {
    const { images, isLoading, isOpenModal } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmit} />

        <ImageGallery images={images} />

       {isOpenModal && <Modal closeModal={this.closeModal}/>}

        {isLoading && <Loader />}

        <Button text="Load More..." handlerClick={this.loadMore} />
      </div>
    );
  }
}
