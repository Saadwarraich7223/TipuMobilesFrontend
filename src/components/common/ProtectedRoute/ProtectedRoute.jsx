import { useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const ProtectedRoute = ({ children, authOnly = true }) => {
  const { user, loadingUser, navigate } = useAuthContext();
  const location = useLocation();

  useEffect(() => {
    if (loadingUser) return;
    if (authOnly && !user) {
      navigate("/login", { replace: true, state: { from: location } });
    }

    if (!authOnly && user) {
      navigate("/", { replace: true });
    }
  }, [user, loadingUser, authOnly, navigate, location]);

  if (loadingUser) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <ClipLoader size={50} color="#ff5252" />
      </div>
    );
  }

  if ((authOnly && !user) || (!authOnly && user)) return null;

  return children;
};

export default ProtectedRoute;
