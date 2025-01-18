'use client';
import { Employee } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Employee>[] = [
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
    accessorKey: 'sourceServiceId',
    header: 'ID nguồn'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
