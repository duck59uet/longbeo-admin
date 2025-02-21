'use client';

import PageContainer from '@/components/layout/page-container';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { exportUserList, getUsersInfo } from '@/services/user';
import { DataTable as OrderHistoryTable } from '@/components/ui/table/data-table';
import { columns } from './columns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getOrdersHistoryFull } from '@/services/order';

export default function OrderHistoryPage() {
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [username, setUsername] = useState('');

  const fetchData = async (page: any, limit: any, search: string) => {
    try {
      const result = await getOrdersHistoryFull({ search, page, limit });
      setData(result.Data[1]);
      setTotalItems(result.Data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(page, limit, username);
  }, [page, limit, username]);

  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: any) => {
    setLimit(newLimit);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleExport = async () => {
    try {
      await exportUserList();
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  }

  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-center">
          <Input
            placeholder={`Search by username`}
            onChange={handleSearchChange}
            className={'w-full md:max-w-sm'}
          />
          <Button className='ml-2 px-3 py-2' onClick={() => handleExport()}>Lịch sử đơn hàng</Button>
        </div>
        <div className="grid gap-4">
          <Card>
            <OrderHistoryTable
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
