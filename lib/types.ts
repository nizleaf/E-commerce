export interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image?: string
}

export interface User {
  id: number
  name: string
  email: string
  password: string
  isAdmin: boolean
}

export interface Order {
  id: number
  userId: number
  products: Product[]
  total: number
  status: string
  createdAt: string
}
