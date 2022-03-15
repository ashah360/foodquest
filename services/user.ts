import axios from 'axios';
import client from '../resources/client';

export interface UserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdAt: Date;
  lastLogin: Date | null;
}

export function getUserData() {
  const token = localStorage.getItem('_fqt');

  return client.get<UserResponse>('/users/me', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('_fqt')}`,
    },
  });
}

const d = {
  restaurantId: '408a77aa-7d72-43a9-b049-68688ee3a5c1',
  menuIds: ['c05c5ac5-8ded-4421-8782-956ecb93f2c4'],
  menus: {
    'c05c5ac5-8ded-4421-8782-956ecb93f2c4': {
      id: 'c05c5ac5-8ded-4421-8782-956ecb93f2c4',
      title: 'Default Menu',
      sections: ['All Day Breakfast'],
      description: 'test',
      menuItemIds: ['866a3662-5fdb-4558-ba77-aab57ec88acd'],
    },
  },
  menuItems: {
    '866a3662-5fdb-4558-ba77-aab57ec88acd': {
      id: '866a3662-5fdb-4558-ba77-aab57ec88acd',
      menuId: 'c05c5ac5-8ded-4421-8782-956ecb93f2c4',
      section: 'All Day Breakfast',
      title: 'Breakfast Burrito',
      itemDescription:
        'Organic eggs, chorizo, tater tots, cheese, ranchero sauce mild chiles, and onions. Rolled in a large flour tortilla. Served with chips.',
      price: 1150,
      imageUrl:
        'https://d1ralsognjng37.cloudfront.net/b1cad35f-e0f4-47a1-bc45-abac5d8c46bb.jpeg',
    },
  },
};
