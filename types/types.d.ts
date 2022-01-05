export interface IUsers {
  users: {
    status: string
    data: {
      rank: string
      user_id: string
      cash: number
      bank: number
      total: number
    }
  }
}

export interface IUser {
  status: string
  data: {
    rank: string
    user_id: string
    cash: number
    bank: number
    total: number
  }
}
