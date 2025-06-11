// backend/models/Appointment.ts
import mongoose, { Schema } from 'mongoose';

const appointmentSchema = new Schema({
  petName: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  ownerName: { type: String, required: true },
  reason: { type: String, required: true },
  veterinarian: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

export default mongoose.model('Appointment', appointmentSchema);
