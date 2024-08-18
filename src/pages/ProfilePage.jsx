import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
    </div>
  );
}

export default ProfilePage;
