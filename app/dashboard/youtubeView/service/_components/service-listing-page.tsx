'use client';

import PageContainer from '@/components/layout/page-container';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { DataTable as OrderTable } from '@/components/ui/table/data-table';
import { columns } from './columns';
import { getServiceInfo } from '@/services/service';
import { toast } from 'sonner';

export default function ServiceHistoryPage() {
  const CATEGORY_ID = 7;
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  async function fetchServiceInfo() {
    try {
      const data = await getServiceInfo(CATEGORY_ID);
      setData(data.Data);
    } catch (error) {
      toast.error('Không thể tải thông tin dịch vụ. Vui lòng thử lại sau.');
    }
  }

  useEffect(() => {
    fetchServiceInfo();
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
        <div className="grid gap-4">
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
      </div>
    </PageContainer>
  );
}
