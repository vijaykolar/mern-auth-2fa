import mongoose from 'mongoose';
import { config } from '../config/app-config';

export async function connectDB() {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('Database connected');
  } catch (error) {
    console.log(error);
  }
}
