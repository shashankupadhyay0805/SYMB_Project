// // This component allocates exam seats using a greedy approach

// import { useState } from "react";

// function AllocateExam({ classrooms }) {
//   const [students, setStudents] = useState("");
//   const [result, setResult] = useState(null);

//   const allocateSeats = () => {
//     let totalStudents = Number(students);

//     if (!totalStudents || totalStudents <= 0) {
//       alert("Enter valid number of students");
//       return;
//     }

//     // let sortedRooms = [...classrooms].sort(
//     //   (a, b) => a.floorNo - b.floorNo
//     // );
//     let sortedRooms = [...classrooms].sort((a, b) => {
//   if (a.floorNo === b.floorNo) {
//     return b.capacity - a.capacity; // Sort by largest capacity descending to minimize rooms
//   }
//   return a.floorNo - b.floorNo; // Sort by lowest floor ascending
// });

//     let allocated = [];
//     let totalSeats = 0;

//     for (let room of sortedRooms) {
//       allocated.push(room);
//       totalSeats += room.capacity;

//       if (totalSeats >= totalStudents) break;
//     }

//     if (totalSeats < totalStudents) {
//       setResult("Not enough seats available");
//     } else {
//       setResult(allocated);
//     }
//   };

//   return (
//     <div className="card">
//       <h2>Allocate Exam Seats</h2>

//       <input
//         type="number"
//         placeholder="Total Students"
//         value={students}
//         onChange={(e) => setStudents(e.target.value)}
//       />

//       <button onClick={allocateSeats}>Allocate</button>

//       <div className="output">
//         {typeof result === "string" && <p className="error">{result}</p>}

//         {Array.isArray(result) && (
//           <>
//             <h3>Allocated Classrooms</h3>
//             <ul>
//               {result.map((room, i) => (
//                 <li key={i}>
//                   {room.roomId} (Floor {room.floorNo}, Seats {room.capacity})
//                 </li>
//               ))}
//             </ul>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AllocateExam;


import { useState } from "react";

function AllocateExam({ classrooms }) {
  const [students, setStudents] = useState("");
  const [result, setResult] = useState(null);

  const allocateSeats = () => {
    let totalStudents = Number(students);

    if (!totalStudents || totalStudents <= 0) {
      alert("Enter valid number of students");
      return;
    }

    let allocated = [];
    let remainingStudents = totalStudents;
    
    // Create a copy of classrooms so we can remove them as they get allocated
    let availableRooms = [...classrooms];

    while (remainingStudents > 0 && availableRooms.length > 0) {
      // 1. Find the lowest floor that still has available rooms
      availableRooms.sort((a, b) => a.floorNo - b.floorNo);
      let currentFloor = availableRooms[0].floorNo;
      
      // 2. Get all rooms on this specific floor
      let roomsOnFloor = availableRooms.filter(r => r.floorNo === currentFloor);
      
      // 3. Look for rooms that can single-handedly fit the remaining students
      let roomsThatFit = roomsOnFloor.filter(r => r.capacity >= remainingStudents);
      
      let chosenRoom;

      if (roomsThatFit.length > 0) {
        // BEST FIT: Sort by smallest capacity first, so we don't waste big rooms
        roomsThatFit.sort((a, b) => a.capacity - b.capacity);
        chosenRoom = roomsThatFit[0];
      } else {
        // GREEDY: If no single room fits them all, take the BIGGEST room on this floor
        roomsOnFloor.sort((a, b) => b.capacity - a.capacity);
        chosenRoom = roomsOnFloor[0];
      }
      
      // 4. Allocate the chosen room
      allocated.push(chosenRoom);
      remainingStudents -= chosenRoom.capacity;
      
      // 5. Remove the chosen room from the available pool
      availableRooms = availableRooms.filter(r => r.roomId !== chosenRoom.roomId);
    }

    // Check if we managed to seat everyone
    if (remainingStudents > 0) {
      setResult("Not enough seats available");
    } else {
      setResult(allocated);
    }
  };

  const totalCapacity = classrooms.reduce((sum, room) => sum + room.capacity, 0);

  return (
    <div className="card">
      <h2>🎯 Allocate Exam Seats</h2>
      
      <div className="allocation-info">
        <div className="info-item">
          <span className="info-label">📊 Total Available Capacity:</span>
          <span className="info-value">{totalCapacity} seats</span>
        </div>
        <div className="info-item">
          <span className="info-label">🏫 Total Classrooms:</span>
          <span className="info-value">{classrooms.length}</span>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="students" className="form-label">
          👥 Number of Students
        </label>
        <input
          id="students"
          type="number"
          placeholder="Enter total number of students"
          value={students}
          onChange={(e) => setStudents(e.target.value)}
          min="1"
        />
      </div>

      <button onClick={allocateSeats} className="allocate-btn">
        🎯 Allocate Seats
      </button>

      <div className="output">
        {typeof result === "string" && (
          <div className="error-card">
            <div className="error-icon">⚠️</div>
            <p className="error">{result}</p>
          </div>
        )}

        {Array.isArray(result) && (
          <>
            <div className="success-header">
              <h3>✅ Allocation Successful!</h3>
              <div className="allocation-summary">
                <span>Total Rooms: {result.length}</span>
                <span>Total Capacity: {result.reduce((sum, r) => sum + r.capacity, 0)} seats</span>
              </div>
            </div>
            <div className="allocated-list">
              <h4>📋 Allocated Classrooms:</h4>
              <ul>
                {result.map((room, i) => (
                  <li key={i} className="allocated-item">
                    <div className="room-badge">Room {room.roomId}</div>
                    <div className="room-details">
                      <span>🏢 Floor {room.floorNo}</span>
                      <span>👥 {room.capacity} seats</span>
                      {room.nearWashroom && <span className="washroom-badge">🚿</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AllocateExam;