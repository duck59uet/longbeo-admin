import authInstance from '../authInstance';

export const getUsersInfo = async ({
  page = 1,
  limit = 10
}: {
  page?: number;
  limit?: number;
}): Promise<any> => {
  try {
    const response = await authInstance.get(
      `/user/admin/getUsers?limit=${limit}&page=${page}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to login');
  }
};
