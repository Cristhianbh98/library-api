import { model, Schema, Types, SchemaDefinition, HydratedDocument } from 'mongoose'

export interface IFavorite {
  user: Types.ObjectId,
  books: Types.ObjectId[]
}

const definition: SchemaDefinition<IFavorite> = {
  user: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true
  },
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'book'
  }]
}

const favoriteSchema = new Schema<IFavorite>(definition, { timestamps: true })

favoriteSchema.set('toJSON', {
  transform: (doc, ret: HydratedDocument<IFavorite>) => {
    ret.id = ret._id
    // @ts-ignore: Unreachable code error
    delete ret._id
    delete ret.__v
  }
})

export default model<IFavorite>('favorite', favoriteSchema)
