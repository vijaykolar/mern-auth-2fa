import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { hashPassword } from '../../common/utils/bcrypt';

interface UserPreference {
  enabled2FA: boolean;
  emailNotification: boolean;
  twoFactorSecret?: string;
}

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  preferences: UserPreference;
  comparePassword: (password: string) => Promise<boolean>;
}

const userPreferencesSchema = new Schema<UserPreference>({
  enabled2FA: { type: Boolean, default: false },
  emailNotification: { type: Boolean, default: true },
  twoFactorSecret: { type: String, required: false },
});

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    preferences: { type: userPreferencesSchema, default: {} },
  },
  { timestamps: true, toJSON: {} },
);

userSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await hashPassword(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.preferences.twoFactorSecret;
    return ret;
  },
});

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
