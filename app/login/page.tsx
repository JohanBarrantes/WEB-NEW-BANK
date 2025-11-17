'use client';

import { useLoginForm } from '../../hooks/useLogin';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const {
    username,
    password,
    loading,
    error,
    userNotFound,
    setUsername,
    setPassword,
    handleSubmit,
  } = useLoginForm();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">

        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Hola !
        </h1>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        {userNotFound && (
          <div className="text-center mb-4">
            <p className="text-red-400 mb-2">Usuario no encontrado</p>
            <button
              className="text-blue-400 underline hover:text-blue-300"
              onClick={() => router.push('/register')}
            >
              Crear una cuenta
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <input
            type="text"
            placeholder="Email"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="
              w-full px-4 py-2 rounded-lg border 
              bg-gray-700 text-white 
              placeholder-gray-400 
              border-gray-600 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
              transition
            "
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="
              w-full px-4 py-2 rounded-lg border 
              bg-gray-700 text-white 
              placeholder-gray-400 
              border-gray-600 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
              transition
            "
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full bg-blue-600 text-white py-2 rounded-lg font-semibold
              hover:bg-blue-700 transition
              disabled:bg-blue-900 disabled:cursor-not-allowed
            "
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>

        {/* Register CTA */}
        <p className="text-center text-gray-300 mt-4">
          No tienes una cuenta?{' '}
          <span
            className="text-blue-400 hover:underline cursor-pointer"
            onClick={() => router.push('/register')}
          >
            Crear cuenta
          </span>
        </p>

      </div>
    </div>
  );
}
