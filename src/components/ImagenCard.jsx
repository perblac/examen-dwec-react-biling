import { useGlobalContext } from "../context/useGlobalContext";

const ImagenCard = (props) => {
  const { imagen, index, handleFav } = props;
  const { urlData } = useGlobalContext();

  return (
    <div className="rounded w-36 border border-black bg-sky-200 shadow-md m-2 p-2">
      <img src={imagen} alt="" onDoubleClick={handleFav} className="w-32" />
      <span>Nº {index}</span>
      <span className="text-3xl">{urlData.favoritas[index] ? (<i className="fa-solid fa-star"></i>) : (<i className="fa-regular fa-star"></i>)}</span>
    </div>
  );
};

export default ImagenCard;
