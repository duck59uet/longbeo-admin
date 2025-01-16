'use client';

import PageContainer from '@/components/layout/page-container';
import { Card, CardContent } from '@/components/ui/card';
import EmployeeTable from './employee-table';
import { useEffect, useState } from 'react';
import { getUsersInfo } from '@/services/user';

export default function EmployeePage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getUsersInfo({ page: 1, limit: 10 });
        // console.log(result);
        setData(result.Data[1]);
      } catch (error) {
        console.error('Error fetching top-up history:', error);
      }
    }

    fetchData();
  }, []);

  // console.log(data);
  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="grid gap-4">
          <Card>
            <EmployeeTable data={data} />
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
