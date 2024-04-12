import { Schema, model, models } from 'mongoose';

const ActivationTokenSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required!'],
  },
  token: {
    type: String,
    required: [true, 'Token is required!'],
  }
});

const ActivationToken = models.ActivationToken || model("ActivationToken", ActivationTokenSchema);

export default ActivationToken;