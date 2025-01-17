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
  onConfirm,
  loading,
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
    const { amount, payment_method, payment_code, sender, content } =
      Object.fromEntries(formData);

    if (
      typeof amount !== 'string' ||
      typeof payment_method !== 'string' ||
      typeof payment_code !== 'string' ||
      typeof sender !== 'string' ||
      typeof content !== 'string'
    )
      return;

      
    const result = await topupUser({
      user_id: data.id,
      amount: Number(amount),
      payment_method: payment_method,
      payment_code: payment_code,
      sender: sender,
      content: content
    });

    if(result.ErrorCode === "SUCCESSFUL") {
      toast.success('Nạp tiền thành công');
      onClose();
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
            id="payment_method"
            name="payment_method"
            placeholder="Chuyển qua"
            className="col-span-4"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Input
            id="payment_code"
            name="payment_code"
            placeholder="Mã giao dịch"
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
        <div className="grid grid-cols-4 items-center gap-4">
          <Input
            id="content"
            name="content"
            placeholder="Nội dung"
            className="col-span-4"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#4680FF] text-white hover:bg-[#2E5BFF]"
          onClick={() => {handleSubmit}}
        >
          Nạp tiền
        </Button>
      </form>
    </Modal>
  );
};
