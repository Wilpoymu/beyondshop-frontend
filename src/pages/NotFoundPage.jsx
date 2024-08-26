import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-xl font-bold">404 - Page Not Found</h1>
        <p className="text-white my-4">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
