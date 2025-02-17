import authInstance from '../authInstance';

export const getUserLevel = async (): Promise<any> => {
  try {
    const response = await authInstance.get(`/user_level`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get user level');
  }
};

export const updateLevel = async (data: {
  id: number;
  discount: number;
}): Promise<any> => {
  try {
    const response = await authInstance.post('/user_level/update', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update user level');
  }
};
