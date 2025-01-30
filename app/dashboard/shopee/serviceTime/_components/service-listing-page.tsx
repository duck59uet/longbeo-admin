'use client';

import PageContainer from '@/components/layout/page-container';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { DataTable as OrderTable } from '@/components/ui/table/data-table';
import { columns } from './columns';
import { toast } from 'sonner';
import NewServiceTimeDialog from './new-serviceTime';
import { getServiceTimeInfo } from '@/services/serviceTime';
import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';

export default function ServiceTimeHistoryPage() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [serviceId, setServiceId] = useState<string | number | null>(null);
  const serviceOptions = [
    { value: '9', label: 'Máy chủ 1' },
    { value: '10', label: 'Máy chủ 2' },
    { value: '11', label: 'Máy chủ 3' },
  ];
  

  async function fetchServiceInfo(
    page: number,
    limit: number,
    serviceId: number | null
  ) {
    try {
      const data = await getServiceTimeInfo({
        categoryId: 3,
        page,
        limit,
        serviceId: serviceId || undefined
      });
      setData(data.Data[1]);
      setTotalItems(data.Data[0]);
    } catch (error) {
      toast.error('Không thể tải thông tin dịch vụ. Vui lòng thử lại sau.');
    }
  }

  useEffect(() => {
    fetchServiceInfo(page, limit, Number(serviceId));
  }, [page, limit, serviceId]);

  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: any) => {
    setLimit(newLimit);
  };

  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-start gap-4">
          <DataTableFilterBox
            filterKey="serviceId"
            title="Máy chủ"
            options={serviceOptions}
            setFilterValue={(value) => {
              setServiceId(value as number | null);
              return Promise.resolve(new URLSearchParams());
            }} 
            filterValue={serviceId?.toString() || ''}
          />
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
