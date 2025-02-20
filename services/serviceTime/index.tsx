import authInstance from '../authInstance';
import instance from '../instance';

export const getServiceTimeInfo = async ({
  categoryId = 0,
  page = 1,
  limit = 10,
  serviceId
}: {
  categoryId?: number;
  page?: number;
  limit?: number;
  serviceId?: number;
}): Promise<any> => {
  try {
    const response = await instance.get(`/service_time/getServiceTime`, {
      params: { categoryId, serviceId, limit, page }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to get service time');
  }
};

export const createServiceTime = async (data: {
  serviceId: number;
  time: string;
  sourceServiceId: string;
}): Promise<any> => {
  try {
    const response = await authInstance.post('/service_time', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create service time');
  }
};

export const updateServiceTime = async (
  id: number,
  data: {
    time: string;
    sourceServiceId: string;
  }
): Promise<any> => {
  try {
    const response = await authInstance.put(`/service_time/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update service time');
  }
};

export const deleteServiceTime = async (id: number): Promise<any> => {
  try {
    const response = await authInstance.post(`/service_time/delete`, { id });
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete service time');
  }
};
