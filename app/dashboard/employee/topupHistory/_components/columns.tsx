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
    header: 'Số tiền'
  },
  {
    accessorKey: 'content',
    header: 'Nội dung'
  }
];
