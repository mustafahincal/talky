import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

function ProtectedRoute({ component: Component }: any) {
  const { logged } = useAuthContext();

  if (logged) {
    return <Component />;
  } else {
    return <Navigate to={"/"} />;
  }
}

export default ProtectedRoute;
