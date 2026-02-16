import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardVendedor from './pages/DashboardVendedor';
import PortalCliente from './pages/PortalCliente';
import { RUTAS, ROLES } from './utils/constants';

function App() {
  const [demoUser, setDemoUser] = useState(null);

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

  if (!demoUser) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Login onDemoLogin={handleDemoLogin} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        {demoUser.role === ROLES.ADMIN && (
          <Route path="*" element={<DashboardAdmin user={demoUser} onLogout={handleLogout} />} />
        )}
        {demoUser.role === ROLES.VENDEDOR && (
          <Route path="*" element={<DashboardVendedor user={demoUser} onLogout={handleLogout} />} />
        )}
        {demoUser.role === ROLES.CLIENTE && (
          <Route path="*" element={<PortalCliente user={demoUser} onLogout={handleLogout} />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
