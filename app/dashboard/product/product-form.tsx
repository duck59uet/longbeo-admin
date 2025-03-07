'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Product } from '@/constants/mock-api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import RichTextEditor from '@/components/RichTextEditor';
import { createNews } from '@/services/news';
import { toast } from 'sonner';
import { EditorState, convertToRaw } from 'draft-js';

// Main form schema
const formSchema = z.object({
  avatar: z.string(),
  title: z.string().min(2, {
    message: 'Product name must be at least 2 characters.'
  }),
  content: z.string().min(10, {
    message: 'Description must be at least 10 characters.'
  })
});

export default function ProductForm({
  initialData,
  pageTitle
}: {
  initialData: Product | null;
  pageTitle: string;
}) {
  // Nếu không có dữ liệu ban đầu, khởi tạo content với editor rỗng
  const defaultContent = initialData?.content
    ? (typeof initialData.content === 'string'
        ? initialData.content
        : JSON.stringify(initialData.content, null, 2))
    : JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()), null, 2);

  const defaultValues = {
    avatar: initialData?.avatar || '',
    title: initialData?.title || '',
    content: defaultContent
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Ở đây values.content đã là JSON string từ RichTextEditor
      const newsData = {
        avatar: values.avatar,
        title: values.title,
        content: JSON.parse(values.content), // parse lại thành object nếu API cần object
        status: true
      };

      const result = await createNews(newsData);

      if (result.ErrorCode !== 'SUCCESSFUL') {
        toast.error(result.Data?.Message || 'Thêm mới thất bại');
      } else {
        toast.success('Thêm mới tin tức thành công');
        form.reset();
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi thêm tin tức');
      console.error(error);
    }
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Ảnh bìa</FormLabel>
                  <FormControl>
                    <Input placeholder="Ảnh bìa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề</FormLabel>
                  <FormControl>
                    <Input placeholder="Thêm tiêu đề" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field: { onChange, value } }) => (
                <FormItem>
                  <FormLabel>Nội dung (Rich Text)</FormLabel>
                  <FormControl>
                    <RichTextEditor value={value} onChange={onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-3">
              Thêm mới
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
