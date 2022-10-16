import css from "./ImageGallery.module.css"

const ImageGallery = ({images}) => {
  return (
    <>
      <ul className={css.gallery}></ul>
      {images.map(({id, webformatURL}) => {return (
          <li key={id} className={css.gallery__item}>
          <img className={css.gallery__image} src={webformatURL} alt="" />
        </li>
      )})}
    </>
  );
};

export default ImageGallery;
