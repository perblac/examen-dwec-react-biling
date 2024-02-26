import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../firebase/imagesApi";
import { useAuthContext } from "../context/useAuthContext";

const LoginPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // estado global
  // const { setEstadoGlobal } = useContext(AuthContext);
  const { userFirebase, signInFirebase } = useAuthContext();

  // llamar a una funcion de productaApi para gestionar el inicio de sesion con Google
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithGoogle(signInFirebase, setError, navigate);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-200 to-gray-500">
        <div className="flex items-center justify-between mx-10">
          <div className="flex flex-col justify-center items-start h-1/2">
            <h1 className="text-6xl font-bold text-gray-800 mt-10 text-center">
              React con Firebase
            </h1>
            <p className="text-lg text-gray-600 ml-8 mt-10">Proyecto DEWC</p>
          </div>
          <div className="flex justify-center items-start mt-2">
            <video id="video-firebase" className="w-1/2" autoPlay loop muted>
              <source
                src="https://firebase.google.com/static/images/homepage/Firebase_Hero_Loop.webm"
                type="video/webm"
              />
            </video>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="w-1/4 bg-gray-50 py-12 px-4 rounded-lg shadow-lg">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="text-center mt-6 text-3xl font-semibold text-gray-900">
                  Iniciar sesión
                </h2>
              </div>
              <form>
                {error && (
                  <div className="rounded-md bg-red-100 p-4">
                    <div>
                      <h3 className="font-medium text-sm text-red-700">
                        {error}
                      </h3>
                    </div>
                  </div>
                )}
                <div className="rounded-md shadow-sm">
                  <button
                    onClick={handleSignIn}
                    className="relative w-full flex justify-center py-2 px-4 border text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Iniciar Sesión con Google
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </>
  );
};

export default LoginPage;
