import { useGlobalContext } from "../context/useGlobalContext";
import ImageGallery from "../components/ImageGallery";

const PaginaEj2 = () => {
  const { loading, setUrlData, urlData } = useGlobalContext();

  const handleFav = (key) => {
    const favs = urlData.favoritas;
    favs[key] = !favs[key];
    setUrlData((prev) => ({
      ...prev,
      favoritas: favs,
    }));
  };

  return (
    <>
        <ImageGallery images={urlData} handleFav={handleFav} loading={loading}/>
    </>
  );
};

export default PaginaEj2;
