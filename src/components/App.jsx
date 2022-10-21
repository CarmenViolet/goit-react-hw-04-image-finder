import { useState, useEffect } from 'react';
import { fetchApi } from 'utils/api/fetch';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import Button from './Button';
import { mapper } from 'utils/mapper';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchRequest, setSearchRequest] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [modalWindow, setModalWindow] = useState({
    isOpenModal: false,
    url: '',
    alt: '',
  });
  const perPage = 12;

  // componentDidUpdate(prevProps, prevState) {
  //   const { searchRequest, page, perPage } = this.state;
  //   if (prevState.searchRequest !== searchRequest || prevState.page !== page) {
  //     this.fetchImages(searchRequest, page, perPage);
  //   }
  // }

  useEffect(() => {
    const fetchImages = async (searchRequest, page, perPage) => {
      try {
        setIsLoading(true);
        const { data } = await fetchApi(searchRequest, page, perPage);
        const maxAmountImages = data.totalHits;
        const imagesHits = data.hits;

        if (imagesHits.length !== maxAmountImages) {
          setImages(prevStateImages => [
            ...prevStateImages,
            ...mapper(imagesHits),
          ]);
          setIsShown(true);
        } else {
          setIsShown(false);
          return alert('Please, try another request!');
        }
        if (imagesHits.length === maxAmountImages) {
          setIsShown(true);
          return alert("You've reached the end of search!");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchRequest) {
      fetchImages(searchRequest, page);
    }
  }, [searchRequest, page, perPage]);

  const onSubmit = searchRequest => {
    setSearchRequest(searchRequest);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = (url, alt) => {
    setModalWindow(() => ({ isOpenModal: true, url, alt }));
  };

  const closeModal = () => {
    setModalWindow(() => ({ isOpenModal: false, url: '', alt: '' }));
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={onSubmit} />

      <ImageGallery images={images} openModal={openModal} />

      {modalWindow.isOpenModal && (
        <Modal closeModal={closeModal}>
          <img
            className={css.modal__image}
            src={modalWindow.url}
            alt={modalWindow.alt}
          />
        </Modal>
      )}

      {isLoading && <Loader />}

      {isShown && <Button text="Load More..." handlerClick={loadMore} />}
    </div>
  );
};
