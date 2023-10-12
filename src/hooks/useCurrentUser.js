import { useState } from 'react';
import Cookies from 'js-cookie';

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState({
    logged_in: Cookies.get('logged_in') === 'true' ? true : false
  });

  return { currentUser, setCurrentUser };
};
