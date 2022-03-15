import { NextPage } from 'next';
import { Fragment, useState } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/solid';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import Dialog from '../components/dialog/Dialog';
import useRestaurants from '../hooks/useRestaurants';
import Link from 'next/link';

const Feed: NextPage = () => {
  const [open, setOpen] = useState(false);

  const { restaurants } = useRestaurants();

  return (
    <>
      <div>
        <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
          <h2 className='sr-only'>Products</h2>

          <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8'>
            {restaurants?.map((r) => (
              <div
                key={r.id}
                className='group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden'
              >
                <div className='aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96'>
                  <img
                    src={r.imageUrl || ''}
                    className='w-full h-full object-center object-cover sm:w-full sm:h-full'
                  />
                </div>
                <div className='flex-1 p-4 space-y-2 flex flex-col'>
                  <h3 className='text-sm font-medium text-gray-900'>
                    <Link href={`/restaurants/${r.id}`}>
                      <a>
                        <span aria-hidden='true' className='absolute inset-0' />
                        {r.restaurantName}
                      </a>
                    </Link>
                  </h3>
                  <p className='text-sm text-gray-500'>{r.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Dialog open={open} setOpen={setOpen} />
    </>
  );
};

export default Feed;
