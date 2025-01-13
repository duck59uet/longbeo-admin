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