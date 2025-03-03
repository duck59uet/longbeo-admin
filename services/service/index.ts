import authInstance from '../authInstance';

export const getServiceInfo = async (seriveId: number): Promise<any> => {
  try {
    const response = await authInstance.get(`/service/all/${seriveId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to login');
  }
};

export const updateService = async (id: number, data: {
  name: string;
  enName: string;
  price: number;
  enPrice: number;
  sourceAddress: string;
  rate: number;
  apiKey: string;
}): Promise<any> => {
  try {
    const response = await authInstance.put(`/service/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update service');
  }
};

export const changeServiceStatus = async (id: number): Promise<any> => {
  try {
    const response = await authInstance.put(`/service/status/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update service status');
  }
};