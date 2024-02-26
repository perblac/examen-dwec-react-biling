import { Navigate, Outlet } from 'react-router-dom'
import { useGlobalContext } from '../context/useGlobalContext';
// import { useAuthContext } from '../context/useAuthContext';

const ProtectedRoute = ({redirectPath}) => {
    const { urlData } = useGlobalContext();
    // cargamos el estado global
    // const { userFirebase } = useAuthContext();
    
    // const isActive = !!userFirebase;
    const isActive = !!urlData;

    if(!isActive) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
}

export default ProtectedRoute;