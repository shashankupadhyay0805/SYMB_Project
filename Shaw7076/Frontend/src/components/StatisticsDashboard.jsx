function StatisticsDashboard({ classrooms }) {
  // Calculate statistics
  const totalClassrooms = classrooms.length;
  const totalCapacity = classrooms.reduce((sum, room) => sum + room.capacity, 0);
  const totalFloors = new Set(classrooms.map(room => room.floorNo)).size;
  const roomsNearWashroom = classrooms.filter(room => room.nearWashroom).length;
  const averageCapacity = totalClassrooms > 0 ? Math.round(totalCapacity / totalClassrooms) : 0;
  
  // Floor distribution
  const floorDistribution = {};
  classrooms.forEach(room => {
    floorDistribution[room.floorNo] = (floorDistribution[room.floorNo] || 0) + 1;
  });

  const stats = [
    {
      title: "Total Classrooms",
      value: totalClassrooms,
      icon: "🏫",
      color: "#4f46e5",
      bgColor: "#eef2ff"
    },
    {
      title: "Total Capacity",
      value: totalCapacity,
      icon: "👥",
      color: "#10b981",
      bgColor: "#d1fae5"
    },
    {
      title: "Total Floors",
      value: totalFloors,
      icon: "🏢",
      color: "#f59e0b",
      bgColor: "#fef3c7"
    },
    {
      title: "Near Washroom",
      value: roomsNearWashroom,
      icon: "🚿",
      color: "#3b82f6",
      bgColor: "#dbeafe"
    },
    {
      title: "Avg Capacity",
      value: averageCapacity,
      icon: "📊",
      color: "#8b5cf6",
      bgColor: "#ede9fe"
    },
    {
      title: "Utilization",
      value: totalClassrooms > 0 ? "100%" : "0%",
      icon: "📈",
      color: "#ec4899",
      bgColor: "#fce7f3"
    }
  ];

  return (
    <div className="statistics-dashboard">
      <h2>📊 Statistics Dashboard</h2>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
            <div className="stat-icon" style={{ backgroundColor: stat.bgColor, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-title">{stat.title}</div>
            </div>
          </div>
        ))}
      </div>

      {totalClassrooms > 0 && (
        <div className="floor-distribution">
          <h3>Floor Distribution</h3>
          <div className="floor-bars">
            {Object.entries(floorDistribution)
              .sort((a, b) => Number(a[0]) - Number(b[0]))
              .map(([floor, count]) => (
                <div key={floor} className="floor-bar-item">
                  <div className="floor-label">Floor {floor}</div>
                  <div className="floor-bar-container">
                    <div 
                      className="floor-bar" 
                      style={{ 
                        width: `${(count / totalClassrooms) * 100}%`,
                        backgroundColor: "#4f46e5"
                      }}
                    >
                      <span className="floor-count">{count} rooms</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StatisticsDashboard;
