import authInstance from '../authInstance';

export const createOrder = async (data: {
  link: string;
  quantity: number;
  amount: number;
  service_id: number;
  note?: string | null | undefined;
}): Promise<any> => {
  try {
    const response = await authInstance.post('/order/user/create', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create order');
  }
};

export const getOrder = async (ids: string): Promise<any> => {
  try {
    const response = await authInstance.get(`/order/user/history/${ids}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get order history');
  }
};

export const getOrdersHistory = async ({
  page = 1,
  limit = 10
}: {
  page?: number;
  limit?: number;
}): Promise<any> => {
  try {
    const response = await authInstance.get(
      `/order/admin/get?limit=${limit}&page=${page}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to login');
  }
};
