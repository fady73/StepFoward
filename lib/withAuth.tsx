// lib/withAuth.tsx

import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

const withAuth = (WrappedComponent: React.ComponentType<any>, url: string) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
      const checkAuth = async () => {
        // This code runs only on the client side
        const token = localStorage.getItem('token');

        if (token) {
          router.push('/'); // Redirect to login if not authenticated
        } else {
          router.push(`/${url}`); // Redirect to login if no token
        }

        setLoading(false);
      };

      checkAuth();
    }, []);

    if (loading) {
      // Optionally render a loading spinner or placeholder
      return <p>Loading...</p>;
    }

    if (isAuthenticated === false) {
      return null; // Optionally handle unauthenticated state
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
