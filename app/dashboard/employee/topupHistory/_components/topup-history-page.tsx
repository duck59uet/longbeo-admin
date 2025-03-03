'use client';

import PageContainer from '@/components/layout/page-container';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { DataTable as TopupTable } from '@/components/ui/table/data-table';
import { columns } from './columns';
import { getTopupHistory } from '@/services/topup';
import TopupHistoryDialog from './export-history';

export default function TopupHistoryPage() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchData = async (page: any, limit: any) => {
    try {
      const result = await getTopupHistory({ page, limit });
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
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <TopupHistoryDialog />
        </div>
        <Card>
          <TopupTable
            columns={columns}
            data={data}
            totalItems={totalItems}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </Card>
      </div>
    </PageContainer>
  );
}
