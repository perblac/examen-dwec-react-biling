import {
  addDoc,
  collection,
  // deleteDoc,
  doc,
  // getDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import {GoogleAuthProvider, browserSessionPersistence, getAuth, setPersistence, signInWithPopup, signOut} from 'firebase/auth';
import { db } from "./firebase";
import Swal from "sweetalert2";

const urlsCollection = collection(db, "ExamenReact-RubenPerblac");

// cargar urls
export const getUrls = async () => {
  try {
    const data = await getDocs(urlsCollection);
    return data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  } catch (error) {
    console.error("Error getting products", error);
    throw error;
  }
};

// cargar un url
export const getUrl = async (url) => {
  try {
    const q = query(urlsCollection, where("URL", "==", url));
    const querySnapshot = await getDocs(q);
    // console.log('empty?',querySnapshot.empty, querySnapshot);
    if (querySnapshot.empty) {
      return null;
    } else {
      let result = null;
      querySnapshot.forEach((doc)=>{
        result = doc.data();
      })
      console.log('salida del query:',result);
      return result;
    }
  } catch (error) {
    console.error("Error al obtener url", error);
    throw error;
  }
};

// get id
export const getUrlId = async (url) => {
  try {
    const q = query(urlsCollection, where("URL", "==", url));
    const querySnapshot = await getDocs(q);
    // console.log('empty?',querySnapshot.empty, querySnapshot);
    if (querySnapshot.empty) {
      return null;
    } else {
      let result = null;
      querySnapshot.forEach((doc)=>{
        result = doc.id;
      })
      console.log('salida del query id:',result);
      return result;
    }
  } catch (error) {
    console.error("Error al obtener url", error);
    throw error;
  }
};

// crear (ADD) entrada de productos
export const addUrl = async (urlData) => {
  try {
    console.log('adding:',urlData);
    const docRef = await addDoc(urlsCollection, urlData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product", error);
    throw error;
  }
};


// actualizar un producto
export const editUrl = async (id, newData) => {
  try {
    // referencia al doc donde esta el id
    const urlDocRef = doc(urlsCollection, id);
    // actualizamos
    await updateDoc(urlDocRef, newData);
  } catch (error) {
    console.error("Error editing product", error);
    throw error;
  }
};
/*
// eliminar entrada de productos
export const deleteProducto = async (id) => {
  try {
    const productDocRef = doc(productosCollection, id);
    await deleteDoc(productDocRef);
  } catch (error) {
    console.log("Error deleting product", error);
    throw error;
  }
};
*/

// validar la entrada con Google
export const signInWithGoogle = async (signInFirebase, setError, navigate) => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  try {
    // tipo de persistencia que tenemos con la sesion de google
    // a nivel local -> browserLocalPersistence
    // a nivel de sesion
    // y sin persistencia.
    // A nivel de sesion:
    await setPersistence(auth,browserSessionPersistence);
    const result = await signInWithPopup(auth,provider);
    const user = result.user;
    // setear mi estado con el usuario
    signInFirebase(user);
    navigate("/");
  } catch (error) {
    setError("Error al iniciar sesion con Google");
  }
};

// cerrar sesion
export const cerrarSesion = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.log("Error al iniciar sesion con Google", error);
    return false;
  }
}