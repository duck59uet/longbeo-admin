'use client';
import { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { updateLevel } from '@/services/userLevel';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  data: any;
}

export const TopupModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  data
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [discount, setDiscount] = useState<string>(
    data?.discount?.toString() || ''
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!discount) {
      toast.error('Vui lòng nhập giá trị giảm giá');
      return;
    }

    const result = await updateLevel({
      id: data.id,
      discount: Number(discount)
    });

    if (result.ErrorCode === 'SUCCESSFUL') {
      toast.success('Cập nhật thành công');
      onClose();
      window.location.reload();
    }
  };

  return (
    <Modal title="Cập nhật" description="" isOpen={isOpen} onClose={onClose}>
      <form id="todo-form" className="grid gap-4 py-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-4 items-center gap-4">
          <Input
            id="username"
            name="username"
            placeholder="Cấp bậc"
            className="col-span-4"
            value={data.name}
            disabled={true}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Input
            id="discount"
            name="discount"
            placeholder="Giảm giá"
            className="col-span-4"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#4680FF] text-white hover:bg-[#2E5BFF]"
        >
          Cập nhật
        </Button>
      </form>
    </Modal>
  );
};
