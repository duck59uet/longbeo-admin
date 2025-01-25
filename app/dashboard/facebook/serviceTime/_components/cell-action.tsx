'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Employee } from '@/constants/data';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UpdateServiceModal } from './update-dialog';
import { ConfirmModal } from './confirm-modal';
import { toast } from 'sonner';
import { deleteServiceTime } from '@/services/serviceTime';

interface CellActionProps {
  data: Employee;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const onConfirm = async () => {};
  
  const onConfirmDelete = async () => {
    const result = await deleteServiceTime(Number(data.id));
    if (result.ErrorCode === 'SUCCESSFUL') {
      toast.success('Xóa thành công');
      window.location.reload();
    }
    // window.location.reload();
  };

  return (
    <>
      <ConfirmModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={onConfirmDelete}
        loading={loading}
      />
      <UpdateServiceModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
        data={data}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Tháo tác</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
