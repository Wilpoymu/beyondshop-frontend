import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="flex justify-center items-center h-screen bg-zinc-800 rounded-lg">
      <div className="p-8 rounded-lg shadow-lg text-center bg-zinc-700">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.username}</h1>
        <p className="text-gray-600 mb-2">Email: {user.email}</p>
        <p className="text-gray-600 mb-4">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit Profile</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;