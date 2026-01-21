import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';
import AttendancePage from './pages/AttendancePage';

// Pages temporaires pour le test
const Login = () => <div className="p-10 text-center">Page de Connexion</div>;
const Home = () => <div className="p-10 text-center text-2xl font-bold text-kiwi">Bienvenue sur le Dashboard V2</div>;

// Composant pour protéger les routes
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <DashboardLayout>{children}</DashboardLayout> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route Publique */}
          <Route path="/login" element={<Login />} />

          {/* Routes Protégées */}
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/attendance" element={
            <PrivateRoute>
              <AttendancePage />
              </PrivateRoute>
          } />

          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;