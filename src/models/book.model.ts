import { model, Schema, Types, SchemaDefinition, HydratedDocument } from 'mongoose'

interface IBookFile {
  url: string,
  name: string,
  mimetype: string,
  handle: string
}

interface IBook {
  title: string,
  description: string,
  code: string,
  image: IBookFile,
  document: IBookFile,
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
  image: {
    type: {
      url: String,
      name: String,
      mimetype: String,
      handle: String
    }
  },
  document: {
    type: {
      url: String,
      name: String,
      mimetype: String,
      handle: String
    }
  },
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
    ret.documentUrl = ret?.document.url
    // @ts-ignore: Unreachable code error
    ret.imageUrl = ret?.image.url
    // @ts-ignore: Unreachable code error
    delete ret._id
    // @ts-ignore: Unreachable code error
    delete ret.document
    // @ts-ignore: Unreachable code error
    delete ret.image
    delete ret.__v
  }
})

export default model<IBook>('book', bookSchema)
