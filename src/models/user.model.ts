import { model, Schema } from 'mongoose'
const { hashSync, genSaltSync } = require('bcryptjs')

interface IUser {
  username: string
  email: string
  firstName: string
  lastName: string
  password: string
  role: string
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    reuired: true,
    unique: true,
    validate: {
      validator: (email: string) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email),
      message: (props: any) => `${props.value} is not a valid email!`
    }
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 12,
    maxLength: 50
  },
  role: {
    type: String
  }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

userSchema.pre('save', function (next) {
  const user = this
  const salt = genSaltSync(10)
  const passwordHashed = hashSync(user.password, salt)
  user.password = passwordHashed
  next()
})

const userModel = model('user', userSchema)
export default userModel
