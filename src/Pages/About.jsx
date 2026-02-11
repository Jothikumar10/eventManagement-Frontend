import React from 'react';

export default function About() {
  // All styles defined as objects to ensure no "ReferenceErrors"
  const styles = {
    page: {
      backgroundColor: '#020617', // Deepest midnight blue
      backgroundImage: 'radial-gradient(circle at top right, #1e293b, #020617)',
      minHeight: '100vh',
      color: '#f8fafc',
      fontFamily: '"Inter", system-ui, sans-serif',
      padding: '60px 20px',
    },
    container: {
      maxWidth: '1100px',
      margin: '0 auto',
    },
    heroSection: {
      textAlign: 'center',
      marginBottom: '80px',
    },
    badge: {
      background: 'rgba(59, 130, 246, 0.1)',
      color: '#60a5fa',
      padding: '6px 16px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      border: '1px solid rgba(59, 130, 246, 0.2)',
      marginBottom: '20px',
      display: 'inline-block',
    },
    glassCard: {
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '24px',
      padding: '40px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginTop: '40px',
    },
    statItem: {
      textAlign: 'center',
      padding: '20px',
    },
    accentText: {
      background: 'linear-gradient(to right, #60a5fa, #a855f7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: '800',
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        
        {/* Header */}
        <div style={styles.heroSection}>
          <span style={styles.badge}>Our Story</span>
          <h1 style={{ fontSize: '52px', fontWeight: '800', marginBottom: '20px', letterSpacing: '-1px' }}>
            We build the future of <span style={styles.accentText}>Event Intelligence</span>
          </h1>
          <p style={{ fontSize: '20px', color: '#94a3b8', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Empowering organizers with real-time data to create seamless, high-impact experiences across the globe.
          </p>
        </div>

        {/* Vision Card */}
        <div style={styles.glassCard}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'center' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>The Prime Mission</h2>
              <p style={{ color: '#94a3b8', fontSize: '18px', lineHeight: '1.8' }}>
                Founded in 2024, our platform was born out of a simple necessity: data should be beautiful and actionable. 
                We've spent thousands of hours perfecting an engine that processes millions of attendee interactions 
                per second, giving you a "God-view" of your events.
              </p>
            </div>
            
            {/* Stats Inside Vision Card */}
            <div style={{ flex: '1 1 300px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={styles.statItem}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#60a5fa' }}>99%</div>
                <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase' }}>Accuracy</div>
              </div>
              <div style={styles.statItem}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#60a5fa' }}>24/7</div>
                <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase' }}>Uptime</div>
              </div>
              <div style={styles.statItem}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#60a5fa' }}>1.2M</div>
                <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase' }}>Users</div>
              </div>
              <div style={styles.statItem}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#60a5fa' }}>50+</div>
                <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase' }}>Partners</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div style={styles.grid}>
          <div style={{...styles.glassCard, padding: '30px'}}>
            <h3 style={{ color: '#60a5fa', marginBottom: '10px' }}>Security First</h3>
            <p style={{ color: '#94a3b8', fontSize: '15px' }}>Enterprise-grade encryption for every data packet. Your privacy is our prime directive.</p>
          </div>
          <div style={{...styles.glassCard, padding: '30px'}}>
            <h3 style={{ color: '#60a5fa', marginBottom: '10px' }}>Global Scale</h3>
            <p style={{ color: '#94a3b8', fontSize: '15px' }}>Deployed across 12 regions to ensure ultra-low latency no matter where your event is held.</p>
          </div>
          <div style={{...styles.glassCard, padding: '30px'}}>
            <h3 style={{ color: '#60a5fa', marginBottom: '10px' }}>AI Driven</h3>
            <p style={{ color: '#94a3b8', fontSize: '15px' }}>Predictive modeling helps you anticipate registration spikes before they happen.</p>
          </div>
        </div>

        
      </div>
    </div>
  );
}