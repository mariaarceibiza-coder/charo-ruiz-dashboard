import React from 'react';
import { useParams } from 'react-router-dom';
import {
  ShoppingCart, Package, FileText, Clock,
  CheckCircle, Truck, XCircle, AlertCircle
} from 'lucide-react';
import Layout from '../components/Layout';
import { COLORS } from '../utils/constants';
import { formatearDinero } from '../utils/helpers';
import { demoClientes, demoPedidos } from '../data/demoData';

const PortalCliente = ({ user, onLogout }) => {
  const { tab } = useParams();
  const activeTab = tab || 'portal';

  const tabs = [
    { id: 'portal', label: 'Mi Portal' },
    { id: 'mis_pedidos', label: 'Mis Pedidos' },
    { id: 'historial', label: 'Historial' },
  ];

  const cliente = demoClientes.find(c => c.id === user.id) || demoClientes[0];
  const misPedidos = demoPedidos.filter(p => p.clienteId === cliente.id);
  const pedidosActivos = misPedidos.filter(p => p.estado !== 'Entregado' && p.estado !== 'Cancelado');
  const pedidosHistorial = misPedidos.filter(p => p.estado === 'Entregado' || p.estado === 'Cancelado');

  const getStatusIcon = (status) => {
    const icons = {
      'Pendiente': <Clock size={18} color="#e65100" />,
      'En proceso': <AlertCircle size={18} color="#1565c0" />,
      'Aprobado': <CheckCircle size={18} color="#2e7d32" />,
      'Enviado': <Truck size={18} color="#4527a0" />,
      'Entregado': <CheckCircle size={18} color="#00695c" />,
      'Cancelado': <XCircle size={18} color="#c62828" />,
    };
    return icons[status] || <Package size={18} />;
  };

  const renderPortal = () => (
    <div>
      <div style={styles.welcomeBanner}>
        <div>
          <h2 style={styles.welcomeTitle}>Bienvenido, {cliente.contacto}</h2>
          <p style={styles.welcomeSub}>{cliente.nombre}</p>
        </div>
        <div style={styles.welcomeStats}>
          <div style={styles.welcomeStat}>
            <div style={styles.welcomeStatValue}>{misPedidos.length}</div>
            <div style={styles.welcomeStatLabel}>Pedidos</div>
          </div>
          <div style={styles.welcomeStatDivider} />
          <div style={styles.welcomeStat}>
            <div style={styles.welcomeStatValue}>{pedidosActivos.length}</div>
            <div style={styles.welcomeStatLabel}>Activos</div>
          </div>
          <div style={styles.welcomeStatDivider} />
          <div style={styles.welcomeStat}>
            <div style={styles.welcomeStatValue}>{formatearDinero(cliente.totalCompras)}</div>
            <div style={styles.welcomeStatLabel}>Total</div>
          </div>
        </div>
      </div>

      <h3 style={styles.sectionTitle}>Pedidos Activos</h3>
      {pedidosActivos.length === 0 ? (
        <div style={styles.emptyState}>
          <Package size={48} color={COLORS.border_light} />
          <p>No tienes pedidos activos</p>
        </div>
      ) : (
        <div style={styles.pedidosGrid}>
          {pedidosActivos.map(p => (
            <div key={p.id} style={styles.pedidoCard}>
              <div style={styles.pedidoCardHeader}>
                <div>
                  <div style={styles.pedidoCardNum}>{p.numero}</div>
                  <div style={styles.pedidoCardDate}>{p.fecha}</div>
                </div>
                <span style={{
                  ...styles.statusBadge,
                  background: getStatusColor(p.estado).bg,
                  color: getStatusColor(p.estado).text,
                }}>
                  {getStatusIcon(p.estado)}
                  <span style={{ marginLeft: 6 }}>{p.estado}</span>
                </span>
              </div>

              <div style={styles.pedidoCardBody}>
                <div style={styles.pedidoCardRow}>
                  <span style={styles.pedidoCardLabel}>Items</span>
                  <span style={styles.pedidoCardValue}>{p.items} artículos</span>
                </div>
                <div style={styles.pedidoCardRow}>
                  <span style={styles.pedidoCardLabel}>Total</span>
                  <span style={{ ...styles.pedidoCardValue, fontWeight: 700, fontSize: 16 }}>
                    {formatearDinero(p.total)}
                  </span>
                </div>
                <div style={styles.pedidoCardRow}>
                  <span style={styles.pedidoCardLabel}>Estado de Pago</span>
                  <span style={{
                    ...styles.statusBadgeSmall,
                    background: getPayStatusColor(p.estadoPago).bg,
                    color: getPayStatusColor(p.estadoPago).text,
                  }}>{p.estadoPago}</span>
                </div>
              </div>

              <div style={styles.trackingBar}>
                {['Pendiente', 'En proceso', 'Aprobado', 'Enviado', 'Entregado'].map((step, i) => {
                  const steps = ['Pendiente', 'En proceso', 'Aprobado', 'Enviado', 'Entregado'];
                  const currentIdx = steps.indexOf(p.estado);
                  const isActive = i <= currentIdx;
                  return (
                    <div key={step} style={styles.trackingStep}>
                      <div style={{
                        ...styles.trackingDot,
                        background: isActive ? COLORS.accent_gold : COLORS.border_light,
                      }} />
                      {i < 4 && (
                        <div style={{
                          ...styles.trackingLine,
                          background: i < currentIdx ? COLORS.accent_gold : COLORS.border_light,
                        }} />
                      )}
                    </div>
                  );
                })}
              </div>
              <div style={styles.trackingLabels}>
                {['Pendiente', 'Proceso', 'Aprobado', 'Enviado', 'Entregado'].map((label, i) => (
                  <span key={label} style={styles.trackingLabel}>{label}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {pedidosHistorial.length > 0 && (
        <>
          <h3 style={{ ...styles.sectionTitle, marginTop: 32 }}>Últimos Entregados</h3>
          <div style={styles.historialList}>
            {pedidosHistorial.slice(0, 3).map(p => (
              <div key={p.id} style={styles.historialRow}>
                <div style={styles.historialIcon}>
                  {getStatusIcon(p.estado)}
                </div>
                <div style={styles.historialInfo}>
                  <div style={styles.historialNum}>{p.numero}</div>
                  <div style={styles.historialDate}>{p.fecha} | {p.items} artículos</div>
                </div>
                <div style={styles.historialTotal}>{formatearDinero(p.total)}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );

  const renderMisPedidos = () => (
    <div>
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>N. Pedido</th>
              <th style={styles.th}>Fecha</th>
              <th style={styles.th}>Items</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Estado</th>
              <th style={styles.th}>Pago</th>
            </tr>
          </thead>
          <tbody>
            {misPedidos.map(p => (
              <tr key={p.id}>
                <td style={{ ...styles.td, fontWeight: 600 }}>{p.numero}</td>
                <td style={styles.td}>{p.fecha}</td>
                <td style={styles.td}>{p.items}</td>
                <td style={{ ...styles.td, fontWeight: 600 }}>{formatearDinero(p.total)}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.statusBadge,
                    background: getStatusColor(p.estado).bg,
                    color: getStatusColor(p.estado).text,
                  }}>
                    {p.estado}
                  </span>
                </td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.statusBadgeSmall,
                    background: getPayStatusColor(p.estadoPago).bg,
                    color: getPayStatusColor(p.estadoPago).text,
                  }}>{p.estadoPago}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderHistorial = () => (
    <div>
      <div style={styles.summaryCards}>
        <div style={styles.summaryCard}>
          <ShoppingCart size={28} color={COLORS.accent_gold} />
          <div style={styles.summaryValue}>{misPedidos.length}</div>
          <div style={styles.summaryLabel}>Pedidos Totales</div>
        </div>
        <div style={styles.summaryCard}>
          <Package size={28} color={COLORS.status_success} />
          <div style={styles.summaryValue}>{pedidosHistorial.filter(p => p.estado === 'Entregado').length}</div>
          <div style={styles.summaryLabel}>Entregados</div>
        </div>
        <div style={styles.summaryCard}>
          <FileText size={28} color={COLORS.status_info} />
          <div style={styles.summaryValue}>{formatearDinero(cliente.totalCompras)}</div>
          <div style={styles.summaryLabel}>Total Compras</div>
        </div>
      </div>

      <h3 style={styles.sectionTitle}>Todos los Pedidos</h3>
      <div style={styles.historialList}>
        {misPedidos.map(p => (
          <div key={p.id} style={styles.historialRow}>
            <div style={styles.historialIcon}>
              {getStatusIcon(p.estado)}
            </div>
            <div style={styles.historialInfo}>
              <div style={styles.historialNum}>{p.numero}</div>
              <div style={styles.historialDate}>{p.fecha} | {p.items} artículos</div>
            </div>
            <div style={styles.historialRight}>
              <div style={styles.historialTotal}>{formatearDinero(p.total)}</div>
              <span style={{
                ...styles.statusBadgeSmall,
                background: getStatusColor(p.estado).bg,
                color: getStatusColor(p.estado).text,
              }}>{p.estado}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'mis_pedidos': return renderMisPedidos();
      case 'historial': return renderHistorial();
      default: return renderPortal();
    }
  };

  return (
    <Layout user={{ ...user, nombre: cliente.contacto }} onLogout={onLogout} activeTab={activeTab} basePath="/cliente" tabs={tabs}>
      {renderContent()}
    </Layout>
  );
};

const getStatusColor = (status) => {
  const map = {
    'Pendiente': { bg: '#fff3e0', text: '#e65100' },
    'En proceso': { bg: '#e3f2fd', text: '#1565c0' },
    'Aprobado': { bg: '#e8f5e9', text: '#2e7d32' },
    'Enviado': { bg: '#ede7f6', text: '#4527a0' },
    'Entregado': { bg: '#e0f2f1', text: '#00695c' },
    'Cancelado': { bg: '#fce4ec', text: '#c62828' },
  };
  return map[status] || { bg: '#f5f5f5', text: '#616161' };
};

const getPayStatusColor = (status) => {
  const map = {
    'Pendiente': { bg: '#fff3e0', text: '#e65100' },
    'Parcial': { bg: '#e3f2fd', text: '#1565c0' },
    'Pagado': { bg: '#e8f5e9', text: '#2e7d32' },
  };
  return map[status] || { bg: '#f5f5f5', text: '#616161' };
};

const styles = {
  welcomeBanner: {
    background: 'linear-gradient(135deg, #1a1410, #2c2318)',
    borderRadius: 16,
    padding: '28px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    color: '#FFFFFF',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 600,
    fontFamily: "'Playfair Display', serif",
    marginBottom: 4,
  },
  welcomeSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
  },
  welcomeStats: {
    display: 'flex',
    alignItems: 'center',
    gap: 24,
  },
  welcomeStat: {
    textAlign: 'center',
  },
  welcomeStatValue: {
    fontSize: 22,
    fontWeight: 700,
    color: COLORS.accent_gold,
    fontFamily: "'Playfair Display', serif",
  },
  welcomeStatLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 2,
  },
  welcomeStatDivider: {
    width: 1,
    height: 40,
    background: 'rgba(255,255,255,0.1)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: COLORS.text_primary,
    fontFamily: "'Playfair Display', serif",
    marginBottom: 16,
  },
  pedidosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: 16,
  },
  pedidoCard: {
    background: '#FFFFFF',
    borderRadius: 14,
    padding: 24,
    border: `1px solid ${COLORS.border_light}`,
  },
  pedidoCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  pedidoCardNum: {
    fontSize: 16,
    fontWeight: 700,
    color: COLORS.text_primary,
  },
  pedidoCardDate: {
    fontSize: 12,
    color: COLORS.text_light,
    marginTop: 2,
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 14px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
  },
  statusBadgeSmall: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
  },
  pedidoCardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 20,
  },
  pedidoCardRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pedidoCardLabel: {
    fontSize: 13,
    color: COLORS.text_light,
  },
  pedidoCardValue: {
    fontSize: 13,
    color: COLORS.text_primary,
  },
  trackingBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 4px',
    marginBottom: 6,
  },
  trackingStep: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  trackingDot: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    flexShrink: 0,
  },
  trackingLine: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    marginLeft: 2,
  },
  trackingLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 0px',
  },
  trackingLabel: {
    fontSize: 9,
    color: COLORS.text_light,
    textAlign: 'center',
  },
  emptyState: {
    textAlign: 'center',
    padding: 48,
    color: COLORS.text_light,
    fontSize: 14,
  },
  historialList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  historialRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '14px 20px',
    background: '#FFFFFF',
    borderRadius: 12,
    border: `1px solid ${COLORS.border_light}`,
  },
  historialIcon: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: COLORS.bg_primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  historialInfo: {
    flex: 1,
  },
  historialNum: {
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.text_primary,
  },
  historialDate: {
    fontSize: 12,
    color: COLORS.text_light,
  },
  historialRight: {
    textAlign: 'right',
  },
  historialTotal: {
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.text_primary,
    marginBottom: 4,
  },
  summaryCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 16,
    marginBottom: 32,
  },
  summaryCard: {
    background: '#FFFFFF',
    borderRadius: 14,
    padding: 24,
    border: `1px solid ${COLORS.border_light}`,
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: 700,
    color: COLORS.text_primary,
    fontFamily: "'Playfair Display', serif",
    margin: '8px 0 4px',
  },
  summaryLabel: {
    fontSize: 12,
    color: COLORS.text_light,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableCard: {
    background: '#FFFFFF',
    borderRadius: 14,
    border: `1px solid ${COLORS.border_light}`,
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '14px 20px',
    fontSize: 12,
    fontWeight: 600,
    color: COLORS.text_light,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    background: COLORS.bg_secondary,
    borderBottom: `1px solid ${COLORS.border_light}`,
  },
  td: {
    padding: '14px 20px',
    fontSize: 13,
    color: COLORS.text_secondary,
    borderBottom: `1px solid ${COLORS.border_light}`,
  },
};

export default PortalCliente;
