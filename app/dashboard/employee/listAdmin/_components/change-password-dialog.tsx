'use client';
import { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { changePassword } from '@/services/admin';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  data: any;
}

export const ChangePasswordModal: React.FC<AlertModalProps> = ({
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
    const { oldPassword, newPassword } =
      Object.fromEntries(formData);

    if (
      typeof oldPassword !== 'string' ||
      typeof newPassword !== 'string'
    )
      return;

      
    const result = await changePassword(
      {
        oldPassword: oldPassword,
        newPassword: newPassword
      },
    );

    if(result.ErrorCode === "SUCCESSFUL") {
      toast.success('Chỉnh sửa thành công');
      onClose();
      window.location.reload();
    } else {
      toast.error('Trong quá trình chỉnh sửa đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  return (
    <Modal
      title="Cập nhật mật khẩu"
      description=""
      isOpen={isOpen}
      onClose={onClose}
    >
      <form id="service-form" className="grid gap-4 py-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-4 items-center gap-4">
          <Input
            id="oldPassword"
            name="oldPassword"
            placeholder="Mật khẩu cũ"
            className="col-span-4"
            type='password'
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Input
            id="newPassword"
            name="newPassword"
            placeholder="Mật khẩu mới"
            className="col-span-4"
            type='password'
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#4680FF] text-white hover:bg-[#2E5BFF]"
          onClick={() => {handleSubmit}}
        >
          Cập nhật thông tin
        </Button>
      </form>
    </Modal>
  );
};
