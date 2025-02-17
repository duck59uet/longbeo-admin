'use client';
import { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateUserLevel } from '@/services/users';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  data: any;
}

export const UpdateUserLevelModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  data
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string>(data?.user_level?.toString() || '');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedLevel) {
      toast.error('Vui lòng chọn cấp bậc thành viên');
      return;
    }

    const result = await updateUserLevel({
      id: data.user_id,
      level: Number(selectedLevel)
    });

    if (result.ErrorCode === 'SUCCESSFUL') {
      toast.success('Thay đổi cấp bậc thành viên thành công');
      window.location.reload();
    }
  };

  return (
    <Modal
      title="Cấp bậc thành viên"
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
          <div className="col-span-4">
            <Select
              onValueChange={(value) => setSelectedLevel(value)}
              value={selectedLevel}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Dịch vụ" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="1" key="1">
                  Thành viên
                </SelectItem>
                <SelectItem value="2" key="2">
                  Cộng tác viên
                </SelectItem>
                <SelectItem value="3" key="3">
                  Đại lý
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-[#4680FF] text-white hover:bg-[#2E5BFF]"
          onClick={() => {
            handleSubmit;
          }}
        >
          Cập nhật
        </Button>
      </form>
    </Modal>
  );
};
