'use client';

import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns';
import { useEffect, useState } from 'react';
import { getNews } from '@/services/news';

export default function ProductListingPage() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchData = async (page: number, limit: number) => {
    try {
      const result = await getNews(page, limit);
      setData(result.Data.news);
      setTotalItems(result.Data.total);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(page, limit);
  }, [page, limit]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
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
