import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

function ProtectedRoutes() {
    const authStatus = useSelector((state: RootState) => state.auth.isAuth);
    const authadmin = useSelector((state: RootState) => state.auth.isAdmin);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (authStatus !== undefined && authadmin !== undefined) {
            setIsLoading(false);
        }
    }, [authStatus, authadmin]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!authStatus && !authadmin) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export default ProtectedRoutes;
