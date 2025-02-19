'use client';
import { BuffHistory } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<BuffHistory>[] = [
  {
    accessorKey: 'order_link',
    header: 'Link'
  },
  {
    accessorKey: 'order_createdAt',
    header: 'Thời gian tạo'
  },
  {
    accessorKey: 'service_name',
    header: 'Máy chủ'
  },
  {
    accessorKey: 'service_price',
    header: 'Giá tiền máy chủ'
  },
  {
    accessorKey: 'order_quantity',
    header: 'Số mắt'
  },
  {
    accessorKey: 'order_price',
    header: 'Thành tiền'
  },
  {
    accessorKey: 'order_discount',
    header: 'Giảm giá'
  },
  {
    accessorKey: 'user_username',
    header: 'Tài khoản'
  },
  {
    accessorKey: 'order_status',
    header: 'Trạng thái đơn'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const isComplete = row.original.order_status === 'Complete';
      return <CellAction data={row.original} disabled={isComplete} />;
    }
  }
];
