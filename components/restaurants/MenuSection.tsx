import { MenuItem, useMenuData } from '../../hooks/useMenuData';
import { Tab } from '@headlessui/react';

import { useState } from 'react';
import { classNames } from '../../util';

export function MenuItemCard({ menuItem }: { menuItem: MenuItem }) {
  return (
    <li key={menuItem.id} className='relative'>
      <div className='group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden'>
        <img
          src={
            menuItem.imageUrl ||
            'https://wtwp.com/wp-content/uploads/2015/06/placeholder-image.png'
          }
          alt=''
          className='object-cover pointer-events-none group-hover:opacity-75'
        />
        <button
          type='button'
          className='absolute inset-0 focus:outline-none'
        ></button>
      </div>
      <p className='mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none'>
        {menuItem.title}
      </p>
      <p className='block text-sm font-medium text-gray-500 pointer-events-none'>
        ${(menuItem.price / 100).toFixed(2)}
      </p>
    </li>
  );
}

function MenuSection({
  restaurantId,
  menuId,
}: {
  restaurantId: string;
  menuId: string;
}) {
  const { menuData, isLoading, isError } = useMenuData(restaurantId);

  return (
    <ul
      role='list'
      className='grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'
    >
      {menuData?.menus[menuId].menuItemIds.map((id) => (
        <MenuItemCard key={id} menuItem={menuData.menuItems[id]} />
      ))}
    </ul>
  );
}

export default function RestaurantFeed({
  restaurantId,
}: {
  restaurantId: string;
}) {
  const { menuData, isLoading, isError } = useMenuData(restaurantId);

  return (
    <div className='mt-2'>
      {menuData && (
        <Tab.Group>
          <div className='w-full max-w-xs px-2 py-4 sm:px-0'>
            <Tab.List className='flex p-1 space-x-1 bg-blue-900/20 rounded-xl mb-3'>
              {menuData.menuIds.map((id) => (
                <Tab
                  key={id}
                  className={({ selected }) =>
                    classNames(
                      'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                      'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                      selected
                        ? 'bg-white shadow'
                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  {menuData.menus[id].title}
                </Tab>
              ))}
            </Tab.List>
          </div>
          <Tab.Panels>
            {menuData.menuIds.map((id) => (
              <Tab.Panel key={id}>
                <MenuSection key={id} restaurantId={restaurantId} menuId={id} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      )}
    </div>
  );
}

/**
 * {menuData &&
                Object.values(menuData.menuItems).map((menuItem) => (
                  
                ))}
 */
