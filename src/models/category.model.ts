import { model, Schema, HydratedDocument, SchemaDefinition } from 'mongoose'

interface ICategory {
  name: string,
  description: string,
}

const definition: SchemaDefinition = {
  name: {
    type: String,
    required: true
  },
  description: String
}

const categorySchema = new Schema<ICategory>(definition, { timestamps: true })

categorySchema.set('toJSON', {
  transform: (doc, ret: HydratedDocument<ICategory>) => {
    ret.id = ret._id
    // @ts-ignore: Unreachable code error
    delete ret._id
    delete ret.__v
  }
})

export default model<ICategory>('category', categorySchema)
