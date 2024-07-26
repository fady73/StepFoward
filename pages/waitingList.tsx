import { useEffect, useState } from 'react';

import { IUser } from '../models/user';
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/waiting-list`, {
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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Waiting List Users
      </h1>
      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-600">{error}</p>
      ) : users.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No users in the waiting list.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Photo ID Front</th>
              <th className="py-3 px-4 border-b">Photo ID Back</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="py-3 px-4 border-b">{user.email}</td>
                <td className="py-3 px-4 border-b">{user.status}</td>
                <td className="py-3 px-4 border-b text-center">
                  <img
                    src={getImageUrl(user._id, 'front')}
                    alt="Photo ID Front"
                    className="rounded-lg max-w-xs mx-auto"
                  />
                </td>
                <td className="py-3 px-4 border-b text-center">
                  <img
                    src={getImageUrl(user._id, 'back')}
                    alt="Photo ID Back"
                    className="rounded-lg max-w-xs mx-auto"
                  />
                </td>
                <td className="py-3 px-4 border-b text-center">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
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
