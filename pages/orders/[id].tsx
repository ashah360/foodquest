import { Fragment } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import {
  DotsVerticalIcon,
  SearchIcon,
  ShoppingBagIcon,
} from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { NextPage } from 'next';
import { classNames } from '../../util';
import useMyOrders from '../../hooks/useMyOrders';

export interface Root {
  id: string;
  userId: string;
  restaurantId: string;
  createdAt: string;
  total: number;
  confirmed: boolean;
  status: string;
  estimatedMins: any;
  restaurantName: string;
}

const Orders: NextPage = () => {
  const { orders } = useMyOrders();

  return (
    <main className='py-24'>
      <div className='max-w-7xl mx-auto sm:px-2 lg:px-8'>
        <div className='max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0'>
          <h1 className='text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl'>
            Order history
          </h1>
          <p className='mt-2 text-sm text-gray-500'>
            Check the status of recent orders, manage returns, and discover
            similar products.
          </p>
        </div>
      </div>

      <section aria-labelledby='recent-heading' className='mt-16'>
        <h2 id='recent-heading' className='sr-only'>
          Recent orders
        </h2>
        <div className='max-w-7xl mx-auto sm:px-2 lg:px-8'>
          <div className='max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0'>
            {orders?.map((order) => (
              <div
                key={order.id}
                className='bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border'
              >
                <h3 className='sr-only'>
                  Order placed on{' '}
                  <time dateTime={order.createdAt}>{order.createdAt}</time>
                </h3>

                <div className='flex items-center p-4 border-b border-gray-200 sm:p-6 sm:grid sm:grid-cols-4 sm:gap-x-6'>
                  <dl className='flex-1 grid grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2'>
                    <div>
                      <dt className='font-medium text-gray-900'>
                        Order number
                      </dt>
                      <dd className='mt-1 text-gray-500'>
                        {order.id.substring(0, 8).toUpperCase()}
                      </dd>
                    </div>
                    <div className='hidden sm:block'>
                      <dt className='font-medium text-gray-900'>Date placed</dt>
                      <dd className='mt-1 text-gray-500'>
                        <time dateTime={order.createdAt}>
                          {order.createdAt}
                        </time>
                      </dd>
                    </div>
                    <div>
                      <dt className='font-medium text-gray-900'>
                        Total amount
                      </dt>
                      <dd className='mt-1 font-medium text-gray-900'>
                        ${order.total}
                      </dd>
                    </div>
                  </dl>

                  <Menu
                    as='div'
                    className='relative flex justify-end lg:hidden'
                  >
                    <div className='flex items-center'>
                      <Menu.Button className='-m-2 p-2 flex items-center text-gray-400 hover:text-gray-500'>
                        <span className='sr-only'>
                          Options for order {order.id}
                        </span>
                        <DotsVerticalIcon
                          className='w-6 h-6'
                          aria-hidden='true'
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='origin-bottom-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <div className='py-1'>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href={'/'}
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                View
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href={'/'}
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900'
                                    : 'text-gray-700',
                                  'block px-4 py-2 text-sm'
                                )}
                              >
                                Invoice
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <div className='hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4'>
                    <a
                      href={'/'}
                      className='flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                      <span>View Order</span>
                      <span className='sr-only'>{order.id}</span>
                    </a>
                    <a
                      href={'/'}
                      className='flex items-center justify-center bg-white py-2 px-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                      <span>View Invoice</span>
                      <span className='sr-only'>for order {order.id}</span>
                    </a>
                  </div>
                </div>

                {/* Products */}
                <h4 className='sr-only'>Items</h4>
                <ul role='list' className='divide-y divide-gray-200'>
                  {order.lineItems.map((item) => (
                    <li key={item.title} className='p-4 sm:p-6'>
                      <div className='flex items-center sm:items-start'>
                        <div className='flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden sm:w-40 sm:h-40'>
                          <img
                            src={item.imageUrl || ''}
                            className='w-full h-full object-center object-cover'
                          />
                        </div>
                        <div className='flex-1 ml-6 text-sm'>
                          <div className='font-medium text-gray-900 sm:flex sm:justify-between'>
                            <h5>{item.title}</h5>
                            <p className='mt-2 sm:mt-0'>
                              ${(item.price / 100).toFixed(2)}
                            </p>
                          </div>
                          <p className='hidden text-gray-500 sm:block sm:mt-2'>
                            {item.itemDescription}
                          </p>
                        </div>
                      </div>

                      <div className='mt-6 sm:flex sm:justify-between'>
                        <div className='flex items-center'>
                          <CheckCircleIcon
                            className='w-5 h-5 text-green-500'
                            aria-hidden='true'
                          />
                          <p className='ml-2 text-sm font-medium text-gray-500'>
                            {order.status}
                          </p>
                        </div>

                        <div className='mt-6 border-t border-gray-200 pt-4 flex items-center space-x-4 divide-x divide-gray-200 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0'>
                          <div className='flex-1 flex justify-center'>
                            <a
                              href={'/'}
                              className='text-indigo-600 whitespace-nowrap hover:text-indigo-500'
                            >
                              View product
                            </a>
                          </div>
                          <div className='flex-1 pl-4 flex justify-center'>
                            <a
                              href='#'
                              className='text-indigo-600 whitespace-nowrap hover:text-indigo-500'
                            >
                              Buy again
                            </a>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Orders;
