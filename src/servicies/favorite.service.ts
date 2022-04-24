import favoriteRepository from '../repositories/favorite.repository'
import { IFavorite } from '../models/favorite.model'

async function show (id: string) {
  try {
    return await favoriteRepository.show(id)
  } catch (e: any) {
    return undefined
  }
}

async function store (favorite: IFavorite) {
  return await favoriteRepository.store(favorite)
}

async function update (id:string, favorite: IFavorite) {
  return await favoriteRepository.update(id, favorite)
}

async function list (id: string) {
  try {
    return await favoriteRepository.list(id)
  } catch (e: any) {
    return undefined
  }
}

export default {
  show,
  store,
  update,
  list
}
