import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootPageLayout from "./pages/RootPageLayout";
import ErrorPage from "./pages/ErrorPage";
import PaginaEj1 from "./pages/PaginaEj1";
import ProtectedRoute from "./utils/ProtectedRoute";
import PaginaEj2 from "./pages/PaginaEj2";
import { AuthProvider } from "./context/useAuthContext";
import LoginPage from "./pages/LoginPage";
import { GlobalProvider } from "./context/useGlobalContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPageLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/home",
          element: <PaginaEj1 />,
        },
        {
          element: <ProtectedRoute redirectPath="/home" />,
          children: [
            {
              path: "/gallery",
              element: <PaginaEj2 />,
            },
          ],
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <GlobalProvider>
        <RouterProvider router={router} />
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
