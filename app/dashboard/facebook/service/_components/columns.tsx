'use client';
import { Service } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Service>[] = [
  {
    accessorKey: 'name',
    header: 'Tên máy chủ'
  },
  {
    accessorKey: 'price',
    header: 'Giá tiền'
  },
  {
    accessorKey: 'sourceAddress',
    header: 'Nguồn'
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => {
      const status = row.original.status;
      return status === 1 ? 'Đang hoạt động' : 'Không hoạt động';
    }
  },
  {
    accessorKey: 'rate',
    header: 'Tỉ lệ mắt'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
