export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  stock: number
  image_url: string | null
  created_at: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface Order {
  id: string
  user_id: string | null
  total_amount: number
  status: string
  paystack_reference: string | null
  shipping_address: any
  created_at: string
}
