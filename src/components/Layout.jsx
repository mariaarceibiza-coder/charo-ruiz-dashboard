import React, { useState } from 'react';
import {
  LayoutDashboard, Users, ShoppingCart, BarChart3, Settings,
  LogOut, ChevronLeft, ChevronRight, ShoppingBag, User, FileText,
  TrendingUp, Package, Bell
} from 'lucide-react';
import { COLORS } from '../utils/constants';

const Layout = ({ children, user, onLogout, activeTab, onTabChange, tabs }) => {
  const [collapsed, setCollapsed] = useState(false);

  const iconMap = {
    dashboard: LayoutDashboard,
    vendedores: Users,
    clientes: User,
    pedidos: ShoppingCart,
    estadisticas: BarChart3,
    configuracion: Settings,
    mis_ventas: TrendingUp,
    mis_clientes: Users,
    mis_pedidos: Package,
    portal: LayoutDashboard,
    historial: FileText,
  };

  return (
    <div style={styles.layout}>
      <aside style={{ ...styles.sidebar, width: collapsed ? 70 : 260 }}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logoRow}>
            <div style={styles.logoIcon}>
              <ShoppingBag size={20} color={COLORS.accent_gold} />
            </div>
            {!collapsed && (
              <div>
                <div style={styles.logoText}>CHARO RUIZ</div>
                <div style={styles.logoSubtext}>IBIZA</div>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={styles.collapseBtn}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav style={styles.nav}>
          {tabs.map((tab) => {
            const Icon = iconMap[tab.id] || LayoutDashboard;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                style={{
                  ...styles.navItem,
                  ...(isActive ? styles.navItemActive : {}),
                }}
              >
                <Icon size={20} color={isActive ? COLORS.accent_gold : COLORS.text_light} />
                {!collapsed && <span style={styles.navLabel}>{tab.label}</span>}
                {isActive && <div style={styles.activeIndicator} />}
              </button>
            );
          })}
        </nav>

        <div style={styles.sidebarFooter}>
          <button onClick={onLogout} style={styles.logoutBtn}>
            <LogOut size={18} color={COLORS.text_light} />
            {!collapsed && <span style={styles.logoutText}>Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      <main style={{ ...styles.main, marginLeft: collapsed ? 70 : 260 }}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.pageTitle}>
              {tabs.find(t => t.id === activeTab)?.label || 'Dashboard'}
            </h1>
          </div>
          <div style={styles.headerRight}>
            <button style={styles.notifBtn}>
              <Bell size={20} color={COLORS.text_secondary} />
              <span style={styles.notifBadge}>3</span>
            </button>
            <div style={styles.userInfo}>
              <div style={styles.avatar}>
                {user.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              {<div>
                <div style={styles.userName}>{user.nombre}</div>
                <div style={styles.userRole}>{user.role}</div>
              </div>}
            </div>
          </div>
        </header>
        <div style={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
};

const styles = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    background: COLORS.bg_primary,
  },
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    background: '#1a1410',
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.3s ease',
    zIndex: 100,
    overflow: 'hidden',
  },
  sidebarHeader: {
    padding: '20px 16px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 72,
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  logoIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    border: `1px solid ${COLORS.accent_gold}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 3,
    fontFamily: "'Playfair Display', serif",
    whiteSpace: 'nowrap',
  },
  logoSubtext: {
    color: COLORS.accent_gold,
    fontSize: 9,
    letterSpacing: 5,
    fontWeight: 300,
  },
  collapseBtn: {
    background: 'rgba(255,255,255,0.05)',
    border: 'none',
    color: COLORS.text_light,
    cursor: 'pointer',
    borderRadius: 6,
    padding: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  nav: {
    flex: 1,
    padding: '16px 8px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '11px 14px',
    border: 'none',
    background: 'transparent',
    color: 'rgba(255,255,255,0.6)',
    cursor: 'pointer',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 400,
    transition: 'all 0.2s',
    position: 'relative',
    whiteSpace: 'nowrap',
    textAlign: 'left',
  },
  navItemActive: {
    background: 'rgba(212, 175, 55, 0.1)',
    color: '#FFFFFF',
  },
  navLabel: {
    flex: 1,
  },
  activeIndicator: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 3,
    height: 20,
    background: COLORS.accent_gold,
    borderRadius: '3px 0 0 3px',
  },
  sidebarFooter: {
    padding: '16px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 14px',
    border: 'none',
    background: 'transparent',
    color: 'rgba(255,255,255,0.5)',
    cursor: 'pointer',
    borderRadius: 8,
    fontSize: 13,
    width: '100%',
    whiteSpace: 'nowrap',
  },
  logoutText: {},
  main: {
    flex: 1,
    transition: 'margin-left 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  header: {
    height: 72,
    background: '#FFFFFF',
    borderBottom: `1px solid ${COLORS.border_light}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: COLORS.text_primary,
    fontFamily: "'Playfair Display', serif",
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },
  notifBtn: {
    position: 'relative',
    background: COLORS.bg_primary,
    border: 'none',
    borderRadius: 10,
    padding: 10,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: '50%',
    background: COLORS.status_danger,
    color: '#fff',
    fontSize: 10,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #D4AF37, #b8962e)',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 1,
  },
  userName: {
    fontSize: 13,
    fontWeight: 600,
    color: COLORS.text_primary,
  },
  userRole: {
    fontSize: 11,
    color: COLORS.text_light,
    textTransform: 'capitalize',
  },
  content: {
    flex: 1,
    padding: 32,
  },
};

export default Layout;
