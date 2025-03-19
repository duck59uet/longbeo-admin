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
    header: 'Số dư',
    cell: ({ row }) => {
      // Chuyển giá trị cột thành số, nếu cần
      const value = Number(row.getValue('balance_balance'));
      // Định dạng số với phân cách hàng nghìn theo locale 'vi-VN'
      return new Intl.NumberFormat('en-US').format(value);
    }
  },
  {
    accessorKey: 'levelname',
    header: 'Cấp bậc'
  },
  {
    accessorKey: 'user_referUser',
    header: 'Người giới thiệu'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
