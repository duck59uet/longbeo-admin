'use client';
import { Employee } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

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
    accessorKey: 'note',
    header: 'Ghi chú'
  },
  {
    accessorKey: 'topup_payment_method',
    header: 'Phương thức thanh toán'
  },
  {
    accessorKey: 'topup_payment_code',
    header: 'Mã giao dịch'
  },
  {
    accessorKey: 'topup_sender',
    header: 'Người gửi'
  },
  {
    accessorKey: 'content',
    header: 'Nội dung'
  }
];
