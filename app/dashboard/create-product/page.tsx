'use client';

import { useState, FormEvent } from 'react';
import Input from '@/components/UI/Input';
import { useProductStore } from '@/store/productStore';
import { createProductMock } from '@/service/mockAuthService';
import { useRouter } from 'next/navigation';
import Button from '@/components/UI/Button';

export default function CreateProductPage() {
  const router = useRouter();
  const { createProduct } = useProductStore();

  const [type, setType] = useState('savings');
  const [amount, setAmount] = useState('');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const product = {
      type: type === 'savings' ? 'Cuenta de ahorros' : 'Tarjeta de crédito',
      amount: Number(amount),
      createdAt: new Date().toLocaleDateString(),
    };

    await createProductMock(product);
    createProduct(product);

    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex justify-center">
      <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">Crea tu producto</h1>

        <form className="space-y-4" onSubmit={submit}>
          <select
            className="
              w-full px-4 py-2 rounded-lg border 
              bg-gray-700 text-white border-gray-600
              focus:ring-2 focus:ring-blue-500
            "
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="savings">Cuenta de ahorros</option>
            <option value="credit">Tarjeta de crédito</option>
          </select>

          <Input
            placeholder="Valor inicial"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Button>Crear</Button>
        </form>
      </div>
    </div>
  );
}
