// app/dashboard/product/[productId]/page.tsx
import { getNewsById } from '@/services/news';
import ProductForm from './product-form';

export default async function ProductViewPage({
  params
}: {
  params: { productId: string };
}) {
  const { productId } = params;
  let product = null;
  let pageTitle = 'Tạo mới tin tức';

  if (productId !== 'new') {
    pageTitle = 'Thay đổi';
  }

  return (
    <div>
      {/* Truyền data đã fetch sẵn vào client component (nếu cần) */}
      <ProductForm  productId={Number(productId)}/>
    </div>
  );
}
