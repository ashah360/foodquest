import { NextPage } from 'next';
import useSWR from "swr";
import {fetcher} from "../../resources/client";

export interface UserOrderCount {
  id: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  orders: number
}



function UserOrderCountTable() {
    const { data, error } = useSWR<UserOrderCount[]>(
       `/userOrderCounts`,
      fetcher
    );

    return (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Orders Per User</h1>
              <p className="mt-2 text-sm text-gray-700">
                The number of orders across all foodquest restaurants ordered per user
              </p>
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
                        User ID
                      </th>
                      <th
                          scope="col"
                          className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th>
                      <th
                          scope="col"
                          className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        First Name
                      </th>
                      <th
                          scope="col"
                          className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Last Name
                      </th>
                      <th
                          scope="col"
                          className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Phone Number
                      </th>
                      <th
                          scope="col"
                          className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Orders
                      </th>

                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {data?.map((d) => (
                        <tr key={d.id}>
                          <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                            {d.id}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                            {d.email}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{d.firstName}</td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{d.lastName}</td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{d.phoneNumber}</td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{d.orders}</td>

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


const Admin: NextPage = () => {
  return <div className={'py-8'}><UserOrderCountTable /></div>;
};

export default Admin;
