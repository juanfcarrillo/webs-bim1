// backend/interfaces/index.ts
export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: 'client' | 'veterinarian' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}


  export interface IAppointment {
  pet_id: string;
  client_id: string;
  veterinarian_id: string;
  appointment_datetime: Date;
  reason: string;
  status: string;
  created_at: Date;
}