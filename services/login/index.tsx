import instance from '../instance';

export const loginUser = async (data: {
  username: string;
  password: string;
}): Promise<any> => {
  try {
    const response = await instance.post('/auth/admin/login', data);
    return response.data;
  } catch (error) {
    // console.error('Failed to login', error);
    throw new Error('Failed to login');
  }
};
