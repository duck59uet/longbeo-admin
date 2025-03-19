'use client';
import { Employee } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'user_username',
    header: 'Tên tài khoản'
  },
  {
    accessorKey: 'user_fullname',
    header: 'Tên đầy đủ'
  },
  {
    accessorKey: 'admin_fullname',
    header: 'Admin'
  },
  {
    accessorKey: 'topup_createdAt',
    header: 'Ngày tạo'
  },
  {
    accessorKey: 'topup_amount',
    header: 'Số tiền',
    cell: ({ row }) => {
      const value = Number(row.getValue('topup_amount'));
      return new Intl.NumberFormat('en-US').format(value);
    }
  },
  {
    accessorKey: 'content',
    header: 'Nội dung'
  }
];
