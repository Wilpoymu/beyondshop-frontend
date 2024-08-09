import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: signinErrors } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    signin(data);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-xl font-bold">Login</h1>
        {signinErrors.map((error, i) => (
          <div key={i} className="bg-red-500 p-2 my-2 text-white rounded-md">
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <button type="submit">Login</button>
        </form>

        <p className="flex gap-x2 justify-between">
          {"Don't have an account?"}{' '}
          <Link to="/register" className="text-sky-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
