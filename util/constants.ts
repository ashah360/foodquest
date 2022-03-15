export const API_HOST =
  process.env.NODE_ENV === 'development'
    ? 'localhost:3000'
    : 'https://api.foodquest.cc';

export const ApiRoutes = {
  Login: '/login',
  Register: '/register',
};
