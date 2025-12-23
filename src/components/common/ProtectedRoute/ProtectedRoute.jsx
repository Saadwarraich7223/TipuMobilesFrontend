import { useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import ProfileSkeleton from "../../layout/ShimmerSkeltons/ProfileSkeleton";

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
    return <ProfileSkeleton />;
  }

  if ((authOnly && !user) || (!authOnly && user)) return null;

  return children;
};

export default ProtectedRoute;
