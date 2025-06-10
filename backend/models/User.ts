// backend/models/User.ts
import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from '../interfaces';

const userSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  }
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', userSchema);