import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/layout/ProtectedRoute';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import CarList from './components/cars/CarList';
import CarDetail from './components/cars/CarDetail';
import CarForm from './components/cars/CarForm';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />

              {/* Protected Routes */}
              <Route
                path="/cars"
                element={
                  <ProtectedRoute>
                    <CarList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cars/new"
                element={
                  <ProtectedRoute>
                    <CarForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cars/:id"
                element={
                  <ProtectedRoute>
                    <CarDetail />
                  </ProtectedRoute>
                }
              />

              {/* Redirect root to cars list if authenticated, otherwise to login */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Navigate to="/cars" replace />
                  </ProtectedRoute>
                }
              />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;