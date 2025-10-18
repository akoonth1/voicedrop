import React, { useState, useEffect } from 'react';

export default function Nav() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navItems = [
    { to: '/profile', label: 'Profile' },
    { to: '/recorder', label: 'Recorder' }
  ];

  const container = {
    position: 'fixed', // locked to top
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 16px',
    borderBottom: '1px solid #e6e6e6',
    background: '#fff',
    zIndex: 1000,
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
  };

  const linkStyle = (active) => ({
    padding: '8px 12px',
    borderRadius: 6,
    textDecoration: 'none',
    color: active ? '#fff' : '#333',
    background: active ? '#007bff' : 'transparent',
    border: active ? '1px solid #007bff' : '1px solid transparent',
    cursor: 'pointer',
    fontWeight: 600
  });

  // Navigate client-side (SPA) when possible, otherwise fallback to normal navigation
  const handleNav = (e, to) => {
    // allow ctrl/meta clicks to open in new tab
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    if (window.location.pathname === to) return;
    history.pushState({}, '', to);
    setPath(to);
    // notify routers / app listeners
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <nav style={container} role="navigation" aria-label="Main">
      {navItems.map((n) => (
        <a
          key={n.to}
          href={n.to}
          onClick={(e) => handleNav(e, n.to)}
          style={linkStyle(path === n.to)}
        >
          {n.label}
        </a>
      ))}
    </nav>
  );
}