"use client";

import { useParams } from 'next/navigation';
import ViewCurrentStock from '../../components/ViewCurrentStock';
import UpdateStockComponent from '../../components/UpdateStock';

export default function ProductoPage() {
  const params = useParams();
  const itemId = Number(params?.id); 
  return <div>
        Producto ID: {params.id}
        <ViewCurrentStock itemId={itemId} />
        <UpdateStockComponent itemId={itemId} />

    </div>;
}
