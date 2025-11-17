import { Suspense } from 'react';

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="text-white p-8">Cargando...</div>}>
      {children}
    </Suspense>
  );
}
