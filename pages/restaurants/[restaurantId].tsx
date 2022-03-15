import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useSWR from 'swr';
import { fetcher } from '../../resources/client';
import { StarIcon } from '@heroicons/react/solid';

import { pluralize } from '../../util';
import { useMenuData } from '../../hooks/useMenuData';
import MenuSection from '../../components/restaurants/MenuSection';
import { route } from 'next/dist/server/router';
import useBestSellingItems from '../../hooks/useBestSellingItems';

export interface Restaurant {
  id: string;
  ownerId: string;
  restaurantName: string;
  category: string;
  openTime: string;
  closeTime: string;
  addressLine1: string;
  addressLine2: string | null;
  addressLine3: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  imageUrl: string;
  stars: number;
  numRatings: number;
}

function BestSellingTable() {
  const router = useRouter();

  const { restaurantId } = router.query;

  const { items } = useBestSellingItems(
    typeof restaurantId === 'string' ? restaurantId : undefined
  );

  return (
    <div className='mt-8'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-xl font-semibold text-gray-900'>
            Top Selling Meals
          </h1>
          <p className='mt-2 text-sm text-gray-700'>
            These are the top selling meals from this restaurant this week.
          </p>
        </div>
      </div>
      <div className='-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg'>
        <table className='min-w-full divide-y divide-gray-300'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                scope='col'
                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
              >
                ID
              </th>
              <th
                scope='col'
                className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell'
              >
                Name
              </th>
              <th
                scope='col'
                className='hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell'
              >
                Quantity
              </th>
              <th
                scope='col'
                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
              >
                Total $
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 bg-white'>
            {items?.map((item) => (
              <tr key={item.id}>
                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                  {item.id}
                </td>
                <td className='hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell'>
                  {item.itemName}
                </td>
                <td className='hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell'>
                  {item.quantity}
                </td>
                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                  ${(item.totalCost / 100).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const Restaurant: NextPage = () => {
  const router = useRouter();

  const { restaurantId } = router.query;

  const { data, error } = useSWR<Restaurant>(
    restaurantId ? `/restaurants/${restaurantId}` : null,
    fetcher
  );

  const menuReq = useMenuData(
    typeof restaurantId === 'string' ? restaurantId : ''
  );

  const { menuData } = menuReq;

  if (!data && error) {
    return <div>Restaurant not found</div>;
  }
  return (
    <div>
      {data && (
        <div>
          <img
            className='object-cover h-40 w-full'
            src={data.imageUrl}
            alt='store-image'
          />
          <div className='px-10 py-6 '>
            <h1 className='text-4xl font-bold text-gray-800 mb-1'>
              {data.restaurantName}
            </h1>
            <div className='text-sm font-medium text-gray-700 flex gap-1'>
              <div className='flex items-center'>
                <StarIcon className='h-4 w-4 inline-block mr-1' />

                {data.stars ?? 'No Ratings'}
                {data.numRatings &&
                  ` (${data.numRatings} ${pluralize(
                    'rating',
                    'ratings',
                    data.numRatings
                  )})`}
              </div>
              <div>•</div>
              <div>{data.category}</div>
              <div>•</div>
              <div>$$</div>
              <div>•</div>
              <div className='underline cursor-pointer'>More info</div>
            </div>
            <div className='text-sm text-gray-500 flex gap-1'>
              <div>Open until 8:00</div>
              <div>•</div>
              <div>
                {data.addressLine1}
                {data.addressLine2 && ` ${data.addressLine2}`}
                {data.addressLine3 && data.addressLine3}, {data.city}{' '}
                {data.state} {data.postalCode}
              </div>
            </div>
            {typeof restaurantId == 'string' && (
              <MenuSection restaurantId={restaurantId} />
            )}
            <BestSellingTable />
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurant;
