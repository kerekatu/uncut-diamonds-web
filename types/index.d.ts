export type Meta = {
  title: string
  subtitle: string
  description: string
  url: string
  type: string
  image: string
}

export type User = {
  rank: string
  user_id: string
  cash: number
  bank: number
  total: number
}

export interface IUsers {
  status: string
  data: User[] | User
}

export interface IShopItem {
  title: string
  description: string
  price: number
  stock: string
  image: string
}
