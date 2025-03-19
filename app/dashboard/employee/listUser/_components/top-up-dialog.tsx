'use client';
import { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { topupUser } from '@/services/users';
import { toast } from 'sonner';

interface AlertModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  loading: boolean;
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

  // Xử lý định dạng input cho số với phân cách hàng nghìn, cho phép số âm
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    let isNegative = false;
    let valueToProcess = inputValue;
    
    // Kiểm tra nếu giá trị bắt đầu bằng dấu "-" và loại bỏ dấu này khỏi phần xử lý
    if (inputValue.startsWith('-')) {
      isNegative = true;
      valueToProcess = inputValue.slice(1);
    }
    
    // Loại bỏ tất cả ký tự không phải số
    const rawValue = valueToProcess.replace(/\D/g, '');
    
    // Nếu chỉ nhập dấu "-" mà chưa có số nào, giữ nguyên dấu "-"
    if (isNegative && rawValue === '') {
      setAmount('-');
      return;
    }
    
    // Nếu có giá trị, định dạng với phân cách hàng nghìn
    const formattedValue = rawValue ? new Intl.NumberFormat('en-US').format(Number(rawValue)) : '';
    const finalValue = isNegative ? '-' + formattedValue : formattedValue;
    setAmount(finalValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Loại bỏ dấu phẩy định dạng hàng nghìn để lấy số thực, giữ lại dấu âm nếu có
    const numericAmount = Number(amount.replace(/,/g, ''));
    
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
