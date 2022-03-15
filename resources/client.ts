import axios from 'axios';
import { API_HOST } from '../util/constants';

const client = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : API_HOST,
});

export function fetcher<T>(url: string) {
  return client
    .get<T>(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('_fqt') || ''}`,
      },
    })
    .then((res) => res.data);
}
export default client;
