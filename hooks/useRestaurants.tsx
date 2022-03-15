import useSWR from 'swr';
import { fetcher } from '../resources/client';

export interface Restaurant {
  id: string;
  ownerId: string;
  restaurantName: string;
  category: string;
  openTime: string;
  closeTime: string;
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  imageUrl: string;
}

export default function useRestaurants() {
  const { data, error } = useSWR<Restaurant[]>(`/restaurants`, fetcher);

  return {
    restaurants: data,
    isLoading: !error && !data,
    isError: error,
  };
}
