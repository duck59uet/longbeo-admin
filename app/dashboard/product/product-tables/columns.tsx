'use client';
import { Product } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'avatar',
    header: 'Ảnh bìa',
    cell: ({ row }) => {
      return (
        <div className="relative w-32 h-32">
          <img
            src={row.getValue('avatar')}
            alt={row.getValue('title')}
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>
      );
    }
  },
  {
    accessorKey: 'title',
    header: 'Tiêu đề'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
