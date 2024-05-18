export interface Restaurant {
  id: string;
  name: string;
  averageRating: number;
  is_Kosher: boolean;
  cuisines: string[];
}

export interface Rating {
  id: number;
  restaurantId: number;
  rating: number;
}

export interface OrderItem {
  dishId: number;
  amount: number;
}

export interface Order {
  restaurantId: number;
  orderItems: OrderItem[];
}

export interface Dish {
  id?: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
}