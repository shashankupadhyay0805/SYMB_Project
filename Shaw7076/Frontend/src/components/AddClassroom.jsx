// import { useState } from "react";

// function AddClassroom({ classrooms, setClassrooms }) {
//   const [roomId, setRoomId] = useState("");
//   const [capacity, setCapacity] = useState("");
//   const [floorNo, setFloorNo] = useState("");
//   const [nearWashroom, setNearWashroom] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!roomId || !capacity || !floorNo) {
//       alert("Please fill all fields");
//       return;
//     }

//     const newRoom = {
//       roomId,
//       capacity: Number(capacity),
//       floorNo: Number(floorNo),
//       nearWashroom,
//     };

//     setClassrooms([...classrooms, newRoom]);

//     setRoomId("");
//     setCapacity("");
//     setFloorNo("");
//     setNearWashroom(false);
//   };

//   return (
//     <div className="card">
//       <h2>Add Classroom</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           placeholder="Room ID"
//           value={roomId}
//           onChange={(e) => setRoomId(e.target.value)}
//         />

//         <input
//           type="number"
//           placeholder="Capacity"
//           value={capacity}
//           onChange={(e) => setCapacity(e.target.value)}
//         />

//         <input
//           type="number"
//           placeholder="Floor No"
//           value={floorNo}
//           onChange={(e) => setFloorNo(e.target.value)}
//         />

//         <label>
//           <input
//             type="checkbox"
//             checked={nearWashroom}
//             onChange={() => setNearWashroom(!nearWashroom)}
//           />
//           Near Washroom
//         </label>

//         <button type="submit">Add Classroom</button>

//       </form>
//     </div>
//   );
// }

// export default AddClassroom;




import { useState } from "react";

function AddClassroom({ classrooms, setClassrooms }) {
  const [roomId, setRoomId] = useState("");
  const [capacity, setCapacity] = useState("");
  const [floorNo, setFloorNo] = useState("");
  const [nearWashroom, setNearWashroom] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roomId || !capacity || !floorNo) {
      alert("Please fill all fields");
      return;
    }

    const newRoom = {
      roomId,
      capacity: Number(capacity),
      floorNo: Number(floorNo),
      nearWashroom,
    };

    try {
      // Send the data to our Backend API
      const response = await fetch("https://symb-project-uet7.onrender.com/api/classrooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRoom),
      });

      if (response.ok) {
        const savedRoom = await response.json();
        // Update the UI with the room returned from the database
        setClassrooms([...classrooms, savedRoom]);

        // Clear the form
        setRoomId("");
        setCapacity("");
        setFloorNo("");
        setNearWashroom(false);
      } else {
        alert("Failed to save classroom to database");
      }
    } catch (error) {
      console.error("Error saving classroom:", error);
      alert("Error connecting to the server!");
    }
  };

  return (
    <div className="card">
      <h2>➕ Add Classroom</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="roomId" className="form-label">
            🏫 Room ID
          </label>
          <input
            id="roomId"
            placeholder="e.g., 101, A201, Lab-1"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="capacity" className="form-label">
            👥 Capacity
          </label>
          <input
            id="capacity"
            type="number"
            placeholder="e.g., 50"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            min="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="floorNo" className="form-label">
            🏢 Floor Number
          </label>
          <input
            id="floorNo"
            type="number"
            placeholder="e.g., 1, 2, 3"
            value={floorNo}
            onChange={(e) => setFloorNo(e.target.value)}
            min="0"
          />
        </div>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={nearWashroom}
            onChange={() => setNearWashroom(!nearWashroom)}
          />
          <span>🚿 Near Washroom</span>
        </label>

        <button type="submit" className="submit-btn">
          ➕ Add Classroom
        </button>
      </form>
    </div>
  );
}

export default AddClassroom;