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
import { Input } from '@/components/ui/input';
import { createAdmin } from '@/services/admin';
import { toast } from 'sonner';

export default function NewEmployeeDialog() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const { username, fullname, password, phone } =
      Object.fromEntries(formData);

    if (
      typeof username !== 'string' ||
      typeof fullname !== 'string' ||
      typeof password !== 'string' ||
      typeof phone !== 'string'
    )
      return;
    const result = await createAdmin({ username, fullname, password, phone });
    if (result.ErrorCode !== 'SUCCESSFUL') {
      toast.error(result.Data.Message);
    } else {
      toast.success('Thêm mới nhân viên thành công');
      form.reset();
      window.location.reload();
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
          <DialogTitle>Thêm mới nhân viên</DialogTitle>
        </DialogHeader>
        <form
          id="todo-form"
          className="grid gap-4 py-4"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="username"
              name="username"
              placeholder="Tên tài khoản"
              className="col-span-4"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="fullname"
              name="fullname"
              placeholder="Tên nhân viên"
              className="col-span-4"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="password"
              name="password"
              placeholder="Mật khẩu"
              className="col-span-4"
              type="password"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="phone"
              name="phone"
              placeholder="Số điện thoại"
              className="col-span-4"
            />
          </div>
        </form>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" size="sm" form="todo-form">
              Thêm mới
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
