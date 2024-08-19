// models/User.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  photoIdFront: { data: Buffer; contentType: string };
  photoIdBack: { data: Buffer; contentType: string };
  status: 'waiting' | 'active';
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photoIdFront: {
    data: Buffer,
    contentType: String,
  },
  photoIdBack: {
    data: Buffer,
    contentType: String,
  },
  status: { type: String, enum: ['waiting', 'active'], default: 'waiting' },
  isAdmin: { type: Boolean, default: false }, // Add this field if not already present

});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
