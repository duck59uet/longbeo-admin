'use client';
import { Employee } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'username',
    header: 'Tên tài khoản'
  },
  {
    accessorKey: 'fullname',
    header: 'Tên đầy đủ'
  },
  {
    accessorKey: 'phone',
    header: 'Số điện thoại'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
