import { useState, useEffect, useMemo } from 'react';
import { getUsers } from '../../api/users';
import UserCard from '../molecules/UserCard';
import { Link } from 'react-router-dom';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getUsers(0, 30);
        setUsers(data);
      } catch (error: unknown) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  //users 온라인 : 오프라인 정렬
  const sortedUsers = useMemo(() => {
    return [...users].sort(
      (a, b) => (b.isOnline ? 1 : 0) - (a.isOnline ? 1 : 0),
    );
  }, [users]);

  if (loading) {
    return <p className="py-8 text-center">로딩 중...</p>;
  }
  if (error) {
    return <p className="py-8 text-center text-red-500">{error}</p>;
  }
  if (!users.length) {
    return <p className="py-8 text-center">등록된 유저가 없습니다.</p>;
  }
  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {sortedUsers.map((user) => (
        <Link key={user._id} to={`/users/${user._id}`} className="block">
          <UserCard
            UName={user.fullName}
            followCount={user.following.length}
            followerCount={user.followers.length}
            // tags={user.tag}
            imgUrl={user.image}
            loginStatus={user.isOnline ? 'online' : 'offline'}
          />
        </Link>
      ))}
    </div>
  );
}
