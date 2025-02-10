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
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useState } from 'react';
import { ConfirmModal } from './confirm-modal';
import { deleteAdmin } from '@/services/admin';
import { toast } from 'sonner';
import { ChangePasswordModal } from './change-password-dialog';

interface CellActionProps {
  data: Admin;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openChangePass, setOpenChangePass] = useState(false);

  const onConfirmChangePass = async () => {};

  const onConfirm = async () => {
    const result = await deleteAdmin(data.id);
    if (result.ErrorCode === 'SUCCESSFUL') {
      toast.success('Xóa thành công');
      window.location.reload();
    }
    // window.location.reload();
  };

  return (
    <>
      <ConfirmModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <ChangePasswordModal
        isOpen={openChangePass}
        onClose={() => setOpenChangePass(false)}
        onConfirm={onConfirmChangePass}
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
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpenChangePass(true)}>
            <Edit className="mr-2 h-4 w-4" /> Cập nhật mật khẩu
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
