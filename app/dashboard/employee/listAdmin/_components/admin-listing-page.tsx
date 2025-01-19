'use client';

import PageContainer from '@/components/layout/page-container';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { DataTable as EmployeeTable } from '@/components/ui/table/data-table';
import { columns } from './columns';
import { getListAdmin } from '@/services/admin';
import NewEmployeeDialog from './new-admin';

export default function AdminListPage() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchData = async () => {
    try {
      const result = await getListAdmin();
      setData(result.Data);
      setTotalItems(100);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
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
          <NewEmployeeDialog />
        </div>
        <Card>
          <EmployeeTable
            columns={columns}
            data={data}
            totalItems={100}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </Card>
      </div>
    </PageContainer>
  );
}
