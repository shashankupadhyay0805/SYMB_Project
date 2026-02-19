function OverviewDashboard({ classrooms }) {
  const totalClassrooms = classrooms.length;
  const totalCapacity = classrooms.reduce((sum, room) => sum + room.capacity, 0);
  const totalFloors = new Set(classrooms.map(room => room.floorNo)).size;
  
  // Get recent classrooms (last 5)
  const recentClassrooms = [...classrooms].slice(-5).reverse();

  return (
    <div className="overview-dashboard">
      <div className="welcome-section">
        <h1>Welcome to College Exam Seat Planner</h1>
        <p className="subtitle">Manage your classroom resources efficiently and allocate exam seats with ease</p>
      </div>

      <div className="quick-stats">
        <div className="quick-stat-card">
          <div className="quick-stat-icon">🏫</div>
          <div className="quick-stat-content">
            <div className="quick-stat-value">{totalClassrooms}</div>
            <div className="quick-stat-label">Classrooms</div>
          </div>
        </div>
        <div className="quick-stat-card">
          <div className="quick-stat-icon">👥</div>
          <div className="quick-stat-content">
            <div className="quick-stat-value">{totalCapacity}</div>
            <div className="quick-stat-label">Total Seats</div>
          </div>
        </div>
        <div className="quick-stat-card">
          <div className="quick-stat-icon">🏢</div>
          <div className="quick-stat-content">
            <div className="quick-stat-value">{totalFloors}</div>
            <div className="quick-stat-label">Floors</div>
          </div>
        </div>
      </div>

      <div className="overview-grid">
        <div className="overview-card">
          <h3>🚀 Quick Actions</h3>
          <div className="quick-actions">
            <div className="action-item">
              <span className="action-icon">➕</span>
              <span className="action-text">Add New Classroom</span>
            </div>
            <div className="action-item">
              <span className="action-icon">📋</span>
              <span className="action-text">View All Classrooms</span>
            </div>
            <div className="action-item">
              <span className="action-icon">🎯</span>
              <span className="action-text">Allocate Exam Seats</span>
            </div>
            <div className="action-item">
              <span className="action-icon">📊</span>
              <span className="action-text">View Statistics</span>
            </div>
          </div>
        </div>

        <div className="overview-card">
          <h3>📝 Recent Classrooms</h3>
          {recentClassrooms.length === 0 ? (
            <p className="empty-state">No classrooms added yet. Start by adding your first classroom!</p>
          ) : (
            <div className="recent-list">
              {recentClassrooms.map((room, index) => (
                <div key={index} className="recent-item">
                  <div className="recent-room-id">{room.roomId}</div>
                  <div className="recent-details">
                    <span>Floor {room.floorNo}</span>
                    <span>•</span>
                    <span>{room.capacity} seats</span>
                    {room.nearWashroom && <span className="washroom-badge">🚿</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OverviewDashboard;
