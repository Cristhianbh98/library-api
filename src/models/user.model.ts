import { model, Schema } from 'mongoose'
import { hashSync, genSaltSync } from 'bcryptjs'
import md5 from 'md5'

interface IUser {
  username: string
  email: string
  firstName: string
  lastName: string
  password: string
  role: string
}

const userFields = {
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (username: string) => /^[A-Za-z0-9]+$/.test(username),
      message: (props: any) => `${props.value} is not a valid username!`
    }
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
}

const userSchema = new Schema<IUser>(userFields, { timestamps: true })

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const hash = md5(returnedObject.email)
    returnedObject.image = 'https://www.gravatar.com/avatar/' + hash
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

userSchema.pre('findOneAndUpdate', function (next) {
  // @ts-ignore: Unreachable code error
  const { password } = this._update

  if (password === undefined) {
    // @ts-ignore: Unreachable code error
    delete this._update.password
  } else {
    if (!/^.{12,50}$/.test(password)) {
      const msg = 'Not valid password sent, the password must be between 12 and 50 got {' + password + '}'
      throw new Error(msg)
    }
    const salt = genSaltSync(10)
    const passwordHashed = hashSync(password, salt)
    // @ts-ignore: Unreachable code error
    this._update.password = passwordHashed
  }
  next()
})

export default model('user', userSchema)
