import { model, Schema, Document } from 'mongoose'

interface ICategory {
  name: string,
  description: string,
}

const categoryFields = {
  name: {
    type: String,
    required: true
  },
  description: String
}

const categorySchema = new Schema<ICategory>(categoryFields, { timestamps: true })

categorySchema.set('toJSON', {
  transform: (doc, ret: Document<ICategory>) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

export default model<ICategory>('category', categorySchema)
