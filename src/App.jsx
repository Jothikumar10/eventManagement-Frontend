import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

/* ---------- PUBLIC PAGES ---------- */
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import About from "./Pages/About";

/* ---------- ADMIN PAGES ---------- */
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ManageEvents from "./Pages/Admin/ManageEvents";
import ManageUsers from "./Pages/Admin/ManageUsers";
import Analytics from "./Pages/Admin/Analytics";
import CreateEvent from "./Pages/Admin/CreateEvent";
import AdminRegistrations from "./Pages/Admin/AdminRegistrations";

/* ---------- USER PAGES ---------- */
import UserDashboard from "./Pages/Users/UserDashboard";
import MyEvents from "./Pages/Users/MyEvents";
import RegisteredEvents from "./Pages/Users/RegisteredEvents";
import Profile from "./Pages/Users/Profile";
import CreateEventRequest from "./Pages/Users/CreateEventRequest";

/* ---------- LAYOUT ---------- */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

/* ---------- AUTH ---------- */
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RoleRoute from "./components/auth/RoleRoute";
import AuthRedirect from "./components/auth/AuthRedirect";

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Navbar />

        <main className="min-h-screen pt-16 bg-gradient-to-b from-indigo-900 to-black text-white">
          <Routes>

            {/* ================= PUBLIC ================= */}
            <Route path="/" element={<Home />} />

            <Route
              path="/login"
              element={
                <AuthRedirect>
                  <Login />
                </AuthRedirect>
              }
            />

            <Route
              path="/signup"
              element={
                <AuthRedirect>
                  <Signup />
                </AuthRedirect>
              }
            />
            <Route path="/about" element={<About />} />

            {/* ================= ADMIN ================= */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <RoleRoute role="admin">
                    <AdminDashboard />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/manage-events"
              element={
                <ProtectedRoute>
                  <RoleRoute role="admin">
                    <ManageEvents />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/manage-users"
              element={
                <ProtectedRoute>
                  <RoleRoute role="admin">
                    <ManageUsers />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute>
                  <RoleRoute role="admin">
                    <Analytics />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/create-event"
              element={
                <ProtectedRoute>
                  <RoleRoute role="admin">
                    <CreateEvent />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/registrations"
              element={
                <ProtectedRoute>
                  <RoleRoute role="admin">
                    <AdminRegistrations />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />

            {/* ================= USER ================= */}
            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute>
                  <RoleRoute role="user">
                    <UserDashboard />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/user/my-events"
              element={
                <ProtectedRoute>
                  <RoleRoute role="user">
                    <MyEvents />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/user/registered-events"
              element={
                <ProtectedRoute>
                  <RoleRoute role="user">
                    <RegisteredEvents />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/user/profile"
              element={
                <ProtectedRoute>
                  <RoleRoute role="user">
                    <Profile />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />

            {/* 🔹 USER EVENT REQUEST FORM */}
            <Route
              path="/user/request-event"
              element={
                <ProtectedRoute>
                  <RoleRoute role="user">
                    <CreateEventRequest />
                  </RoleRoute>
                </ProtectedRoute>
              }
            />


            {/* ================= 404 ================= */}
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center h-[60vh] text-xl font-semibold">
                  Page Not Found
                </div>
              }
            />

          </Routes>
        </main>

        <Footer />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
