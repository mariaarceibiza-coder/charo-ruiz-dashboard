import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  TrendingUp, TrendingDown, Users, ShoppingCart,
  DollarSign, Target, Eye, Search, ChevronDown,
  ArrowUpRight, ArrowDownRight, MoreHorizontal
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, Legend
} from 'recharts';
import Layout from '../components/Layout';
import { COLORS, ESTADOS_PEDIDOS } from '../utils/constants';
import { formatearDinero } from '../utils/helpers';
import {
  demoVendedores, demoClientes, demoPedidos,
  ventasMensuales, ventasPorZona
} from '../data/demoData';

const CHART_COLORS = ['#D4AF37', '#b8962e', '#8B7355', '#5C4D45', '#3498db', '#2ecc71'];

const StatCard = ({ title, value, change, positive, icon: Icon, color }) => (
  <div style={styles.statCard}>
    <div style={styles.statTop}>
      <div style={{ ...styles.statIcon, background: `${color}15` }}>
        <Icon size={22} color={color} />
      </div>
      <div style={{
        ...styles.changeBadge,
        background: positive ? '#e8f8ef' : '#fde8e8',
        color: positive ? COLORS.status_success : COLORS.status_danger,
      }}>
        {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </div>
    </div>
    <div style={styles.statValue}>{value}</div>
    <div style={styles.statTitle}>{title}</div>
  </div>
);

const DashboardAdmin = ({ user, onLogout }) => {
  const { tab } = useParams();
  const activeTab = tab || 'dashboard';
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'vendedores', label: 'Vendedores' },
    { id: 'clientes', label: 'Clientes' },
    { id: 'pedidos', label: 'Pedidos' },
    { id: 'estadisticas', label: 'Estadísticas' },
  ];

  const totalVentas = demoVendedores.reduce((sum, v) => sum + v.ventasActuales, 0);
  const totalObjetivo = demoVendedores.reduce((sum, v) => sum + v.objetivoAnual, 0);
  const pedidosPendientes = demoPedidos.filter(p => p.estado === ESTADOS_PEDIDOS.PENDIENTE).length;

  const renderDashboard = () => (
    <div>
      <div style={styles.statsGrid}>
        <StatCard
          title="Ventas Totales"
          value={formatearDinero(totalVentas)}
          change="+12.5%"
          positive={true}
          icon={DollarSign}
          color={COLORS.accent_gold}
        />
        <StatCard
          title="Pedidos Activos"
          value={demoPedidos.filter(p => p.estado !== ESTADOS_PEDIDOS.CANCELADO && p.estado !== ESTADOS_PEDIDOS.ENTREGADO).length}
          change="+3"
          positive={true}
          icon={ShoppingCart}
          color={COLORS.status_info}
        />
        <StatCard
          title="Clientes Activos"
          value={demoClientes.length}
          change="+2"
          positive={true}
          icon={Users}
          color={COLORS.status_success}
        />
        <StatCard
          title="Objetivo Anual"
          value={Math.round((totalVentas / totalObjetivo) * 100) + '%'}
          change={formatearDinero(totalObjetivo - totalVentas) + ' restante'}
          positive={totalVentas >= totalObjetivo * 0.7}
          icon={Target}
          color="#9b59b6"
        />
      </div>

      <div style={styles.chartsRow}>
        <div style={{ ...styles.chartCard, flex: 2 }}>
          <div style={styles.chartHeader}>
            <h3 style={styles.chartTitle}>Ventas vs Objetivo Mensual</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={ventasMensuales}>
              <defs>
                <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.accent_gold} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS.accent_gold} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe3" />
              <XAxis dataKey="mes" stroke={COLORS.text_light} fontSize={12} />
              <YAxis stroke={COLORS.text_light} fontSize={12} tickFormatter={(v) => `${v/1000}k`} />
              <Tooltip
                formatter={(value) => formatearDinero(value)}
                contentStyle={{ borderRadius: 8, border: `1px solid ${COLORS.border_light}` }}
              />
              <Legend />
              <Area type="monotone" dataKey="ventas" stroke={COLORS.accent_gold} fillOpacity={1} fill="url(#colorVentas)" name="Ventas" />
              <Area type="monotone" dataKey="objetivo" stroke={COLORS.text_light} fill="none" strokeDasharray="5 5" name="Objetivo" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ ...styles.chartCard, flex: 1 }}>
          <div style={styles.chartHeader}>
            <h3 style={styles.chartTitle}>Ventas por Zona</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ventasPorZona}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                dataKey="ventas"
                nameKey="zona"
                label={({ zona, porcentaje }) => `${porcentaje}%`}
              >
                {ventasPorZona.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatearDinero(value)} />
            </PieChart>
          </ResponsiveContainer>
          <div style={styles.legendList}>
            {ventasPorZona.map((item, i) => (
              <div key={i} style={styles.legendItem}>
                <div style={{ ...styles.legendDot, background: CHART_COLORS[i] }} />
                <span style={styles.legendText}>{item.zona}</span>
                <span style={styles.legendValue}>{formatearDinero(item.ventas)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.chartsRow}>
        <div style={{ ...styles.chartCard, flex: 1 }}>
          <div style={styles.chartHeader}>
            <h3 style={styles.chartTitle}>Rendimiento de Vendedores</h3>
          </div>
          <div style={styles.vendedorList}>
            {demoVendedores.map((v) => {
              const pct = Math.round((v.ventasActuales / v.objetivoAnual) * 100);
              return (
                <div key={v.id} style={styles.vendedorRow}>
                  <div style={styles.vendedorAvatar}>{v.avatar}</div>
                  <div style={styles.vendedorInfo}>
                    <div style={styles.vendedorName}>{v.nombre}</div>
                    <div style={styles.vendedorZona}>{v.zona}</div>
                  </div>
                  <div style={styles.vendedorStats}>
                    <div style={styles.vendedorSales}>{formatearDinero(v.ventasActuales)}</div>
                    <div style={styles.progressBarContainer}>
                      <div style={{ ...styles.progressBar, width: `${pct}%` }} />
                    </div>
                    <div style={styles.vendedorPct}>{pct}% del objetivo</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ ...styles.chartCard, flex: 1 }}>
          <div style={styles.chartHeader}>
            <h3 style={styles.chartTitle}>Pedidos Recientes</h3>
          </div>
          <div style={styles.pedidosList}>
            {demoPedidos.slice(0, 6).map((p) => (
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
                  }}>
                    {p.estado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderVendedores = () => (
    <div>
      <div style={styles.tableHeader}>
        <div style={styles.searchBox}>
          <Search size={18} color={COLORS.text_light} />
          <input
            placeholder="Buscar vendedor..."
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
              <th style={styles.th}>Vendedor</th>
              <th style={styles.th}>Zona</th>
              <th style={styles.th}>Clientes</th>
              <th style={styles.th}>Ventas Actuales</th>
              <th style={styles.th}>Objetivo</th>
              <th style={styles.th}>Cumplimiento</th>
            </tr>
          </thead>
          <tbody>
            {demoVendedores
              .filter(v => v.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(v => {
                const pct = Math.round((v.ventasActuales / v.objetivoAnual) * 100);
                return (
                  <tr key={v.id}>
                    <td style={styles.td}>
                      <div style={styles.cellUser}>
                        <div style={styles.cellAvatar}>{v.avatar}</div>
                        <div>
                          <div style={styles.cellName}>{v.nombre}</div>
                          <div style={styles.cellEmail}>{v.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>{v.zona}</td>
                    <td style={styles.td}>{v.clientesActivos}</td>
                    <td style={{ ...styles.td, fontWeight: 600 }}>{formatearDinero(v.ventasActuales)}</td>
                    <td style={styles.td}>{formatearDinero(v.objetivoAnual)}</td>
                    <td style={styles.td}>
                      <div style={styles.progressBarContainer}>
                        <div style={{
                          ...styles.progressBar,
                          width: `${pct}%`,
                          background: pct >= 80 ? COLORS.status_success : pct >= 50 ? COLORS.accent_gold : COLORS.status_danger,
                        }} />
                      </div>
                      <span style={{ fontSize: 12, color: COLORS.text_light }}>{pct}%</span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderClientes = () => (
    <div>
      <div style={styles.tableHeader}>
        <div style={styles.searchBox}>
          <Search size={18} color={COLORS.text_light} />
          <input
            placeholder="Buscar cliente..."
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
              <th style={styles.th}>Cliente</th>
              <th style={styles.th}>Contacto</th>
              <th style={styles.th}>Zona</th>
              <th style={styles.th}>Vendedor</th>
              <th style={styles.th}>Total Compras</th>
              <th style={styles.th}>Último Pedido</th>
            </tr>
          </thead>
          <tbody>
            {demoClientes
              .filter(c => c.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(c => {
                const vendedor = demoVendedores.find(v => v.id === c.vendedorId);
                return (
                  <tr key={c.id}>
                    <td style={styles.td}>
                      <div style={styles.cellName}>{c.nombre}</div>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.cellName}>{c.contacto}</div>
                      <div style={styles.cellEmail}>{c.email}</div>
                    </td>
                    <td style={styles.td}>{c.zona}</td>
                    <td style={styles.td}>{vendedor?.nombre}</td>
                    <td style={{ ...styles.td, fontWeight: 600 }}>{formatearDinero(c.totalCompras)}</td>
                    <td style={styles.td}>{c.ultimoPedido}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPedidos = () => (
    <div>
      <div style={styles.tableHeader}>
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
              <th style={styles.th}>Vendedor</th>
              <th style={styles.th}>Fecha</th>
              <th style={styles.th}>Items</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Estado</th>
              <th style={styles.th}>Pago</th>
            </tr>
          </thead>
          <tbody>
            {demoPedidos
              .filter(p => p.numero.toLowerCase().includes(searchTerm.toLowerCase()) || p.clienteNombre.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(p => (
                <tr key={p.id}>
                  <td style={{ ...styles.td, fontWeight: 600 }}>{p.numero}</td>
                  <td style={styles.td}>{p.clienteNombre}</td>
                  <td style={styles.td}>{p.vendedorNombre}</td>
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
                      ...styles.statusBadge,
                      background: getPayStatusColor(p.estadoPago).bg,
                      color: getPayStatusColor(p.estadoPago).text,
                    }}>
                      {p.estadoPago}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderEstadisticas = () => (
    <div>
      <div style={styles.chartsRow}>
        <div style={{ ...styles.chartCard, flex: 1 }}>
          <h3 style={styles.chartTitle}>Ventas Mensuales (Comparativa)</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={ventasMensuales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe3" />
              <XAxis dataKey="mes" stroke={COLORS.text_light} fontSize={12} />
              <YAxis stroke={COLORS.text_light} fontSize={12} tickFormatter={(v) => `${v/1000}k`} />
              <Tooltip formatter={(value) => formatearDinero(value)} />
              <Legend />
              <Bar dataKey="ventas" fill={COLORS.accent_gold} name="Ventas" radius={[4, 4, 0, 0]} />
              <Bar dataKey="objetivo" fill={COLORS.border_light} name="Objetivo" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={styles.chartsRow}>
        <div style={{ ...styles.chartCard, flex: 1 }}>
          <h3 style={styles.chartTitle}>Distribución por Zona</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={ventasPorZona} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe3" />
              <XAxis type="number" stroke={COLORS.text_light} fontSize={12} tickFormatter={(v) => `${v/1000}k`} />
              <YAxis type="category" dataKey="zona" stroke={COLORS.text_light} fontSize={12} width={120} />
              <Tooltip formatter={(value) => formatearDinero(value)} />
              <Bar dataKey="ventas" fill={COLORS.accent_gold} name="Ventas" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'vendedores': return renderVendedores();
      case 'clientes': return renderClientes();
      case 'pedidos': return renderPedidos();
      case 'estadisticas': return renderEstadisticas();
      default: return renderDashboard();
    }
  };

  return (
    <Layout user={user} onLogout={onLogout} activeTab={activeTab} basePath="/admin" tabs={tabs}>
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 20,
    marginBottom: 24,
  },
  statCard: {
    background: '#FFFFFF',
    borderRadius: 14,
    padding: '22px 24px',
    border: `1px solid ${COLORS.border_light}`,
  },
  statTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    padding: '4px 10px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 700,
    color: COLORS.text_primary,
    marginBottom: 4,
    fontFamily: "'Playfair Display', serif",
  },
  statTitle: {
    fontSize: 13,
    color: COLORS.text_light,
    fontWeight: 400,
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
  chartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: COLORS.text_primary,
    fontFamily: "'Playfair Display', serif",
  },
  legendList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: '0 8px',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 12,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    flexShrink: 0,
  },
  legendText: {
    color: COLORS.text_secondary,
    flex: 1,
  },
  legendValue: {
    fontWeight: 600,
    color: COLORS.text_primary,
  },
  vendedorList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  vendedorRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '12px 0',
    borderBottom: `1px solid ${COLORS.border_light}`,
  },
  vendedorAvatar: {
    width: 40,
    height: 40,
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
  vendedorInfo: {
    flex: 1,
  },
  vendedorName: {
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.text_primary,
  },
  vendedorZona: {
    fontSize: 12,
    color: COLORS.text_light,
  },
  vendedorStats: {
    flex: 1,
    textAlign: 'right',
  },
  vendedorSales: {
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.text_primary,
    marginBottom: 6,
  },
  vendedorPct: {
    fontSize: 11,
    color: COLORS.text_light,
    marginTop: 4,
  },
  progressBarContainer: {
    height: 6,
    background: '#f0ebe3',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    background: COLORS.accent_gold,
    borderRadius: 3,
    transition: 'width 0.5s ease',
  },
  pedidosList: {
    display: 'flex',
    flexDirection: 'column',
  },
  pedidoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 0',
    borderBottom: `1px solid ${COLORS.border_light}`,
  },
  pedidoNum: {
    fontSize: 14,
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
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.text_primary,
    marginBottom: 4,
  },
  statusBadge: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
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
    minWidth: 300,
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    fontSize: 14,
    color: COLORS.text_primary,
    background: 'transparent',
    flex: 1,
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
  cellUser: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  cellAvatar: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #D4AF37, #b8962e)',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 700,
    flexShrink: 0,
  },
  cellName: {
    fontSize: 13,
    fontWeight: 600,
    color: COLORS.text_primary,
  },
  cellEmail: {
    fontSize: 12,
    color: COLORS.text_light,
  },
};

export default DashboardAdmin;
