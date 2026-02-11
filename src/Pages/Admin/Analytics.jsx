import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';

const popularityData = [
  { name: 'Workshop', value: 400 },
  { name: 'Networking', value: 300 },
  { name: 'Keynote', value: 600 },
  { name: 'Panel', value: 200 },
];

const registrationTrend = [
  { day: 'Mon', count: 40 }, { day: 'Tue', count: 70 },
  { day: 'Wed', count: 120 }, { day: 'Thu', count: 90 },
  { day: 'Fri', count: 200 }, { day: 'Sat', count: 250 },
  { day: 'Sun', count: 210 },
];

export default function Analytics() {
  // Styles defined inside to prevent "ReferenceError"
  const containerStyle = {
    padding: '32px',
    backgroundColor: '#f9fafb',
    minHeight: '100vh',
    fontFamily: 'sans-serif'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '24px',
    marginTop: '20px'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    border: '1px solid #e5e7eb'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
        Event Analytics
      </h1>

      <div style={gridStyle}>
        {/* Chart 1 */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: '16px', marginBottom: '20px', fontWeight: '600' }}>Event Popularity</h2>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={popularityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip cursor={{fill: '#f3f4f6'}} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2 */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: '16px', marginBottom: '20px', fontWeight: '600' }}>Registrations Overview</h2>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={registrationTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}