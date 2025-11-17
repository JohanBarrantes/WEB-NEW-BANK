// app/dashboard/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useProductStore } from '@/store/productStore';

export default function DashboardPage() {
  const router = useRouter();
  const { products } = useProductStore();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Your Products</h1>

      <button
        className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 mb-6"
        onClick={() => router.push('/dashboard/create-product')}
      >
        Create product
      </button>

      <div className="grid gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-700"
            onClick={() => router.push(`/dashboard/product`)}
          >
            <h2 className="text-xl font-semibold">{p.type}</h2>
            <p className="text-gray-300">Created: {p.createdAt}</p>
            <p className="text-gray-300">Amount: ${p.amount}</p>
          </div>
        ))}

        {products.length === 0 && (
          <p className="text-gray-400">Aun no tienes productos disponibles.</p>
        )}
      </div>
    </div>
  );
}
