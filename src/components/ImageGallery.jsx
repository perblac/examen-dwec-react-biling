import ImagenCard from "./ImagenCard";

const ImageGallery = (props) => {
  const { images, handleFav } = props;
  return (
    <div className="flex flex-wrap p-4 gap-2 m-2">
      {images.imagenes.map((image, key) => (
        <ImagenCard
          key={key}
          imagen={image}
          index={key}
          handleFav={() => handleFav(key)}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
