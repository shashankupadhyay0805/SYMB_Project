import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
// We use process.env.MONGO_URI which we will define in the .env file
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch(err => console.log('MongoDB Connection Error: ', err));

// Classroom Schema
const classroomSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  capacity: { type: Number, required: true },
  floorNo: { type: Number, required: true },
  nearWashroom: { type: Boolean, default: false }
});

const Classroom = mongoose.model('Classroom', classroomSchema);

// API Routes

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'College Exam Seat Planner API', status: 'running' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// 1. Get all classrooms
app.get('/api/classrooms', async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    res.json(classrooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Add a new classroom
app.post('/api/classrooms', async (req, res) => {
  try {
    const newClassroom = new Classroom(req.body);
    await newClassroom.save();
    res.status(201).json(newClassroom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/classrooms/:id', async (req, res) => {
  try {
    const deletedRoom = await Classroom.findByIdAndDelete(req.params.id);
    if (!deletedRoom) return res.status(404).json({ error: "Classroom not found" });
    res.json({ message: "Classroom deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend Server running on port ${PORT}`));