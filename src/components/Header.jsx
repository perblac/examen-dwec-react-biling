import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/useGlobalContext";

const Header = () => {
  const navigate = useNavigate();
  const { setUrlData, urlData } = useGlobalContext();

  const handleRestart = () => {
    setUrlData('');
    navigate("/home");
  }


  return (
    <header className="min-w-screen bg-zinc-800 text-white">
      <div className="w-full flex justify-end items-center">
        <span className="justify-self-center mx-auto text-4xl font-bold">
          Examen DWEC Rubén Perblac
        </span>
        { urlData ? (
          <>
            <span className="text-sm m-2">url: {urlData.URL}</span>
            <span className="text-sm m-2">nºimagenes: {urlData.imagenes.length}</span>
            <span className="text-sm m-2">nºfavoritas: {urlData.favoritas?.reduce((ac,b) => ac = b ? ac + 1 : ac, 0)}</span>
          </>
        ) : (
          <></>
        )}
        <button
          className="m-2 px-4 py-2 rounded-lg hover:text-zinc-900 border-4 border-transparent hover:border-4 hover:border-solid hover:border-zinc-200 hover:bg-zinc-300"
          onClick={handleRestart}
        >
          Comenzar de nuevo
        </button>
      </div>
    </header>
  );
};

export default Header;
