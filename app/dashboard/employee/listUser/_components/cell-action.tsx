'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Admin } from '@/constants/data';
import { Edit, MoreHorizontal, Trash, User } from 'lucide-react';
import { useState } from 'react';
import { TopupModal } from './top-up-dialog';
import { ConfirmModal } from './confirm-modal';
import { deleteUser } from '@/services/users';
import { toast } from 'sonner';
import { UpdateUserLevelModal } from './update-level';

interface CellActionProps {
  data: Admin;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openLevel, setOpenLevel] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const onConfirm = async () => {};

  const onConfirmDelete = async () => {
    const result = await deleteUser(data.user_id);
    if (result.ErrorCode === 'SUCCESSFUL') {
      toast.success('Xóa thành công');
      window.location.reload();
    }
  };

  return (
    <>
      <TopupModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
        data={data}
      />
      <UpdateUserLevelModal
        isOpen={openLevel}
        onClose={() => setOpenLevel(false)}
        onConfirm={onConfirm}
        loading={loading}
        data={data}
      />
      <ConfirmModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={onConfirmDelete}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Edit className="mr-2 h-4 w-4" /> Nạp tiền
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenLevel(true)}>
            <User className="mr-2 h-4 w-4" /> Cấp bậc thành viên
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDelete(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
