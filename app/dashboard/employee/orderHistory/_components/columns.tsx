'use client';
import { Admin } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Admin>[] = [
  {
    accessorKey: 'id',
    header: 'Mã đơn hàng'
  },
  {
    accessorKey: 'link',
    header: 'Đường link'
  },
  {
    accessorKey: 'createdAt',
    header: 'Thời gian tạo'
  },
  {
    accessorKey: 'quantity',
    header: 'Số lượng'
  },
  {
    accessorKey: 'amount',
    header: 'Số phút'
  },
  {
    accessorKey: 'price',
    header: 'Giá tiền',
    cell: ({ row }) => {
      // Chuyển giá trị cột thành số, nếu cần
      const value = Number(row.getValue('price'));
      // Định dạng số với phân cách hàng nghìn theo locale 'vi-VN'
      return new Intl.NumberFormat('en-US').format(value);
    }
  },
  {
    accessorKey: 'discount',
    header: 'Giảm giá'
  },
  {
    accessorKey: 'startCount',
    header: 'Số mắt bắt đầu'
  },
  {
    accessorKey: 'username',
    header: 'Tài khoản'
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái'
  },
];
