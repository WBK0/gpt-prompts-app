import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  firstname: {
    type: String,
    required: [true, 'Firstname is required!'],
    match: [/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, "Firstname invalid"]
  },
  lastname: {
    type: String,
    required: [true, 'Lastname is required!'],
    match: [/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, "Lastname invalid"]
  },
  password: {
    type: String
  },
  image: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
});

const User = models.User || model("User", UserSchema);

export default User;