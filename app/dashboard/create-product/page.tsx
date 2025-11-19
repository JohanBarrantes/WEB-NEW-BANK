'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import { useRouter } from 'next/navigation';

import { useProductStore } from '@/store/productStore';
import { createProductMock } from '@/service/mockAuthService';
import { Product } from '@/types/Product';
import { getListProduct } from '@/service/authService';

const productLabels: Record<string, string> = {
  creditCard: 'Tarjeta de crédito',
  savingAccount: 'Cuenta de ahorros'
};

export default function CreateProductPage() {
  const router = useRouter();
  const { createProduct } = useProductStore();

  const [products, setProducts] = useState<any[]>([]);
  const [type, setType] = useState<string | null>(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await getListProduct();
        console.log(res);
        const items = res?.data?.listProduct ?? [];
        setProducts(items);

        // Set default selected value
        if (items.length > 0) {
          setType(items[0].productName);
        }
      } catch (e) {
        console.error('Error cargando productos', e);
      }
    }

    load();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!type) return; // todavía no cargaba

    const product: Product = {
      type,
      amount: Number(amount),
      createdAt: new Date().toLocaleDateString(),
      transactions: []
    };

    await createProductMock(product);
    createProduct(product);

    router.push('/dashboard');
  };

  if (!type) {
    return <div className="min-h-screen flex justify-center items-center text-white">Cargando productos...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex justify-center">
      <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Crea tu producto</h1>

        <form className="space-y-4" onSubmit={submit}>
          {/* SELECT DINÁMICO */}
          <select
            className="w-full px-4 py-2 rounded-lg border bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-blue-500"
            value={type}
            onChange={e => setType(e.target.value)}
          >
            {products.map(p => (
              <option key={p.productName} value={p.productName}>
                {productLabels[p.productName]}
              </option>
            ))}
          </select>
          <p className="text-gray-400 text-sm mt-2">
            {products.find(p => p.productName === type)?.description}
          </p>
          <Input placeholder="Valor inicial" type="number" value={amount} onChange={e => setAmount(e.target.value)} />

          <Button type="submit">Crear</Button>
        </form>
      </div>
    </div>
  );
}
