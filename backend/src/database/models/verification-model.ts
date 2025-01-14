import { generateUniqueCode } from '../../common/utils/uuid';
import { VerificationEnum } from './../../common/enums/verification-code-enum';
import mongoose, { Schema } from 'mongoose';

export interface VerificationCodeDocument extends Document {
  userId: mongoose.Types.ObjectId;
  code: string;
  type: VerificationEnum;
  createdAt: Date;
  expiresAt: Date;
}

export const verificationCodeSchema = new Schema<VerificationCodeDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    default: generateUniqueCode,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

export const VerificationCodeModel = mongoose.model<VerificationCodeDocument>(
  'VerificationCode',
  verificationCodeSchema,
  'verification_codes',
);
