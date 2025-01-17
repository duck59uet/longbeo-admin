import authInstance from '../authInstance';

export const getServiceInfo = async (seriveId: number): Promise<any> => {
  try {
    const response = await authInstance.get(`/service/${seriveId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to login');
  }
};

export const updateService = async (id: number, data: {
  name: string;
  price: number;
  sourceAddress: string;
  sourceServiceId: string;
}): Promise<any> => {
  try {
    const response = await authInstance.put(`/service/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update service');
  }
};