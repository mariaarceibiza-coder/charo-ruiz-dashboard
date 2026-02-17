import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardVendedor from './pages/DashboardVendedor';
import PortalCliente from './pages/PortalCliente';
import { ROLES } from './utils/constants';

const SESSION_KEY = 'charo_ruiz_demo_user';

function App() {
  const [demoUser, setDemoUser] = useState(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (demoUser) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(demoUser));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [demoUser]);

  const handleDemoLogin = (role) => {
    const users = {
      [ROLES.ADMIN]: { nombre: 'Administrador', email: 'admin@charoruiz.com', role: ROLES.ADMIN },
      [ROLES.VENDEDOR]: { nombre: 'María García', email: 'maria@charoruiz.com', role: ROLES.VENDEDOR, id: 'v1' },
      [ROLES.CLIENTE]: { nombre: 'Laura Vidal', email: 'laura@esparadis.com', role: ROLES.CLIENTE, id: 'c1' },
    };
    setDemoUser(users[role]);
  };

  const handleLogout = () => {
    setDemoUser(null);
  };

  const getDefaultRoute = () => {
    if (!demoUser) return '/login';
    switch (demoUser.role) {
      case ROLES.ADMIN: return '/admin/dashboard';
      case ROLES.VENDEDOR: return '/vendedor/dashboard';
      case ROLES.CLIENTE: return '/cliente/portal';
      default: return '/login';
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            demoUser
              ? <Navigate to={getDefaultRoute()} replace />
              : <Login onDemoLogin={handleDemoLogin} />
          }
        />

        <Route
          path="/admin/:tab"
          element={
            demoUser?.role === ROLES.ADMIN
              ? <DashboardAdmin user={demoUser} onLogout={handleLogout} />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" replace />}
        />

        <Route
          path="/vendedor/:tab"
          element={
            demoUser?.role === ROLES.VENDEDOR
              ? <DashboardVendedor user={demoUser} onLogout={handleLogout} />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/vendedor"
          element={<Navigate to="/vendedor/dashboard" replace />}
        />

        <Route
          path="/cliente/:tab"
          element={
            demoUser?.role === ROLES.CLIENTE
              ? <PortalCliente user={demoUser} onLogout={handleLogout} />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/cliente"
          element={<Navigate to="/cliente/portal" replace />}
        />

        <Route
          path="*"
          element={<Navigate to={demoUser ? getDefaultRoute() : '/login'} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
