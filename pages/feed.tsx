import { NextPage } from 'next';
import { Fragment, useState } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/solid';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import Dialog from '../components/dialog/Dialog';
import useRestaurants, {Restaurant} from '../hooks/useRestaurants';
import Link from 'next/link';
import useSWR from "swr";
import {fetcher} from "../resources/client";
import {UserOrderCount} from "./admin";
import {MenuItem} from "../hooks/useMenuData";

function RecentlyPurchasedTable() {
    const { data, error } = useSWR<MenuItem[]>(
        `/items/recentlyPurchased`,
        fetcher
    );

    return (
        <div className="py-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Recently Purchased Near You</h1>
                </div>

            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                        Item
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Description
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Price
                                    </th>

                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {data?.map((d) => (
                                    <tr key={d.id}>
                                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                                            {d.title}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                                            {d.itemDescription}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">${(d.price / 100).toFixed(2)}</td>

                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export function RestaurantCard({ restaurant: r }: { restaurant: Restaurant}) {
 return (
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
 )
}


const Feed: NextPage = () => {
  const [open, setOpen] = useState(false);

  const { restaurants } = useRestaurants();

  const { data: featuredIds } = useSWR<string[]>('/restaurants/featured', fetcher)

  return (
    <>
      <div>
        <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>

            {featuredIds && restaurants && featuredIds.length > 0 && (
                <>
                <h1 className='text-3xl text-gray-900 font-semibold mb-4'>Featured Near You</h1>
                <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8 mb-8'>
                    {restaurants.filter(r => featuredIds.includes(r.id)).map(r => <RestaurantCard key={r.id} restaurant={r} />)}
                </div>
                </>
            )}

            <h1 className='text-3xl text-gray-900 font-semibold mb-4'>Restaurants</h1>
          <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8 mb-8'>
              {restaurants?.map((r) => <RestaurantCard key={r.id} restaurant={r}/>)
              }
          </div>

            <RecentlyPurchasedTable />
        </div>
      </div>

    </>
  );
};

export default Feed;
