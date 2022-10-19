import { Component } from 'react';
import { fetchApi } from 'utils/api/fetch';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
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
    modalWindow: { isOpenModal: false, url: '', alt: '' },
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchRequest, page, perPage } = this.state;
    if (prevState.searchRequest !== searchRequest || prevState.page !== page) {
      this.fetchImages(searchRequest, page, perPage);
    }
  }

  onSubmit = searchRequest => {
    this.setState({ searchRequest });
    this.setState({ images: [], page: 1 });
  };

  fetchImages = async (searchRequest, page, perPage) => {
    try {
      this.setState({ isLoading: true });
      const { data } = await fetchApi(searchRequest, page, perPage);
      const maxAmountImages = data.totalHits;
      const imagesHits = data.hits;

      if (imagesHits.length !== maxAmountImages) {
        this.setState(prevState => ({
          images: [...prevState.images, ...mapper(imagesHits)],
        }));
        this.setState({ isShown: true });
      } else {
        this.setState({ isShown: false });
        return alert("Please, try another request!");
      }

      if(imagesHits.length === maxAmountImages) {
        this.setState({ isShown: false });
        return alert("You've reached the end of search!");
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = url => {
    this.setState(() => ({ modalWindow: { isOpenModal: true, url } }));
  };

  closeModal = () => {
    this.setState({ modalWindow: { isOpenModal: false } });
  };

  render() {
    const {
      images,
      isShown,
      isLoading,
      modalWindow: { isOpenModal, url, alt },
    } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmit} />

        <ImageGallery images={images} openModal={this.openModal} />

        {isOpenModal && (
          <Modal closeModal={this.closeModal}>
            <img className={css.modal__image} src={url} alt={alt} />
          </Modal>
        )}

        {isLoading && <Loader />}

        {isShown && <Button text="Load More..." handlerClick={this.loadMore} />}
      </div>
    );
  }
}
