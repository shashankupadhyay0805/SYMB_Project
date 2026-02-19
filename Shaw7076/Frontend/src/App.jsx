// import { useState } from "react";
// import AddClassroom from "./components/AddClassroom";
// import ClassroomList from "./components/ClassroomList";
// import AllocateExam from "./components/AllocateExam";

// function App() {
//   const [classrooms, setClassrooms] = useState([]);

//   return (
//     <div className="container">
//       <h1>🎓 College Exam Seat Planner</h1>

//       <AddClassroom classrooms={classrooms} setClassrooms={setClassrooms} />

//       <ClassroomList classrooms={classrooms} />

//       <AllocateExam classrooms={classrooms} />
//     </div>
//   );
// }

// export default App;


import { useState, useEffect } from "react";
import AddClassroom from "./components/AddClassroom";
import ClassroomList from "./components/ClassroomList";
import AllocateExam from "./components/AllocateExam";
import OverviewDashboard from "./components/OverviewDashboard";
import StatisticsDashboard from "./components/StatisticsDashboard";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import Navigation from "./components/Navigation";

function App() {
  const [classrooms, setClassrooms] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch classrooms from the backend when the app loads
  useEffect(() => {
    fetch("https://symb-project-uet7.onrender.com/api/classrooms")
      .then((res) => res.json())
      .then((data) => setClassrooms(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewDashboard classrooms={classrooms} />;
      case "add":
        return <AddClassroom classrooms={classrooms} setClassrooms={setClassrooms} />;
      case "list":
        return <ClassroomList classrooms={classrooms} setClassrooms={setClassrooms} />;
      case "allocate":
        return <AllocateExam classrooms={classrooms} />;
      case "statistics":
        return <StatisticsDashboard classrooms={classrooms} />;
      case "analytics":
        return <AnalyticsDashboard classrooms={classrooms} />;
      default:
        return <OverviewDashboard classrooms={classrooms} />;
    }
  };

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <h1>🎓 College Exam Seat Planner</h1>
      </header>
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="container">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;