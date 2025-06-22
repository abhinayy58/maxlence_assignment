import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function MainLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("userRole");

    setIsLoggedIn(isLoggedIn === "true");
    setUserRole(role || "");
  }, [location.pathname]);

  return (
    <div>
      <nav className="bg-gray-800 text-white p-4 flex justify-between">
        <Link to="/">Home</Link>
        <div className="space-x-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <Link to="/profile">Profile</Link>
              {userRole === "admin" && <Link to="/admin">Admin</Link>}
            </>
          )}
        </div>
      </nav>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
