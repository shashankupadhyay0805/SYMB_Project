function Navigation({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'add', label: 'Add Classroom', icon: '➕' },
    { id: 'list', label: 'Classrooms', icon: '📋' },
    { id: 'allocate', label: 'Allocate', icon: '🎯' },
    { id: 'statistics', label: 'Statistics', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' }
  ];

  return (
    <nav className="main-nav">
      <div className="nav-container">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
