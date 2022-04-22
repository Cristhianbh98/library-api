import { model, Schema, Types, SchemaDefinition, HydratedDocument } from 'mongoose'

interface IBook {
  title: string,
  description: string,
  code: string,
  image: string,
  document: string,
  category: Types.ObjectId,
  user: Types.ObjectId
}

const definition: SchemaDefinition = {
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  image: String,
  document: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}

const bookSchema = new Schema<IBook>(definition, { timestamps: true })

bookSchema.set('toJSON', {
  transform: (doc, ret: HydratedDocument<IBook>) => {
    ret.id = ret._id
    // @ts-ignore: Unreachable code error
    delete ret._id
    delete ret.__v
  }
})

export default model<IBook>('book', bookSchema)
