import authInstance from '../authInstance';

export const getListAdmin= async (): Promise<any> => {
  try {
    const response = await authInstance.get(`/admin/list-admin`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get list admin');
  }
};

export const createAdmin = async (data: any): Promise<any> => {
  try {
    const response = await authInstance.post(`/admin/create`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create admin');
  }
}

export const changePassword = async (data: {
    oldPassword: string;
    newPassword: string;
  }): Promise<any> => {
    try {
      const response = await authInstance.post('/admin/change-password', data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to change password');
    }
  };

export const deleteAdmin = async (id: string): Promise<any> => {
    try {
      const response = await authInstance.post(`/admin/delete`, { id });
      return response.data;
    } catch (error) {
      throw new Error('Failed to delete admin');
    }
  }