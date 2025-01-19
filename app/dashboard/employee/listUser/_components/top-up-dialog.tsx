'use client';
import { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { topupUser } from '@/services/users';
import { toast } from 'sonner';

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
  data
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const { amount, sender } = Object.fromEntries(formData);

    if (typeof amount !== 'string' || typeof sender !== 'string') return;

    const result = await topupUser({
      user_id: data.user_id,
      amount: Number(amount),
      sender: sender
    });

    if (result.ErrorCode === 'SUCCESSFUL') {
      toast.success('Nạp tiền thành công');
      // onClose();
      window.location.reload();
    }
  };

  return (
    <Modal
      title="Nạp tiền tài khoản"
      description=""
      isOpen={isOpen}
      onClose={onClose}
    >
      <form id="todo-form" className="grid gap-4 py-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-4 items-center gap-4">
          <Input
            id="username"
            name="username"
            placeholder="Tên tài khoản"
            className="col-span-4"
            value={data.username}
            disabled={true}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Input
            id="amount"
            name="amount"
            placeholder="Số tiền"
            className="col-span-4"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Input
            id="sender"
            name="sender"
            placeholder="Người chuyển"
            className="col-span-4"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#4680FF] text-white hover:bg-[#2E5BFF]"
          onClick={() => {
            handleSubmit;
          }}
        >
          Nạp tiền
        </Button>
      </form>
    </Modal>
  );
};
