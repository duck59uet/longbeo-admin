'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Service } from '@/constants/data';
import { Edit, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { UpdateServiceModal } from './update-dialog';
import { ConfirmModal } from './confirm-modal';
import { changeServiceStatus } from '@/services/service';
import { toast } from 'sonner';

interface CellActionProps {
  data: Service;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openChangeStatus, setOpenChangeStatus] = useState(false);

  const onConfirm = async () => {};

  const onConfirmChangeStatus = async () => {
    console.log(data.id);
    const result = await changeServiceStatus(data.id);
    if (result.ErrorCode === 'SUCCESSFUL') {
      toast.success('Cập nhật trạng thái thành công');
      window.location.reload();
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={openChangeStatus}
        onClose={() => setOpenChangeStatus(false)}
        onConfirm={onConfirmChangeStatus}
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
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
