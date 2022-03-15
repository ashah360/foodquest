import useSWR from 'swr';
import { fetcher } from '../resources/client';

export interface Menu {
  id: string;
  title: string;
  description: string;
  sections: string[];
  menuItemIds: string[];
}

export interface MenuItem {
  id: string;
  menuId: string;
  section: string;
  title: string;
  itemDescription: string;
  price: number;
  imageUrl: string;
}

export interface MenuData {
  restaurantId: string;
  menuIds: string[];
  menus: { [key: string]: Menu };
  menuItems: { [key: string]: MenuItem };
}

export function useMenuData(restaurantId: string | undefined) {
  const { data, error } = useSWR<MenuData>(
    restaurantId ? `/restaurants/${restaurantId}/menuData` : null,
    fetcher
  );

  return {
    menuData: data,
    isLoading: !error && !data,
    isError: error,
  };
}
