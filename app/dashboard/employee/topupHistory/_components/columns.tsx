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
      // Chuyển giá trị cột thành số, nếu cần
      const value = Number(row.getValue('topup_amount'));
      // Định dạng số với phân cách hàng nghìn theo locale 'vi-VN'
      return new Intl.NumberFormat('en-US').format(value);
    }
  },
  {
    accessorKey: 'content',
    header: 'Nội dung'
  }
];
