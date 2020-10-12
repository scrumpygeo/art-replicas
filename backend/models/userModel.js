import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

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

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// middleware: b4 (pre) save, encrypt the pwd
userSchema.pre('save', async function (next) {
  // only hash the pwd if it's been modified. Otherwise u wont be able to log in
  // & don't run it if we update our name or email but not pwd.
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

//  create model from the schema called user
const User = mongoose.model('User', userSchema)

export default User
