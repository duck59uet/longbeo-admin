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
  orderId: string;
  orderLink: string;
  serviceId: string;
  orderQuantity: number;
  orderAmount: number;
  orderPrice: number;
  createdAt: string;
  orderNote: string;
  serviceName: string;
  servicePrice: number; 
};

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
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
        url: '/dashboard/facebook/view',
        icon: 'userPen',
      },
      {
        title: 'Quản lý máy chủ facebook',
        url: '/dashboard/facebook/view',
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
        url: '/dashboard/youtube/view',
        icon: 'userPen',
      },
      {
        title: 'Quản lý máy chủ youtube',
        url: '/dashboard/youtube/view',
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
        url: '/dashboard/shopee/view',
        icon: 'userPen',
      },
      {
        title: 'Quản lý máy chủ shopee',
        url: '/dashboard/shopee/view',
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
        url: '/dashboard/instagram/view',
        icon: 'userPen',
      },
      {
        title: 'Quản lý máy chủ instagram',
        url: '/dashboard/instagram/view',
        icon: 'userPen',
      },
    ]
  },
];
