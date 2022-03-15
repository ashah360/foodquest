import useSWR from 'swr';
import { fetcher } from '../resources/client';

export interface BestSellingItem {
  id: string;
  itemName: string;
  quantity: string;
  totalCost: number;
}

export default function useBestSellingItems(restaurantId: string | undefined) {
  const { data, error } = useSWR<BestSellingItem[]>(
    restaurantId ? `/restaurants/${restaurantId}/bestSelling` : null,
    fetcher
  );

  return {
    items: data,
    isLoading: !error && !data,
    isError: error,
  };
}
