type User = {
  rank: string
  user_id: string
  cash: number
  bank: number
  total: number
}

export interface IUsers {
  status: string
  data: User[]
}

export interface IUser {
  status: string
  data: User
}

export interface IShopItem {
  title: string
  description: string
  price: number
  stock: string
  image: string
}
