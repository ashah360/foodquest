import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';

interface LoginForm {
  email: string;
  password: string;
}

const defaultValues: LoginForm = {
  email: '',
  password: '',
};

interface LoginResponse {
  token: string;
}

interface ErrorResponse {
  code: number;
  msg: string;
}

const Login: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginForm>({
    defaultValues,
  });

  const onSubmit: SubmitHandler<LoginForm> = async ({ email, password }) => {
    try {
      const { data } = await axios.post<LoginResponse>(
        'https://api.foodquest.cc/login',
        {
          email,
          password,
        }
      );

      localStorage.setItem('_fqt', data.token);
      router.push('/profile');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        const { msg } = err.response.data as ErrorResponse;
        alert(msg);
      }
    }
  };

  return (
    <div className='min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          foodquest
        </h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                {' '}
                Email address{' '}
              </label>
              <div className='mt-1'>
                <input
                  {...register('email')}
                  type='email'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                {' '}
                Password{' '}
              </label>
              <div className='mt-1'>
                <input
                  {...register('password')}
                  type='password'
                  autoComplete='current-password'
                  required
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800'
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
