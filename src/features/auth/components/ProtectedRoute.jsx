import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import ProfileSkeleton from "../../../components/layout/ShimmerSkeletons/ProfileSkeleton";

const ProtectedRoute = ({ children, authOnly = true }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (authOnly && !user) {
      navigate("/login", { replace: true, state: { from: location } });
    }

    if (!authOnly && user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, authOnly, navigate, location]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  // If we are redirecting, don't render children
  if ((authOnly && !user) || (!authOnly && user)) return null;

  return children;
};

export default ProtectedRoute;
