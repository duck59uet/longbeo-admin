'use client';
import { Admin } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Admin>[] = [
  {
    accessorKey: 'user_username',
    header: 'Tên tài khoản'
  },
  {
    accessorKey: 'user_fullname',
    header: 'Tên đầy đủ'
  },
  {
    accessorKey: 'user_email',
    header: 'Email'
  },
  {
    accessorKey: 'user_phone',
    header: 'Số điện thoại'
  },
  {
    accessorKey: 'balance_balance',
    header: 'Số dư'
  },
  {
    accessorKey: 'levelname',
    header: 'Cấp bậc'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
