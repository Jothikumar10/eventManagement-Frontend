import { Navigate } from "react-router-dom";

export default function AuthRedirect({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // If user is logged in, redirect to the proper dashboard
  if (user) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
        replace
      />
    );
  }

  // If not logged in, render the wrapped component (Login / Signup)
  return children;
}
