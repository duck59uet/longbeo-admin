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
    header: 'Giá tiền'
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
