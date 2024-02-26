import { useState } from "react";
import { addUrl, getUrl } from "../firebase/imagesApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/useGlobalContext";
// import useJsonImageUrl from "../hooks/useJsonImageUrl";
// import Spinner from "../components/Spinner";

const PaginaEj1 = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setUrlData } = useGlobalContext();
  /*
  const validateUrl = (url) => {
    const regex =
      /^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,}(\/\S*)?$/;
    return regex.test(url);
  };
  */

  const handleAddUrl = async (url) => {
    try {
        const result = await fetch(url);
        if (!result.ok) {
            Swal.fire({
                icon: "error",
                title: `No se pudo cargar lal URL ${url}`,
                text: "La url introducida no produjo una respuesta válida",
            });
            return;
        }
        const data = await result.json();
        const dataResults = data.results;
        const arrayImagenes = [];
        dataResults.forEach(elem => {
            if (elem.image) {
                if (elem.image.slice(-4) === '.jpg' || elem.image.slice(-4) === '.png' || elem.image.slice(-5) === '.jpeg' ) {
                    arrayImagenes.push(elem.image);
                }
            }
        });
        if (arrayImagenes.length > 0) {
            const favs = new Array(arrayImagenes.length);
            favs.fill(false);
            const objectResult = {
                URL: url,
                imagenes: arrayImagenes,
                favoritas: favs,
            };
            addUrl(objectResult);
            Swal.fire({
                icon: 'success',
                title: '¡Correcto!',
                text: `La url ${url} se añadió con éxito`,
            });
            setUrlData(objectResult);
            navigate("/gallery");
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error al parsear la url',
            text: `No se pudo parsear la url ${url}`,
        })
        console.log(error);
    }
  }


  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.length === 0) {
      Swal.fire({
        icon: "error",
        title: "El campo URL es obligatorio",
        text: "Por favor introduzca una url",
      });
      return;
    }
    getUrl(query)
    .then((result) => {
      if (result) {
        Swal.fire({
          icon: "warning",
          title: "La url ya existe",
          text: "La url ya existe",
        });
        setUrlData(result);
        navigate("/gallery");
      }
      else {
        const response = confirm(`Desea añadir la url ${query} a la colección`);
        if (response) {
            handleAddUrl(query);
        } else {
            setQuery('');
            navigate("/home");
        }
      }
    });
    // if (getUrl(query) == false) {
    //   Swal.fire({
    //     icon: 'warning',
    //     title: 'La url ya existe',
    //     text: 'La url ya existe',
    //   });
    //   console.log("se encontro", query);
    // } else {
    //     addUrl({url:query});
    //   console.log("no se encontró", query);
    // }

    // try {
    //     loadUrl(query)
    //     .then(object => addUrl(object))
    // } catch (error) {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Error al cargar url',
    //         text: `No se pudo cargar imagenes de la url (${error})`,
    //     });
    // }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center my-4">
        <form
          className="w-1/2 bg-gray-800 p-4 rounded-lg flex items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="url"
            id="url"
            value={query}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none"
            placeholder="Explorar imágenes en url ..."
          />
        </form>
      </div>
      {/* { !urlData ? (<Spinner/>) : (
          (<span>{urlData.imagenes[0]}</span>)
      ) } */}
    </>
  );
};

export default PaginaEj1;
