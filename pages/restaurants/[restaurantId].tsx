import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useSWR from 'swr';
import { fetcher } from '../../resources/client';
import { StarIcon } from '@heroicons/react/solid';

import { pluralize } from '../../util';
import { useMenuData } from '../../hooks/useMenuData';
import MenuSection from '../../components/restaurants/MenuSection';

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

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurant;
