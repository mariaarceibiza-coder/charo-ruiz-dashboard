import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  TrendingUp, Users, ShoppingCart, DollarSign, Target,
  ArrowUpRight, ArrowDownRight, Search, Calendar
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts';
import Layout from '../components/Layout';
import { COLORS } from '../utils/constants';
import { formatearDinero } from '../utils/helpers';
import { demoVendedores, demoClientes, demoPedidos, ventasMensuales } from '../data/demoData';

const DashboardVendedor = ({ user, onLogout }) => {
  const { tab } = useParams();
  const activeTab = tab || 'dashboard';
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'dashboard', label: 'Mi Dashboard' },
    { id: 'mis_clientes', label: 'Mis Clientes' },
    { id: 'mis_pedidos', label: 'Mis Pedidos' },
    { id: 'mis_ventas', label: 'Mis Ventas' },
  ];

  const vendedor = demoVendedores.find(v => v.id === user.id) || demoVendedores[0];
  const misClientes = demoClientes.filter(c => c.vendedorId === vendedor.id);
  const misPedidos = demoPedidos.filter(p => p.vendedorId === vendedor.id);
  const pct = Math.round((vendedor.ventasActuales / vendedor.objetivoAnual) * 100);

  const renderDashboard = () => (
    <div>
      <div style={styles.welcomeCard}>
        <div>
          <h2 style={styles.welcomeTitle}>Hola, {vendedor.nombre}</h2>
          <p style={styles.welcomeSubtitle}>Zona: {vendedor.zona} | {misClientes.length} clientes activos</p>
        </div>
        <div style={styles.objetivoBox}>
          <div style={styles.objetivoLabel}>Objetivo Anual</div>
          <div style={styles.objetivoValue}>{pct}%</div>
          <div style={styles.progressBarLg}>
            <div style={{ ...styles.progressBarFill, width: `${pct}%` }} />
          </div>
          <div style={styles.objetivoDetail}>
            {formatearDinero(vendedor.ventasActuales)} de {formatearDinero(vendedor.objetivoAnual)}
          </div>
        </div>
      </div>

      <div style={styles.statsGrid}>
        <StatCard title="Ventas del Mes" value={formatearDinero(vendedor.ventasActuales / 12)} icon={DollarSign} color={COLORS.accent_gold} />
        <StatCard title="Pedidos del Mes" value={vendedor.pedidosMes} icon={ShoppingCart} color={COLORS.status_info} />
        <StatCard title="Clientes Activos" value={vendedor.clientesActivos} icon={Users} color={COLORS.status_success} />
        <StatCard title="Cumplimiento" value={`${pct}%`} icon={Target} color="#9b59b6" />
      </div>

      <div style={styles.chartsRow}>
        <div style={{ ...styles.chartCard, flex: 2 }}>
          <h3 style={styles.chartTitle}>Mis Ventas Mensuales</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={ventasMensuales.map(m => ({ ...m, ventas: Math.round(m.ventas * 0.3) }))}>
              <defs>
                <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.accent_gold} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS.accent_gold} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe3" />
              <XAxis dataKey="mes" stroke={COLORS.text_light} fontSize={12} />
              <YAxis stroke={COLORS.text_light} fontSize={12} tickFormatter={(v) => `${v/1000}k`} />
              <Tooltip formatter={(value) => formatearDinero(value)} />
              <Area type="monotone" dataKey="ventas" stroke={COLORS.accent_gold} fillOpacity={1} fill="url(#colorV)" name="Mis Ventas" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ ...styles.chartCard, flex: 1 }}>
          <h3 style={styles.chartTitle}>Pedidos Recientes</h3>
          <div style={styles.pedidosList}>
            {misPedidos.slice(0, 5).map(p => (
              <div key={p.id} style={styles.pedidoRow}>
                <div>
                  <div style={styles.pedidoNum}>{p.numero}</div>
                  <div style={styles.pedidoCliente}>{p.clienteNombre}</div>
                </div>
                <div style={styles.pedidoRight}>
                  <div style={styles.pedidoTotal}>{formatearDinero(p.total)}</div>
                  <span style={{
                    ...styles.statusBadge,
                    background: getStatusColor(p.estado).bg,
                    color: getStatusColor(p.estado).text,
                  }}>{p.estado}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMisClientes = () => (
    <div>
      <div style={styles.searchBox}>
        <Search size={18} color={COLORS.text_light} />
        <input
          placeholder="Buscar cliente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>
      <div style={styles.clientesGrid}>
        {misClientes
          .filter(c => c.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(c => (
            <div key={c.id} style={styles.clienteCard}>
              <div style={styles.clienteHeader}>
                <div style={styles.clienteAvatar}>
                  {c.nombre.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div style={styles.clienteName}>{c.nombre}</div>
                  <div style={styles.clienteContacto}>{c.contacto}</div>
                </div>
              </div>
              <div style={styles.clienteDetails}>
                <div style={styles.clienteDetail}>
                  <span style={styles.detailLabel}>Zona</span>
                  <span style={styles.detailValue}>{c.zona}</span>
                </div>
                <div style={styles.clienteDetail}>
                  <span style={styles.detailLabel}>Total Compras</span>
                  <span style={{ ...styles.detailValue, fontWeight: 600 }}>{formatearDinero(c.totalCompras)}</span>
                </div>
                <div style={styles.clienteDetail}>
                  <span style={styles.detailLabel}>Último Pedido</span>
                  <span style={styles.detailValue}>{c.ultimoPedido}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  const renderMisPedidos = () => (
    <div>
      <div style={styles.searchBoxRow}>
        <div style={styles.searchBox}>
          <Search size={18} color={COLORS.text_light} />
          <input
            placeholder="Buscar pedido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>N. Pedido</th>
              <th style={styles.th}>Cliente</th>
              <th style={styles.th}>Fecha</th>
              <th style={styles.th}>Items</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Estado</th>
              <th style={styles.th}>Pago</th>
            </tr>
          </thead>
          <tbody>
            {misPedidos
              .filter(p => p.numero.toLowerCase().includes(searchTerm.toLowerCase()) || p.clienteNombre.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(p => (
                <tr key={p.id}>
                  <td style={{ ...styles.td, fontWeight: 600 }}>{p.numero}</td>
                  <td style={styles.td}>{p.clienteNombre}</td>
                  <td style={styles.td}>{p.fecha}</td>
                  <td style={styles.td}>{p.items}</td>
                  <td style={{ ...styles.td, fontWeight: 600 }}>{formatearDinero(p.total)}</td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.statusBadge,
                      background: getStatusColor(p.estado).bg,
                      color: getStatusColor(p.estado).text,
                    }}>{p.estado}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={{
                      ...styles.statusBadge,
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

  const renderMisVentas = () => (
    <div>
      <div style={styles.chartsRow}>
        <div style={{ ...styles.chartCard, flex: 1 }}>
          <h3 style={styles.chartTitle}>Evolución de Ventas</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={ventasMensuales.map(m => ({ ...m, ventas: Math.round(m.ventas * 0.3), objetivo: Math.round(m.objetivo * 0.3) }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe3" />
              <XAxis dataKey="mes" stroke={COLORS.text_light} fontSize={12} />
              <YAxis stroke={COLORS.text_light} fontSize={12} tickFormatter={(v) => `${v/1000}k`} />
              <Tooltip formatter={(value) => formatearDinero(value)} />
              <Legend />
              <Bar dataKey="ventas" fill={COLORS.accent_gold} name="Mis Ventas" radius={[4, 4, 0, 0]} />
              <Bar dataKey="objetivo" fill={COLORS.border_light} name="Objetivo" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Total Año</div>
          <div style={styles.summaryValue}>{formatearDinero(vendedor.ventasActuales)}</div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Objetivo</div>
          <div style={styles.summaryValue}>{formatearDinero(vendedor.objetivoAnual)}</div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Pendiente</div>
          <div style={styles.summaryValue}>{formatearDinero(vendedor.objetivoAnual - vendedor.ventasActuales)}</div>
        </div>
        <div style={styles.summaryCard}>
          <div style={styles.summaryLabel}>Promedio Mensual</div>
          <div style={styles.summaryValue}>{formatearDinero(vendedor.ventasActuales / 12)}</div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'mis_clientes': return renderMisClientes();
      case 'mis_pedidos': return renderMisPedidos();
      case 'mis_ventas': return renderMisVentas();
      default: return renderDashboard();
    }
  };

  return (
    <Layout user={user} onLogout={onLogout} activeTab={activeTab} basePath="/vendedor" tabs={tabs}>
      {renderContent()}
    </Layout>
  );
};

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div style={styles.statCard}>
    <div style={{ ...styles.statIcon, background: `${color}15` }}>
      <Icon size={22} color={color} />
    </div>
    <div style={styles.statValue}>{value}</div>
    <div style={styles.statTitle}>{title}</div>
  </div>
);

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
  welcomeCard: {
    background: 'linear-gradient(135deg, #1a1410, #2c2318)',
    borderRadius: 16,
    padding: '28px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    color: '#FFFFFF',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 600,
    fontFamily: "'Playfair Display', serif",
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
  },
  objetivoBox: {
    textAlign: 'right',
    minWidth: 200,
  },
  objetivoLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  objetivoValue: {
    fontSize: 36,
    fontWeight: 700,
    color: COLORS.accent_gold,
    fontFamily: "'Playfair Display', serif",
    marginBottom: 8,
  },
  progressBarLg: {
    height: 8,
    background: 'rgba(255,255,255,0.15)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressBarFill: {
    height: '100%',
    background: COLORS.accent_gold,
    borderRadius: 4,
    transition: 'width 0.5s ease',
  },
  objetivoDetail: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 20,
    marginBottom: 24,
  },
  statCard: {
    background: '#FFFFFF',
    borderRadius: 14,
    padding: '20px 22px',
    border: `1px solid ${COLORS.border_light}`,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 700,
    color: COLORS.text_primary,
    marginBottom: 4,
    fontFamily: "'Playfair Display', serif",
  },
  statTitle: {
    fontSize: 13,
    color: COLORS.text_light,
  },
  chartsRow: {
    display: 'flex',
    gap: 20,
    marginBottom: 24,
  },
  chartCard: {
    background: '#FFFFFF',
    borderRadius: 14,
    padding: 24,
    border: `1px solid ${COLORS.border_light}`,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.text_primary,
    fontFamily: "'Playfair Display', serif",
    marginBottom: 16,
  },
  pedidosList: {
    display: 'flex',
    flexDirection: 'column',
  },
  pedidoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: `1px solid ${COLORS.border_light}`,
  },
  pedidoNum: {
    fontSize: 13,
    fontWeight: 600,
    color: COLORS.text_primary,
  },
  pedidoCliente: {
    fontSize: 12,
    color: COLORS.text_light,
    marginTop: 2,
  },
  pedidoRight: {
    textAlign: 'right',
  },
  pedidoTotal: {
    fontSize: 13,
    fontWeight: 600,
    color: COLORS.text_primary,
    marginBottom: 4,
  },
  statusBadge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
  },
  searchBoxRow: {
    marginBottom: 16,
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: '#FFFFFF',
    border: `1px solid ${COLORS.border_light}`,
    borderRadius: 10,
    padding: '8px 16px',
    maxWidth: 350,
    marginBottom: 16,
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    fontSize: 14,
    color: COLORS.text_primary,
    background: 'transparent',
    flex: 1,
  },
  clientesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: 16,
  },
  clienteCard: {
    background: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    border: `1px solid ${COLORS.border_light}`,
  },
  clienteHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  clienteAvatar: {
    width: 42,
    height: 42,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #D4AF37, #b8962e)',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: 700,
    flexShrink: 0,
  },
  clienteName: {
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.text_primary,
  },
  clienteContacto: {
    fontSize: 12,
    color: COLORS.text_light,
  },
  clienteDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  clienteDetail: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.text_light,
  },
  detailValue: {
    fontSize: 13,
    color: COLORS.text_primary,
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
  summaryCard: {
    background: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    border: `1px solid ${COLORS.border_light}`,
    textAlign: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: COLORS.text_light,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: 700,
    color: COLORS.text_primary,
    fontFamily: "'Playfair Display', serif",
  },
};

export default DashboardVendedor;
