import authInstance from '../authInstance';

export const getTopupHistory = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}): Promise<any> => {
  try {
    const response = await authInstance.get(
      `/topup/admin/history?pageSize=${limit}&pageIndex=${page}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to get topup history');
  }
};
