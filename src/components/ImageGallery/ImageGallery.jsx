import css from './ImageGallery.module.css';

const ImageGallery = ({ images, openModal }) => {
  return (
    <>
      <ul className={css.gallery}></ul>
      {images.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <li key={id} className={css.gallery__item}>
            <img
              onClick={() => openModal(largeImageURL)}
              className={css.gallery__image}
              src={webformatURL}
              alt="Pictures"
            />
          </li>
        );
      })}
    </>
  );
};

export default ImageGallery;
