import { useState } from "react"
import Swal from "sweetalert2";

const useJsonImageUrl = () => {
    const [urlData, setUrlData] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUrl = async (url) => {
        try {
            console.log(url);
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
            const arrayImagenes = [];
            data.result.forEeach(elem => {
                if (elem.image) {
                    if (elem.image.slice(-4) === '.jpg' || elem.image.slice(-4) === '.png' || elem.image.slice(-5) === '.jpeg' ) {
                        arrayImagenes.push(elem.image);
                    }
                }
            })
            if (arrayImagenes.length > 0) {
                const objectResult = {
                    url: url,
                    imagenes: arrayImagenes,
                    favoritas: [],
                };
                setUrlData(objectResult);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching",error);
            throw error;
        }
    }

  return { urlData, loadUrl, loading };
}

export default useJsonImageUrl