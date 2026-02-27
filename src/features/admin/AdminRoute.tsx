import { Navigate, Outlet } from "react-router";
import { useUser } from "../../Components/User/UserContext";

export default function AdminRoute() {
  const { user } = useUser();

  if (!user?.isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
}