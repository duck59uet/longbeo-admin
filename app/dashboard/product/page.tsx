import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import ProductListingPage from './product-listing';

export const metadata = {
  title: 'Quản lý tin tức'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page() {

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Tin bài'
            description=''
          />
          <Link
            href='/dashboard/product/new'
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className='mr-2 h-4 w-4' /> Thêm mới
          </Link>
        </div>
        <Separator />
        {/* <ProductTableAction /> */}
          <ProductListingPage />
      </div>
    </PageContainer>
  );
}
