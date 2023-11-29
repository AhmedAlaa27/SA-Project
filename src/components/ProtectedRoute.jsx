import { useContext } from "react";
import { AuthContext, Status } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

export default function ProtectedRoute({ children }) {
    const { user, status } = useContext(AuthContext);

    if (status == Status.LOADING) {
        return <Loading />
    }

    if (user == null && status != Status.DEFAULT) return <Navigate to={"/login"} />;

    return (
        <>{children}</>
    )
}