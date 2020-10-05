import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    // in mongoose we can pass in 2nd arg of options for created_at stuff:
    timestamps: true,
  }
)

//  create model from the schema called user
const User = mongoose.model('User', userSchema)

export default User
