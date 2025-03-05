'use client';

import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns';
import { useEffect, useState } from 'react';
import { getOrdersHistory } from '@/services/order';

type ProductListingPage = {};

export default async function ProductListingPage({}: ProductListingPage) {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const CATEGORY_ID = 7;

  const fetchData = async (page: any, limit: any) => {
    try {
      const result = await getOrdersHistory({
        categoryId: CATEGORY_ID,
        page,
        limit
      });
      setData(result.Data[1]);
      setTotalItems(result.Data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(page, limit);
  }, [page, limit]);

  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: any) => {
    setLimit(newLimit);
  };

  return (
    <ProductTable
      columns={columns}
      data={data}
      totalItems={totalItems}
      onPageChange={handlePageChange}
      onLimitChange={handleLimitChange}
    />
  );
}
