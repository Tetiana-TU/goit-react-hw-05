import css from "./ImageCard.module.css";

const ImageCard = ({ alt_description, urls, updateModalStateData }) => {
  return (
    <div
      className={css.card}
      onClick={() => updateModalStateData(urls.regular, alt_description)}
    >
      <img className={css.cardImage} src={urls.small} alt={alt_description} />
    </div>
  );
};

export default ImageCard;
