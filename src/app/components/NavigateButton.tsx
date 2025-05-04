// components/NavigateButton.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function NavigateButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/nuevoproducto')}
      className="px-4 py-2 bg-white-500 text-black rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      Añadir producto
    </button>
  );
}
