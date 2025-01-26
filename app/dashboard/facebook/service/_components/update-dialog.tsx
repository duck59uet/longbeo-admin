'use client';
import { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { updateService } from '@/services/service';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  data: any;
}

export const UpdateServiceModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  data
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', sourceAddress: '', rate: '', apiKey: '' });

  useEffect(() => {
    setIsMounted(true);
    if (data) {
      setFormData({ name: data.name, price: data.price, sourceAddress: data.sourceAddress,
      rate: data.rate, apiKey: data.apiKey });
    }
  }, [data]);

  if (!isMounted) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const { name, price, sourceAddress, rate, apiKey } =
      Object.fromEntries(formData);

    if (
      typeof name !== 'string' ||
      typeof price !== 'string' ||
      typeof sourceAddress !== 'string' ||
      typeof rate !== 'string' ||
      typeof apiKey !== 'string'
    )
      return;

      
    const result = await updateService(
      data.id,
      {
        name,
        price: Number(price),
        sourceAddress,
        rate: Number(rate),
        apiKey
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
      title="Chỉnh sửa thông tin"
      description=""
      isOpen={isOpen}
      onClose={onClose}
    >
      <form id="service-form" className="grid gap-4 py-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-4 items-center gap-4">
          <Input
            id="name"
            name="name"
            placeholder="Tên máy chủ"
            className="col-span-4"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Input
            id="price"
            name="price"
            placeholder="Giá tiền"
            className="col-span-4"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Input
            id="sourceAddress"
            name="sourceAddress"
            placeholder="Nguồn"
            className="col-span-4"
            value={formData.sourceAddress}
            onChange={(e) => setFormData({ ...formData, sourceAddress: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Input
            id="rate"
            name="rate"
            placeholder="Tỉ lệ mắt"
            className="col-span-4"
            value={formData.rate}
            onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Input
            id="apiKey"
            name="apiKey"
            placeholder="Key"
            className="col-span-4"
            value={formData.apiKey}
            onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#4680FF] text-white hover:bg-[#2E5BFF]"
          onClick={() => {handleSubmit}}
        >
          Chỉnh sửa
        </Button>
      </form>
    </Modal>
  );
};
