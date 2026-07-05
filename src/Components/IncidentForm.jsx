import  { useState } from 'react';

const IncidentDashboard = () => {
  // 1. Mock DB Data representing multiple tickets from various groups, dates, and re-routing statuses
  const mockDatabaseTickets = [
    { id: 'INC-2026-001', group: 'WIntel', assignedTo: 'Alex Mercer', status: 'In Progress', date: '2026-06-01', errorType: 'Database Timeout', desc: 'Primary DB replica experienced connection pool exhaustion.', assignedToAnotherGroup: 'YES' },
    { id: 'INC-2026-002', group: 'OD', assignedTo: 'Sarah Connor', status: 'Resolved', date: '2026-06-02', errorType: 'Authentication Failure', desc: 'SSO token validation failing for external domain users.', assignedToAnotherGroup: 'NO' },
    { id: 'INC-2026-003', group: 'WIntel', assignedTo: 'David Lightman', status: 'New', date: '2026-06-05', errorType: 'Network/API Latency', desc: 'Gateway timeout on microservices router layer.', assignedToAnotherGroup: 'NO' },
    { id: 'INC-2026-004', group: 'OD', assignedTo: 'Ellen Ripley', status: 'On Hold', date: '2026-06-07', errorType: 'Permission Denied', desc: 'S3 bucket access policy block affecting automated image uploads.', assignedToAnotherGroup: 'YES' },
    { id: 'INC-2026-005', group: 'WIntel', assignedTo: 'John Doe', status: 'Resolved', date: '2026-06-08', errorType: 'UI Rendering Error', desc: 'Webpack chunk loading error on legacy dashboard module.', assignedToAnotherGroup: 'NO' },
    { id: 'INC-2026-006', group: 'OD', assignedTo: 'Sarah Connor', status: 'In Progress', date: '2026-06-09', errorType: 'Database Timeout', desc: 'Deadlock observed during bulk batch updates.', assignedToAnotherGroup: 'YES' }
  ];

  // 2. State for Date Filters
  const [startDate, setStartDate] = useState('2026-06-01');
  const [endDate, setEndDate] = useState('2026-06-09');

  // 3. Filtering Logic based on user selected dates
  const filteredTickets = mockDatabaseTickets.filter(ticket => {
    return ticket.date >= startDate && ticket.date <= endDate;
  });

  // Calculate high-level dynamic metrics for the selected range
  const totalTickets = filteredTickets.length;
  const activeTickets = filteredTickets.filter(t => t.status !== 'Resolved' && t.status !== 'Closed').length;
  const resolvedTickets = filteredTickets.filter(t => t.status === 'Resolved').length;

  // Kept only the metrics counter for re-routed YES status
  const reroutedYesCount = filteredTickets.filter(t => t.assignedToAnotherGroup === 'YES').length;

  // Status Chip UI Stylers
  const getStatusStyle = (status) => {
    const base = { padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', display: 'inline-block' };
    switch (status) {
      case 'New': return { ...base, backgroundColor: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe' };
      case 'In Progress': return { ...base, backgroundColor: '#fffbeb', color: '#b45309', border: '1px solid #fde68a' };
      case 'Resolved': return { ...base, backgroundColor: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0' };
      default: return { ...base, backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1' };
    }
  };

  // Modern Enterprise CSS Rules (Inline JS Object)
  const styles = {
    container: {
      maxWidth: '1300px',
      margin: '30px auto',
      padding: '0 20px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#0f172a'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px'
    },
    title: { fontSize: '24px', fontWeight: '700', margin: 0, letterSpacing: '-0.02em' },
    subtitle: { fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' },

    // Filter Toolbar
    filterBar: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      backgroundColor: '#ffffff',
      padding: '16px 24px',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      marginBottom: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
    },
    filterLabel: { fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' },
    dateInput: {
      padding: '8px 12px',
      border: '1px solid #cbd5e1',
      borderRadius: '6px',
      fontSize: '14px',
      color: '#0f172a',
      outline: 'none',
      backgroundColor: '#f8fafc'
    },

    // Metrics Ribbon (Adjusted grid template columns for 4 cards)
    statsRibbon: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    },
    statCard: {
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.01)'
    },
    statNum: { fontSize: '28px', fontWeight: '700', color: '#0f172a' },

    // Data Table System
    tableWrapper: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)',
      overflow: 'hidden'
    },
    table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' },
    th: { backgroundColor: '#f8fafc', padding: '14px 20px', color: '#475569', fontWeight: '600', borderBottom: '1px solid #e2e8f0' },
    tr: { borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.2s' },
    td: { padding: '16px 20px', color: '#334155', verticalAlign: 'top' },
    emptyState: { padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '15px' },
    groupBadge: (g) => ({
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '600',
      backgroundColor: g === 'WIntel' ? '#f0fdf4' : '#f5f3ff',
      color: g === 'WIntel' ? '#166534' : '#5b21b6',
      border: g === 'WIntel' ? '1px solid #bbf7d0' : '1px solid #ddd6fe'
    }),
    routingBadge: (isYes) => ({
      padding: '4px 8px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '600',
      backgroundColor: isYes ? '#fff1f2' : '#f8fafc',
      color: isYes ? '#e11d48' : '#64748b',
      border: isYes ? '1px solid #ffe4e6' : '1px solid #e2e8f0'
    })
  };

  return (
    <div style={styles.container}>

      {/* Upper Brand/Title Bar */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Incident Operations</h1>
          <p style={styles.subtitle}>Consolidated data of - OD, WINTEL, LINUX.</p>
        </div>
      </div>

      {/* Date Range Selection Toolbar */}
      <div style={styles.filterBar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={styles.filterLabel}>From:</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={styles.dateInput}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={styles.filterLabel}>To:</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={styles.dateInput}
          />
        </div>
        <div style={{ marginLeft: 'auto', fontSize: '13px', color: '#64748b', fontWeight: '500' }}>
          Showing cross-group data for: <strong style={{ color: '#0f172a' }}>{startDate}</strong> to <strong style={{ color: '#0f172a' }}>{endDate}</strong>
        </div>
      </div>

      {/* Real-time Dynamic Metrics Ribbons */}
      <div style={styles.statsRibbon}>
        <div style={styles.statCard}>
          <span style={styles.filterLabel}>Total Logs Found</span>
          <span style={styles.statNum}>{totalTickets}</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.filterLabel}>Active Unresolved</span>
          <span style={{ ...styles.statNum, color: '#b45309' }}>{activeTickets}</span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.filterLabel}>Total Resolved</span>
          <span style={{ ...styles.statNum, color: '#047857' }}>{resolvedTickets}</span>
        </div>
        {/* KPI Card: Re-routed YES */}
        <div style={styles.statCard}>
          <span style={styles.filterLabel}>Re-Routed (YES)</span>
          <span style={{ ...styles.statNum, color: '#e11d48' }}>{reroutedYesCount}</span>
        </div>
      </div>

      {/* Master Interactive Ledger Grid/Table */}
      <div style={styles.tableWrapper}>
        {filteredTickets.length === 0 ? (
          <div style={styles.emptyState}>
            ⚠️ No incidents found matching the selected range or groups. Try extending your dates.
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Incident ID</th>
                <th style={styles.th}>Assigned Group</th>
                <th style={styles.th}>Owner</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Log Date</th>
                <th style={styles.th}>Re-Routed?</th>
                <th style={styles.th}>Error Profile</th>
                <th style={{ ...styles.th, width: '30%' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} style={styles.tr}>
                  <td style={{ ...styles.td, fontWeight: '700', color: '#1e293b' }}>{ticket.id}</td>
                  <td style={styles.td}>
                    <span style={styles.groupBadge(ticket.group)}>{ticket.group}</span>
                  </td>
                  <td style={{ ...styles.td, fontWeight: '500' }}>{ticket.assignedTo}</td>
                  <td style={styles.td}>
                    <span style={getStatusStyle(ticket.status)}>{ticket.status}</span>
                  </td>
                  <td style={{ ...styles.td, color: '#64748b', whiteSpace: 'nowrap' }}>{ticket.date}</td>
                  {/* Dynamic Inline Row Indicator for Re-routing */}
                  <td style={styles.td}>
                    <span style={styles.routingBadge(ticket.assignedToAnotherGroup === 'YES')}>
                      {ticket.assignedToAnotherGroup}
                    </span>
                  </td>
                  <td style={{ ...styles.td, fontWeight: '500', color: '#475569' }}>{ticket.errorType}</td>
                  <td style={{ ...styles.td, color: '#64748b', lineHeight: '1.4' }}>{ticket.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default IncidentDashboard;