'use client';

import PageContainer from '@/components/layout/page-container';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { DataTable as OrderTable } from '@/components/ui/table/data-table';
import { columns } from './columns';
import { toast } from 'sonner';
import NewServiceTimeDialog from './new-serviceTime';
import { getServiceTimeInfo } from '@/services/serviceTime';

export default function ServiceTimeHistoryPage() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  async function fetchServiceInfo(page: number, limit: number) {
    try {
      const data = await getServiceTimeInfo({ categoryId: 3, page, limit });
      setData(data.Data[1]);
      setTotalItems(data.Data[0]);
    } catch (error) {
      toast.error('Không thể tải thông tin dịch vụ. Vui lòng thử lại sau.');
    }
  }

  useEffect(() => {
    fetchServiceInfo(page, limit);
  }, [page, limit]);

  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: any) => {
    setLimit(newLimit);
  };

  // console.log(data);
  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <NewServiceTimeDialog />
        </div>
        <Card>
          <OrderTable
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
