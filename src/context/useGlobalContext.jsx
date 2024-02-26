import { createContext, useContext, useEffect, useState } from "react"
import { getUrlId, editUrl } from "../firebase/imagesApi";

const GlobalContext = createContext();

export const GlobalProvider = (props) => {
    const {children} = props;
    const [urlData, setUrlData] = useState('');

  useEffect(() => {
    if (urlData.URL) {
      getUrlId(urlData.URL)
      .then(result => {
        editUrl(result, urlData);
      }
      )
      .catch(error => console.log(error));
    }  
  }, [urlData])
  

  return (
    <GlobalContext.Provider value={{ urlData, setUrlData}}>
        {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}