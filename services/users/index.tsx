import authInstance from '../authInstance';

export const getUserList = async (page: number, limit: number): Promise<any> => {
  try {
    const response = await authInstance.get(`/user/admin/getUser?limit=${limit}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get users list', error);
    throw new Error('Failed to get users list');
  }
};

export const topupUser = async (data: {
  amount: number;
  user_id: string;
  sender: string;
}): Promise<any> => {
  try {
    const response = await authInstance.post('/topup/create', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to topup user');
  }
};

export const deleteUser = async (id: string): Promise<any> => {
  try {
    console.log('id', id);
    const response = await authInstance.post(`/user/delete`, { id });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};