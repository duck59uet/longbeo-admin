import { Product } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import ProductForm from './product-form';

type TProductViewPageProps = {
  productId: string;
};

export default async function ProductViewPage({
  productId
}: TProductViewPageProps) {
  let product = null;
  let pageTitle = 'Tạo mới tin tức';

  if (productId !== 'new') {
    // const data = await fakeProducts.getProductById(Number(productId));
    // product = data.product as Product;
    // if (!product) {
    //   notFound();
    // }
    // pageTitle = `Thay đổi`;
  }

  return <ProductForm initialData={product} pageTitle={pageTitle} />;
}
