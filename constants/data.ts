import { NavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [];

export type BuffHistory = {
  order_id: string;
  order_link: string;
  serviceId: string;
  order_quantity: number;
  orderAmount: number;
  order_price: number;
  order_createdAt: string;
  order_note: string;
  service_name: string;
  service_price: number; 
  order_status: string;
};

export type Employee = {
  id: string;
  username: string;
  fullname: string;
};

export type TopupHistory = {
  id: number;
  amount: string;
  createdAt: string;
  note: string;
  payment_method: string;
  payment_code: string;
  sender: string;
  content: string;
}

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Trang chủ',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Quản lý tài khoản',
    url: '/dashboard/employee',
    icon: 'user',
    shortcut: ['e', 'e'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Facebook',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'facebook',
    isActive: true,

    items: [
      {
        title: 'Quản lý đơn facebook',
        url: '/dashboard/facebook/order',
        icon: 'userPen',
      },
      {
        title: 'Quản lý máy chủ facebook',
        url: '/dashboard/facebook/service',
        icon: 'userPen',
      },
    ]
  },
  {
    title: 'Youtube',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'youtube',
    isActive: true,

    items: [
      {
        title: 'Quản lý đơn youtube',
        url: '/dashboard/youtube/order',
        icon: 'userPen',
      },
      {
        title: 'Quản lý máy chủ youtube',
        url: '/dashboard/youtube/service',
        icon: 'userPen',
      },
    ]
  },
  {
    title: 'Shopee',
    url: '#',
    icon: 'shopee',
    isActive: true,

    items: [
      {
        title: 'Quản lý đơn shopee',
        url: '/dashboard/shopee/order',
        icon: 'userPen',
      },
      {
        title: 'Quản lý máy chủ shopee',
        url: '/dashboard/shopee/service',
        icon: 'userPen',
      },
    ]
  },
  {
    title: 'Instagram',
    url: '#',
    icon: 'instagram',
    isActive: true,

    items: [
      {
        title: 'Quản lý đơn instagram',
        url: '/dashboard/instagram/order',
        icon: 'userPen',
      },
      {
        title: 'Quản lý máy chủ instagram',
        url: '/dashboard/instagram/service',
        icon: 'userPen',
      },
    ]
  },
];
