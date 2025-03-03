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

export type Admin = {
  user_id: string;
  username: string;
  fullname: string;
};

export type Service = {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  description: string;
  sourceAddress: string;
  status: number;
  rate: number;
  apiKey: string;
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
};

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
    url: '#',
    icon: 'user',
    isActive: true,
    items: [
      {
        title: 'Tài khoản admin',
        url: '/dashboard/employee/listAdmin',
        icon: 'userPen'
      },
      {
        title: 'Tài khoản người dùng',
        url: '/dashboard/employee/listUser',
        icon: 'userPen'
      },
      {
        title: 'Lịch sử nạp tiền',
        url: '/dashboard/employee/topupHistory',
        icon: 'userPen'
      },
      {
        title: 'Lịch sử đơn hàng',
        url: '/dashboard/employee/orderHistory',
        icon: 'userPen'
      },
      {
        title: 'Cấp bậc',
        url: '/dashboard/employee/userLevel',
        icon: 'userPen'
      }
    ]
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
        icon: 'userPen'
      },
      {
        title: 'Quản lý máy chủ facebook',
        url: '/dashboard/facebook/service',
        icon: 'userPen'
      },
      {
        title: 'Quản lý thời gian facebook',
        url: '/dashboard/facebook/serviceTime',
        icon: 'userPen'
      }
    ]
  },
  {
    title: 'Facebook - View Live',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'facebook',
    isActive: true,

    items: [
      {
        title: 'Quản lý đơn facebook',
        url: '/dashboard/facebookView/order',
        icon: 'userPen'
      },
      {
        title: 'Quản lý máy chủ facebook',
        url: '/dashboard/facebookView/service',
        icon: 'userPen'
      },
      {
        title: 'Quản lý thời gian facebook',
        url: '/dashboard/facebookView/serviceTime',
        icon: 'userPen'
      }
    ]
  },
  {
    title: 'Facebook - View Reel',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'facebook',
    isActive: true,

    items: [
      {
        title: 'Quản lý đơn facebook',
        url: '/dashboard/facebookViewReel/order',
        icon: 'userPen'
      },
      {
        title: 'Quản lý máy chủ facebook',
        url: '/dashboard/facebookViewReel/service',
        icon: 'userPen'
      },
      {
        title: 'Quản lý thời gian facebook',
        url: '/dashboard/facebookViewReel/serviceTime',
        icon: 'userPen'
      }
    ]
  },
  {
    title: 'Tiktok',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'tiktok',
    isActive: true,

    items: [
      {
        title: 'Quản lý đơn tiktok',
        url: '/dashboard/tiktok/order',
        icon: 'userPen'
      },
      {
        title: 'Quản lý máy chủ tiktok',
        url: '/dashboard/tiktok/service',
        icon: 'userPen'
      },
      {
        title: 'Quản lý thời gian tiktok',
        url: '/dashboard/tiktok/serviceTime',
        icon: 'userPen'
      }
    ]
  },
  {
    title: 'Tiktok - View',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'tiktok',
    isActive: true,

    items: [
      {
        title: 'Quản lý đơn tiktok',
        url: '/dashboard/tiktokView/order',
        icon: 'userPen'
      },
      {
        title: 'Quản lý máy chủ tiktok',
        url: '/dashboard/tiktokView/service',
        icon: 'userPen'
      },
      {
        title: 'Quản lý thời gian tiktok',
        url: '/dashboard/tiktokView/serviceTime',
        icon: 'userPen'
      }
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
        icon: 'userPen'
      },
      {
        title: 'Quản lý máy chủ youtube',
        url: '/dashboard/youtube/service',
        icon: 'userPen'
      },
      {
        title: 'Quản lý thời gian youtube',
        url: '/dashboard/youtube/serviceTime',
        icon: 'userPen'
      }
    ]
  },
  {
    title: 'Youtube - View',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'youtube',
    isActive: true,

    items: [
      {
        title: 'Quản lý đơn youtube',
        url: '/dashboard/youtubeView/order',
        icon: 'userPen'
      },
      {
        title: 'Quản lý máy chủ youtube',
        url: '/dashboard/youtubeView/service',
        icon: 'userPen'
      },
      {
        title: 'Quản lý thời gian youtube',
        url: '/dashboard/youtubeView/serviceTime',
        icon: 'userPen'
      }
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
        icon: 'userPen'
      },
      {
        title: 'Quản lý máy chủ shopee',
        url: '/dashboard/shopee/service',
        icon: 'userPen'
      },
      {
        title: 'Quản lý thời gian shopee',
        url: '/dashboard/shopee/serviceTime',
        icon: 'userPen'
      }
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
        icon: 'userPen'
      },
      {
        title: 'Quản lý máy chủ instagram',
        url: '/dashboard/instagram/service',
        icon: 'userPen'
      },
      {
        title: 'Quản lý thời gian instagram',
        url: '/dashboard/instagram/serviceTime',
        icon: 'userPen'
      }
    ]
  },
  {
    title: 'Instagram - View',
    url: '#',
    icon: 'instagram',
    isActive: true,

    items: [
      {
        title: 'Quản lý đơn instagram',
        url: '/dashboard/instagramView/order',
        icon: 'userPen'
      },
      {
        title: 'Quản lý máy chủ instagram',
        url: '/dashboard/instagramView/service',
        icon: 'userPen'
      },
      {
        title: 'Quản lý thời gian instagram',
        url: '/dashboard/instagramView/serviceTime',
        icon: 'userPen'
      }
    ]
  }
];
