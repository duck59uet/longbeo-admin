import authInstance from '../authInstance';

export const getInfo = async (): Promise<any> => {
  try {
    const response = await authInstance.get('/user');
    return response.data;
  } catch (error) {
    throw new Error('Failed to login');
  }
};

export const updateInfo = async (data: {
  fullname: string;
  avatar: string;
  facebook: string;
}): Promise<any> => {
  try {
    const response = await authInstance.post('/user/update', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update');
  }
};

export const getTopupHistory = async (params: {
  pageSize : number;
  pageIndex : number;
}): Promise<any> => {
  try {
    const response = await authInstance.get('/topup/user/history', {
      params
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to get topup history');
  }
}

export const getBalanceInfo = async (): Promise<any> => {
  try {
    const response = await authInstance.get('/user/balance');
    return response.data;
  } catch (error) {
    throw new Error('Failed to get balance info');
  }
}
