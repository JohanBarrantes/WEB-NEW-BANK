'use client';

import { useState } from 'react';
import { registerUserMock } from '../../service/mockAuthService';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await registerUserMock({ name, phone, email, password });
      setSuccess(true);
      setTimeout(() => router.push('/login'), 1000);
    } catch (err: any) {
      setError(err.message || 'Registro fallido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">

        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Crea tu cuenta
        </h1>

        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

        {success && (
          <p className="text-green-400 mb-4 text-center">
            Cuenta creada ! redirigiendo ....
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">

          {/* Full Name */}
          <input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
            className="
              w-full px-4 py-2 rounded-lg border 
              bg-gray-700 text-white 
              placeholder-gray-400 
              border-gray-600 
              focus:ring-2 focus:ring-green-500 focus:border-green-500 
              transition
            "
          />

          {/* Phone */}
          <input
            type="tel"
            placeholder="Número de telefono"
            value={phone}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            required
            className="
              w-full px-4 py-2 rounded-lg border 
              bg-gray-700 text-white 
              placeholder-gray-400 
              border-gray-600 
              focus:ring-2 focus:ring-green-500 focus:border-green-500 
              transition
            "
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Correo electrónico "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              w-full px-4 py-2 rounded-lg border 
              bg-gray-700 text-white 
              placeholder-gray-400 
              border-gray-600 
              focus:ring-2 focus:ring-green-500 focus:border-green-500 
              transition
            "
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              w-full px-4 py-2 rounded-lg border 
              bg-gray-700 text-white 
              placeholder-gray-400 
              border-gray-600 
              focus:ring-2 focus:ring-green-500 focus:border-green-500 
              transition
            "
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-2 rounded-lg 
              bg-green-600 text-white font-semibold
              hover:bg-green-700
              disabled:bg-green-900 disabled:cursor-not-allowed
              transition
            "
          >
            {loading ? "Procesando..." : "Registrate"}
          </button>
        </form>

        {/* Back to login */}
        <p className="text-center text-gray-300 mt-4">
          Ya tienes una cuenta?{" "}
          <span
            className="text-green-400 hover:underline cursor-pointer"
            onClick={() => router.push('/login')}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}
