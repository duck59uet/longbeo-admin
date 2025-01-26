'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
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
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { exportOrderHistoryDetail } from '@/services/order';

const formSchema = z.object({
  startDate: z.string(),
  endDate: z.string()
});

type ExportHistoryFormValues = z.infer<typeof formSchema>;

export default function OrderHistoryDialog() {

  const form = useForm<ExportHistoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: '',
      endDate: ''
    }
  });

  
  const onSubmit = async (values: ExportHistoryFormValues) => {
    try {
      await exportOrderHistoryDetail(5, values.startDate, values.endDate);
      toast.success('Xuất dữ liệu thành công');
    } catch (error) {
      console.error('Error exporting history:', error);
      toast.error('Đã có lỗi xảy ra khi xuất dữ liệu');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          ＋ Lịch sử
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xuất dữ liệu lịch sử</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-4"
          >
            <div className="grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3">
                    <FormLabel className="w-1/3 text-lg">Ngày bắt đầu</FormLabel>
                    <FormControl className="w-2/3">
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3">
                    <FormLabel className="w-1/3 text-lg">Ngày kết thúc</FormLabel>
                    <FormControl className="w-2/3">
                      <Input type="datetime-local" {...field} />
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
              Xuất dữ liệu
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
