/* eslint-disable @next/next/no-img-element */
// @ts-nocheck

import { useEffect, useState } from 'react';

import { IUser } from '../../models/user';
import { Layout } from 'layouts/Layout';
import { useRouter } from 'next/router';

interface WaitingListProps {
  initialUsers: IUser[];
}

const WaitingList = ({ initialUsers }: WaitingListProps) => {
  const [users, setUsers] = useState<IUser[]>(initialUsers);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch data on mount
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://step-forward-app.vercel.app/api/waiting-list`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Include token if needed
          }
        });

        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else if (res.status === 401 || res.status === 403) {
          // Handle unauthorized access
          router.push('/'); // Redirect to home page if unauthorized
        } else {
          const result = await res.json();
          setError(result.error || 'Failed to fetch users');
        }
      } catch (err) {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleStatusChange = async (userId: string) => {
    setLoadingUserId(userId);

    try {
      const res = await fetch('/api/update-status', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` // Include token if needed
        },
        body: JSON.stringify({ userId })
      });

      const result = await res.json();

      if (res.ok) {
        alert(result.message);
        // Refresh users list
        const updatedUsers = users.map(user =>
          user._id === userId ? { ...user, status: 'active' } : user
        );
        // @ts-ignore
        setUsers(updatedUsers);
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert('An error occurred while updating status');
    } finally {
      setLoadingUserId(null);
    }
  };

  const getImageUrl = (userId: string, photoType: 'front' | 'back') => {
    return `/api/image/${userId}?photoId=${photoType}`;
  };

  return (
    <Layout title={'الانتظار '} description={' الانتظار '} ogUrl={`/waitingList`}>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Waiting List Users
        </h1>
        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-lg text-red-600">{error}</p>
        ) : users.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            No users in the waiting list.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map(user => (
              <div
                key={user._id}
                className="bg-white border border-gray-200 rounded-lg shadow-md p-4"
              >
                <h2 className="text-md font-semibold mb-2">{user.email}</h2>
                <p className="text-gray-600 mb-2">Status: {user.status}</p>
                <div className="mb-2">
                  <p className="font-semibold">Photo ID Front:</p>
                  <img
                    src={getImageUrl(user._id, 'front')}
                    alt="Photo ID Front"
                    className="rounded-lg max-w-full h-auto"
                  />
                </div>
                <div className="mb-2">
                  <p className="font-semibold">Photo ID Back:</p>
                  <img
                    src={getImageUrl(user._id, 'back')}
                    alt="Photo ID Back"
                    className="rounded-lg max-w-full h-auto"
                  />
                </div>
                <div className="text-center">
                  {user.status === 'waiting' ? (
                    <button
                      onClick={() => handleStatusChange(user._id)}
                      className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ${
                        loadingUserId === user._id ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={loadingUserId === user._id}
                    >
                      {loadingUserId === user._id ? 'Updating...' : 'Activate'}
                    </button>
                  ) : (
                    <span className="text-gray-500">Already Active</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

// Pass initial users from server-side rendering or static generation if needed
export async function getServerSideProps() {
  return {
    props: {
      initialUsers: [] // Provide an initial empty array or fetch initial data if needed
    }
  };
}

export default WaitingList;
