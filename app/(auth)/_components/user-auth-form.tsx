'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, signOut } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
  username: z.string({ description: 'Hãy nhập tên tài khoản' }),
  password: z.string({ description: 'Hãy nhập mật khẩu' })
});

type UserFormValue = z.infer<typeof formSchema>;

interface UserAuthFormProps {
  toggleForm: () => void;
}

export default function UserAuthForm({ toggleForm }: UserAuthFormProps) {
  const searchParams = useSearchParams();
  const [rememberMeChecked, setRememberMeChecked] = useState(false);
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, startTransition] = useTransition();
  const defaultValues = {
    username: '',
    password: ''
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  useEffect(() => {
    signOut({ redirect: false });
  }, []);

  const onSubmit = async (data: UserFormValue) => {
    startTransition(async () => {
      try {
        const result = await signIn('credentials', {
          redirect: false,
          username: data.username,
          password: data.password,
          callbackUrl: callbackUrl ?? '/dashboard/overview'
        });

        if (result?.ok) {
          window.location.href = result.url || '/dashboard/overview';
        } else {
          toast.error('Tên tài khoản hoặc mật khẩu không đúng');
        }
      } catch (error) {
        toast.error('Đăng nhập thất bại. Vui lòng thử lại sau.');
      }
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-sans">Tên tài khoản</FormLabel>
                <FormControl>
                  <Input
                    type="string"
                    placeholder="Tên tài khoản"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-sans">Mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Mật khẩu"
                    autoComplete="current-password"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={rememberMeChecked}
              onCheckedChange={(checked) => setRememberMeChecked(checked === true)}
              disabled={loading}
            />
            <label htmlFor="rememberMe" className="font-sans">
              Ghi nhớ tài khoản
            </label>
          </div>
          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Đăng nhập
          </Button>
        </form>
      </Form>
    </>
  );
}
