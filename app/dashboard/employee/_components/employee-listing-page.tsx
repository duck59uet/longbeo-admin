import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { searchParamsCache } from '@/lib/searchparams';
import EmployeeTable from './employee-tables';
import { getUserList } from '@/services/users';

type TEmployeeListingPage = {};

export default async function EmployeeListingPage({}: TEmployeeListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const pageLimit = searchParamsCache.get('limit');

  const filters = {
    page,
    limit: pageLimit,
    // ...(search && { search }),
    // ...(gender && { genders: gender })
  };

  const data = await getUserList(filters.page, filters.limit)

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title={`Employee (${10})`}
            description=""
          />
        </div>
        <Separator />
        <EmployeeTable data={[]} totalData={10} />
      </div>
    </PageContainer>
  );
}
