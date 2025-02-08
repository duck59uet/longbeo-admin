'use client';

import { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { updateServiceTime } from '@/services/serviceTime';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  data: any;
}

export const UpdateServiceTimeModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  data,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({ name: '', time: '1', sourceServiceId: '' });

  useEffect(() => {
    setIsMounted(true);
    if (data) {
      setFormData({
        name: data.serviceName || '', 
        time: data.time || '1',
        sourceServiceId: data.sourceServiceId || '',
      });
    }
    console.log()
  }, [data]);

  if (!isMounted) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.sourceServiceId) {
      toast.error('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    try {
      const result = await updateServiceTime(data.id, {
        time: '1',
        sourceServiceId: formData.sourceServiceId,
      });

      if (result.ErrorCode === 'SUCCESSFUL') {
        toast.success('Chỉnh sửa thành công');
        onClose();
        window.location.reload();
      } else {
        toast.error(
          'Trong quá trình chỉnh sửa đã xảy ra lỗi. Vui lòng thử lại sau.'
        );
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <Modal
      title="Chỉnh sửa thông tin"
      description=""
      isOpen={isOpen}
      onClose={onClose}
    >
      <form
        id="service-time-form"
        className="grid gap-4 py-4"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-4 items-center gap-4">
          <Input
            id="name"
            name="name"
            placeholder="Tên máy chủ"
            className="col-span-4"
            value={formData.name || ''} 
            disabled 
          />
        </div>
        {/* <div className="grid grid-cols-4 items-center gap-4">
          <Input
            id="time"
            name="time"
            placeholder="Thời gian"
            className="col-span-4"
            value={formData.time}
            onChange={(e) =>
              setFormData({ ...formData, time: e.target.value })
            }
          />
        </div> */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Input
            id="sourceServiceId"
            name="sourceServiceId"
            placeholder="ID nguồn"
            className="col-span-4"
            value={formData.sourceServiceId}
            onChange={(e) =>
              setFormData({ ...formData, sourceServiceId: e.target.value })
            }
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#4680FF] text-white hover:bg-[#2E5BFF]"
          disabled={loading}
        >
          {loading ? 'Đang xử lý...' : 'Chỉnh sửa'}
        </Button>
      </form>
    </Modal>
  );
};
