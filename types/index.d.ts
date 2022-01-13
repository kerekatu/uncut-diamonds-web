import { errors, values } from 'faunadb'

export type Meta = {
  title: string
  subtitle: string
  description: string
  url: string
  type: string
  image: string
}

export interface ApiResponse<T> {
  status?: string
  error?: string | errors.FaunaError
  data: T
}

export interface FaunaResponse<T> extends ApiResponse<T> {
  data: values.Document<T> | values.Document<T>[]
}

export interface UserResponseError {
  status: string
  url: string
}

export interface UserDiscord {
  id: string
  username: string
  avatar: string
  discriminator: string
  email: string
  [key: string]: unknown
}

export interface UserBalance {
  rank: string
  user_id: string
  cash: number
  bank: number
  total: number
}

export interface User extends UserBalance {
  name: string
  image: string
  id?: string
}

export interface ShopItem {
  title: string
  description: string
  price: number
  stock: string
  duration?: number
  image?: string
  author?: {
    id: string
    name: string
    image: string
  }
}

export interface Purchase {
  item: ShopItem
  userId: string
}
