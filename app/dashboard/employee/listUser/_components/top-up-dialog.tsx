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
  data: any;
}

export const TopupModal: React.FC<AlertModalProps> = ({ isOpen, onClose, data }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Xử lý định dạng input cho số với phân cách hàng nghìn
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Loại bỏ tất cả ký tự không phải số
    const rawValue = e.target.value.replace(/\D/g, '');
    // Nếu có giá trị, định dạng với phân cách hàng nghìn theo chuẩn Việt Nam
    const formattedValue = rawValue ? new Intl.NumberFormat('en-US').format(Number(rawValue)) : '';
    setAmount(formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Loại bỏ định dạng phân cách hàng nghìn để lấy số thực
    const numericAmount = Number(amount.replace(/\D/g, ''));
    
    // Lấy thông tin người chuyển từ form
    const form = e.currentTarget;
    const formData = new FormData(form);
    const { sender } = Object.fromEntries(formData);

    if (isNaN(numericAmount) || typeof sender !== 'string') return;

    const result = await topupUser({
      user_id: data.user_id,
      amount: numericAmount,
      sender: sender
    });

    if (result.ErrorCode === 'SUCCESSFUL') {
      toast.success('Nạp tiền thành công');
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
            value={data.user_username}
            disabled={true}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Input
            id="amount"
            name="amount"
            placeholder="Số tiền"
            className="col-span-4"
            value={amount}
            onChange={handleAmountChange}
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
        >
          Nạp tiền
        </Button>
      </form>
    </Modal>
  );
};
