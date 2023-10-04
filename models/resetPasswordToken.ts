import { Schema, model, models } from 'mongoose';

const ResetPasswordTokenSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required!'],
  },
  token: {
    type: String,
    required: [true, 'Token is required!'],
  },
  expiresAt: {
    type: Date,
    required: [true, 'Expires is required!'],
  }
});

const ResetPasswordToken = models.ResetPasswordToken || model("ResetPasswordToken", ResetPasswordTokenSchema);

export default ResetPasswordToken;