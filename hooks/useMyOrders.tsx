import useSWR from 'swr';
import { fetcher } from '../resources/client';

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  createdAt: string;
  total: number;
  confirmed: boolean;
  status: string;
  estimatedMins: number | null;
  restaurantName: string;
  lineItems: LineItem[];
}

export interface LineItem {
  orderId: string;
  menuItemId: string;
  title: string;
  itemDescription: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export default function useMyOrders() {
  const { data, error } = useSWR<Order[]>(`/users/me/orders`, fetcher);

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
  };
}
