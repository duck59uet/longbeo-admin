'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

const StoreToken = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      localStorage.setItem('token', session.accessToken);
    }
  }, [session]);

  return null;
};

export default StoreToken;