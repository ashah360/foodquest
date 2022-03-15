import axios from 'axios';
export { store } from './store';

interface ApiError {
  code: number;
  msg: string;
}
