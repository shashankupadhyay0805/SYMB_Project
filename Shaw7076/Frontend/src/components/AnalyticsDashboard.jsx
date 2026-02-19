function AnalyticsDashboard({ classrooms }) {
  if (classrooms.length === 0) {
    return (
      <div className="analytics-dashboard">
        <h2>📈 Analytics Dashboard</h2>
        <p className="empty-state">No data available. Add classrooms to see analytics.</p>
      </div>
    );
  }

  // Calculate capacity by floor
  const capacityByFloor = {};
  const roomsByFloor = {};
  
  classrooms.forEach(room => {
    if (!capacityByFloor[room.floorNo]) {
      capacityByFloor[room.floorNo] = 0;
      roomsByFloor[room.floorNo] = 0;
    }
    capacityByFloor[room.floorNo] += room.capacity;
    roomsByFloor[room.floorNo] += 1;
  });

  const floors = Object.keys(capacityByFloor).map(Number).sort((a, b) => a - b);
  const maxCapacity = Math.max(...Object.values(capacityByFloor));
  const totalCapacity = classrooms.reduce((sum, room) => sum + room.capacity, 0);

  // Capacity distribution
  const capacityRanges = {
    "Small (1-30)": classrooms.filter(r => r.capacity <= 30).length,
    "Medium (31-60)": classrooms.filter(r => r.capacity > 30 && r.capacity <= 60).length,
    "Large (61-90)": classrooms.filter(r => r.capacity > 60 && r.capacity <= 90).length,
    "Extra Large (90+)": classrooms.filter(r => r.capacity > 90).length
  };

  return (
    <div className="analytics-dashboard">
      <h2>📈 Analytics Dashboard</h2>
      
      <div className="analytics-grid">
        {/* Capacity by Floor Chart */}
        <div className="analytics-card">
          <h3>Capacity by Floor</h3>
          <div className="chart-container">
            {floors.map(floor => {
              const capacity = capacityByFloor[floor];
              const percentage = (capacity / maxCapacity) * 100;
              return (
                <div key={floor} className="chart-item">
                  <div className="chart-label">
                    <span>Floor {floor}</span>
                    <span className="chart-value">{capacity} seats</span>
                  </div>
                  <div className="chart-bar-container">
                    <div 
                      className="chart-bar" 
                      style={{ 
                        width: `${percentage}%`,
                        background: `linear-gradient(90deg, #4f46e5, #7c3aed)`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Room Distribution */}
        <div className="analytics-card">
          <h3>Room Distribution by Floor</h3>
          <div className="room-distribution">
            {floors.map(floor => {
              const count = roomsByFloor[floor];
              const percentage = (count / classrooms.length) * 100;
              return (
                <div key={floor} className="distribution-item">
                  <div className="distribution-header">
                    <span>Floor {floor}</span>
                    <span className="distribution-count">{count} rooms</span>
                  </div>
                  <div className="distribution-bar-container">
                    <div 
                      className="distribution-bar" 
                      style={{ 
                        width: `${percentage}%`,
                        background: `linear-gradient(90deg, #10b981, #059669)`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Capacity Range Distribution */}
        <div className="analytics-card">
          <h3>Capacity Range Distribution</h3>
          <div className="capacity-ranges">
            {Object.entries(capacityRanges).map(([range, count]) => {
              const percentage = (count / classrooms.length) * 100;
              return (
                <div key={range} className="range-item">
                  <div className="range-label">
                    <span>{range}</span>
                    <span className="range-count">{count} rooms</span>
                  </div>
                  <div className="range-bar-container">
                    <div 
                      className="range-bar" 
                      style={{ 
                        width: `${percentage}%`,
                        background: `linear-gradient(90deg, #f59e0b, #d97706)`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Washroom Proximity */}
        <div className="analytics-card">
          <h3>Washroom Proximity</h3>
          <div className="washroom-stats">
            <div className="washroom-item">
              <div className="washroom-icon">🚿</div>
              <div className="washroom-info">
                <div className="washroom-label">Near Washroom</div>
                <div className="washroom-count">
                  {classrooms.filter(r => r.nearWashroom).length} rooms
                </div>
              </div>
            </div>
            <div className="washroom-item">
              <div className="washroom-icon">📍</div>
              <div className="washroom-info">
                <div className="washroom-label">Not Near Washroom</div>
                <div className="washroom-count">
                  {classrooms.filter(r => !r.nearWashroom).length} rooms
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
