import authInstance from '../authInstance';
import instance from '../instance';

export const createNews = async (data: {
  avatar: string;
  title: string;
  content: {};
  status?: boolean;
}): Promise<any> => {
  try {
    const response = await authInstance.post('/news/create', { ...data, status: data.status ?? true });
    return response.data;
  } catch (error) {
    throw new Error('Failed to topup user');
  }
};

export const updateNews = async (data: {
  id: number;
  avatar: string;
  title: string;
  content: {};
  status?: boolean;
}): Promise<any> => {
  try {
    const response = await authInstance.post('/news/update', { ...data, status: data.status ?? true });
    return response.data;
  } catch (error) {
    throw new Error('Failed to topup user');
  }
};

export const getNews = async (page: number, limit: number): Promise<any> => {
  try {
    const response = await authInstance.get(`/news/get?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get news');
  }
};

export const getNewsById = async (id: number): Promise<any> => {
  try {
    const response = await instance.get(`/news/user/admin/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get news');
  }
};
