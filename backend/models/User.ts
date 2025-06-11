import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from '../interfaces';

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['client', 'veterinarian', 'admin'],
    required: true
  }
}, {
  timestamps: true
});
export default mongoose.model<IUser>('User', userSchema);
