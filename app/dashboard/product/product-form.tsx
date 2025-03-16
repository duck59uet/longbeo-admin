'use client';

import React, { useState, useEffect } from 'react';
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
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import RichTextEditor from '@/components/RichTextEditor';
import { getNewsById, updateNews } from '@/services/news';
import { toast } from 'sonner';

// Schema cho form
const formSchema = z.object({
  avatar: z.string(),
  title: z.string().min(2, {
    message: 'Tiêu đề phải có ít nhất 2 ký tự.'
  }),
  content: z.string().min(10, {
    message: 'Nội dung phải có ít nhất 10 ký tự.'
  })
});

export default function ProductForm({ productId }: { productId: number }) {
  // State lưu trữ dữ liệu ban đầu nhận từ API
  const [initialData, setInitialData] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Khi có productId (khác giá trị tạo mới) thì gọi API để lấy dữ liệu
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getNewsById(productId);
        setInitialData(data.Data);
      } catch (error) {
        console.error('Error fetching news:', error);
        toast.error('Không thể lấy thông tin tin tức.');
      } finally {
        setLoading(false);
      }
    }
    // Giả sử productId = 0 nghĩa là "tạo mới"
    if (productId) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [productId]);

  // Hàm lấy dữ liệu content ban đầu từ initialData
  const getInitialContent = () => {
    if (!initialData?.content) {
      return '';
    }
    
    if (typeof initialData.content === 'object') {
      if (initialData.content.content) {
        return initialData.content.content;
      }
      return JSON.stringify(initialData.content);
    }
    
    if (typeof initialData.content === 'string') {
      try {
        const parsed = JSON.parse(initialData.content);
        if (parsed?.content) {
          return parsed.content;
        }
        return initialData.content;
      } catch {
        return initialData.content;
      }
    }
    
    return JSON.stringify(initialData.content);
  };

  const defaultValues = {
    avatar: initialData?.avatar || '',
    title: initialData?.title || '',
    content: getInitialContent()
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        avatar: initialData.avatar || '',
        title: initialData.title || '',
        content: getInitialContent()
      });
    }
  }, [initialData, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // CKEditor trả về HTML trực tiếp, không cần chuyển đổi
      const htmlContent = values.content;
      const contentObject = { content: htmlContent };

      const newsData = {
        id: initialData?.id || 0,
        avatar: values.avatar || '',
        title: values.title,
        content: contentObject,
        status: true
      };

      const result = await updateNews(newsData);
      if (result.ErrorCode !== 'SUCCESSFUL') {
        toast.error(result.Data?.Message || 'Cập nhật thất bại');
      } else {
        toast.success('Cập nhật thông tin thành công');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi thêm thông tin');
      console.error(error);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {initialData ? 'Cập nhật tin tức' : 'Thêm mới tin tức'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <RichTextEditor 
                      value={value} 
                      onChange={onChange} 
                      placeholder="Nhập nội dung bài viết..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-3">
              {initialData ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
