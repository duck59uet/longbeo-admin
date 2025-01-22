'use client';
import { Employee } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'serviceName',
    header: 'Tên dịch vụ'
  },
  {
    accessorKey: 'time',
    header: 'Thời gian tương ứng'
  },
  {
    accessorKey: 'sourceServiceId',
    header: 'ID nguồn'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
