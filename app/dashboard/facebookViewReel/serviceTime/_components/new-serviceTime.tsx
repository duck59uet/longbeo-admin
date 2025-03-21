'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { createAdmin } from '@/services/admin';
import { getServiceInfo } from '@/services/service';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { createServiceTime } from '@/services/serviceTime';

const formSchema = z.object({
  serviceId: z.string(),
  time: z.string(),
  sourceServiceId: z.string()
});

type BuyServiceFormValues = z.infer<typeof formSchema>;

export default function NewServiceTimeDialog() {
  const [serviceData, setServiceData] = useState([]);
  const CATEGORY_ID = 8;

  const form = useForm<BuyServiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceId: '',
      time: '1',
      sourceServiceId: ''
    }
  });

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await getServiceInfo(CATEGORY_ID);
        if (response.Data) {
          setServiceData(response.Data);
        }
      } catch (error) {
        // console.error('Lỗi khi gọi API:', error);
      }
    };

    fetchServiceData();
  }, []);
  const onSubmit = async (values: BuyServiceFormValues) => {
    try {
      const response = await createServiceTime({
        serviceId: Number(values.serviceId),
        time: '1',
        sourceServiceId: values.sourceServiceId
      });

      if (response.ErrorCode === 'SUCCESSFUL') {
        toast.success('Đã thêm mới thành công');
        form.reset();
        window.location.reload();
      }

      if (response.AdditionalData.Code === 'E004') {
        toast.error('Đã có lỗi xảy ra');
      }
    } catch (error) {
      console.error('Error creating serviceTime:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          ＋ Thêm mới
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm mới thời gian ứng với dịch vụ</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-4"
          >
            <div className="grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="serviceId"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3">
                    <FormLabel className="w-1/3 text-lg">Dịch vụ</FormLabel>
                    <FormControl className="w-2/3">
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                      >
                        <SelectTrigger className="w-2/3">
                          <SelectValue placeholder="Dịch vụ" />
                        </SelectTrigger>
                        <SelectContent className="w-2/3">
                          {serviceData.map((service: any) => (
                            <SelectItem value={service.id.toString()} key={service.id}>
                              {service.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sourceServiceId"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3">
                    <FormLabel className="w-1/3 text-lg">ID nguồn</FormLabel>
                    <FormControl className="w-2/3">
                      <Input type="number" placeholder="ID nguồn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#4680FF] text-white hover:bg-[#2E5BFF]"
            >
              Thêm mới
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
