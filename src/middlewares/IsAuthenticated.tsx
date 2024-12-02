import Cookies from 'js-cookie';

export const isAuthenticated = () => {
  const token = Cookies.get('us_b2b_admin');
//   console.log('Token from cookies:', token);
//   console.log(document.cookie);

  return !!token; // Returns true if the token exists, otherwise false
};

