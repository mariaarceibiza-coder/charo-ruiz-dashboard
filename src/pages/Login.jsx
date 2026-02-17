import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShoppingBag } from 'lucide-react';
import { COLORS, ROLES } from '../utils/constants';

const Login = ({ onDemoLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const roleRoutes = {
    [ROLES.ADMIN]: '/admin/dashboard',
    [ROLES.VENDEDOR]: '/vendedor/dashboard',
    [ROLES.CLIENTE]: '/cliente/portal',
  };

  const handleDemoLoginAndNavigate = (role) => {
    onDemoLogin(role);
    navigate(roleRoutes[role]);
  };

  const handleFormLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Introduce email y contrase\u00f1a');
      return;
    }
    // Demo credentials mapping
    const demoCredentials = {
      'admin@charoruiz.com': ROLES.ADMIN,
      'maria@charoruiz.com': ROLES.VENDEDOR,
      'laura@esparadis.com': ROLES.CLIENTE,
    };
    const role = demoCredentials[email.toLowerCase()];
    if (role) {
      onDemoLogin(role);
      navigate(roleRoutes[role]);
    } else {
      setError('Credenciales no v\u00e1lidas. Usa los botones de demo.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <div style={styles.brandSection}>
          <div style={styles.logoContainer}>
            <ShoppingBag size={48} color="#D4AF37" />
          </div>
          <h1 style={styles.brandName}>CHARO RUIZ</h1>
          <p style={styles.brandSubtitle}>IBIZA</p>
          <div style={styles.divider} />
          <p style={styles.brandTagline}>Dashboard de Gestión de Ventas</p>
        </div>
      </div>

      <div style={styles.rightPanel}>
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>Iniciar Sesión</h2>
          <p style={styles.formSubtitle}>Accede al panel de gestión</p>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contraseña</label>
            <div style={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={styles.errorMsg}>{error}</div>
          )}

          <button onClick={handleFormLogin} style={styles.loginButton}>
            Iniciar Sesión
          </button>

          <div style={styles.demoDivider}>
            <span style={styles.demoDividerText}>Modo Demo</span>
          </div>

          <p style={styles.demoHint}>Accede sin credenciales con un rol de demostración:</p>

          <div style={styles.demoButtons}>
            <button
              onClick={() => handleDemoLoginAndNavigate(ROLES.ADMIN)}
              style={{ ...styles.demoButton, ...styles.demoAdmin }}
            >
              <span style={styles.demoButtonIcon}>👑</span>
              <span>
                <strong style={styles.demoButtonTitle}>Administrador</strong>
                <span style={styles.demoButtonDesc}>Panel completo</span>
              </span>
            </button>

            <button
              onClick={() => handleDemoLoginAndNavigate(ROLES.VENDEDOR)}
              style={{ ...styles.demoButton, ...styles.demoVendedor }}
            >
              <span style={styles.demoButtonIcon}>💼</span>
              <span>
                <strong style={styles.demoButtonTitle}>Vendedor</strong>
                <span style={styles.demoButtonDesc}>Mis ventas y clientes</span>
              </span>
            </button>

            <button
              onClick={() => handleDemoLoginAndNavigate(ROLES.CLIENTE)}
              style={{ ...styles.demoButton, ...styles.demoCliente }}
            >
              <span style={styles.demoButtonIcon}>🛍️</span>
              <span>
                <strong style={styles.demoButtonTitle}>Cliente</strong>
                <span style={styles.demoButtonDesc}>Portal de pedidos</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    background: COLORS.bg_primary,
  },
  leftPanel: {
    flex: '0 0 45%',
    background: 'linear-gradient(135deg, #1a1410 0%, #2c2318 50%, #1a1410 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  brandSection: {
    textAlign: 'center',
    zIndex: 1,
    padding: '40px',
  },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: '50%',
    border: `2px solid ${COLORS.accent_gold}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
    background: 'rgba(212, 175, 55, 0.08)',
  },
  brandName: {
    fontSize: 42,
    fontWeight: 600,
    color: '#FFFFFF',
    letterSpacing: 8,
    fontFamily: "'Playfair Display', Georgia, serif",
    marginBottom: 4,
  },
  brandSubtitle: {
    fontSize: 18,
    color: COLORS.accent_gold,
    letterSpacing: 12,
    fontWeight: 300,
    marginBottom: 24,
  },
  divider: {
    width: 60,
    height: 1,
    background: COLORS.accent_gold,
    margin: '0 auto 24px',
  },
  brandTagline: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  formContainer: {
    width: '100%',
    maxWidth: 420,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 600,
    color: COLORS.text_primary,
    marginBottom: 8,
    fontFamily: "'Playfair Display', Georgia, serif",
  },
  formSubtitle: {
    fontSize: 14,
    color: COLORS.text_light,
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    display: 'block',
    fontSize: 13,
    fontWeight: 500,
    color: COLORS.text_secondary,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: `1px solid ${COLORS.border_light}`,
    borderRadius: 8,
    fontSize: 15,
    color: COLORS.text_primary,
    background: '#FFFFFF',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  },
  passwordWrapper: {
    position: 'relative',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: COLORS.text_light,
    padding: 4,
  },
  errorMsg: {
    background: '#fde8e8',
    color: '#c62828',
    padding: '10px 14px',
    borderRadius: 8,
    fontSize: 13,
    marginBottom: 8,
    textAlign: 'center',
  },
  loginButton: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #D4AF37, #b8962e)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 8,
  },
  demoDivider: {
    textAlign: 'center',
    margin: '28px 0 16px',
    position: 'relative',
    borderTop: `1px solid ${COLORS.border_light}`,
  },
  demoDividerText: {
    background: COLORS.bg_primary,
    padding: '0 16px',
    fontSize: 12,
    color: COLORS.text_light,
    textTransform: 'uppercase',
    letterSpacing: 1,
    position: 'relative',
    top: -9,
  },
  demoHint: {
    fontSize: 13,
    color: COLORS.text_light,
    marginBottom: 16,
    textAlign: 'center',
  },
  demoButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  demoButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '14px 16px',
    border: `1px solid ${COLORS.border_light}`,
    borderRadius: 10,
    cursor: 'pointer',
    transition: 'all 0.2s',
    background: '#FFFFFF',
    textAlign: 'left',
  },
  demoAdmin: {},
  demoVendedor: {},
  demoCliente: {},
  demoButtonIcon: {
    fontSize: 24,
  },
  demoButtonTitle: {
    display: 'block',
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.text_primary,
  },
  demoButtonDesc: {
    display: 'block',
    fontSize: 12,
    color: COLORS.text_light,
    marginTop: 2,
  },
};

export default Login;
