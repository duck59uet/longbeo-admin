import authInstance from '../authInstance';

export const createOrder = async (data: {
  link: string;
  quantity: number;
  amount: number;
  service_id: number;
  note?: string | null | undefined;
}): Promise<any> => {
  try {
    const response = await authInstance.post('/order/user/create', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create order');
  }
};

export const getOrder = async (ids: string): Promise<any> => {
  try {
    const response = await authInstance.get(`/order/user/history/${ids}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to get order history');
  }
};

export const getOrdersHistory = async ({
  categoryId = 0,
  page = 1,
  limit = 10
}: {
  categoryId ?: number;
  page?: number;
  limit?: number;
}): Promise<any> => {
  try {
    const response = await authInstance.get(
      `/order/admin/get?categoryId=${categoryId}&limit=${limit}&page=${page}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to login');
  }
};

export const getOrdersHistoryFull = async ({
  search = '',
  page = 1,
  limit = 10
}: {
  search ?: string;
  page?: number;
  limit?: number;
}): Promise<any> => {
  try {
    const response = await authInstance.get(
      `/order/admin/getOrder?search=${search}&limit=${limit}&page=${page}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to login');
  }
};

export const updateOrder = async (id: string): Promise<any> => {
  try {
    const response = await authInstance.put(`/order/admin/update/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update order');
  }
};

export const exportOrderHistoryDetail = async (
  categoryId: number,
  startDate: string,
  endDate: string
): Promise<void> => {
  try {
    const response = await authInstance.get(
      `order/admin/exportHistory?categoryId=${categoryId}&startDate=${startDate}&endDate=${endDate}`,
      {
        responseType: 'blob' // Lấy phản hồi dưới dạng file
      }
    );

    // Tạo Blob từ dữ liệu trả về
    const blob = new Blob([response.data], {
      type: response.headers['content-type']
    });
    const downloadUrl = window.URL.createObjectURL(blob);

    // Lấy tên file từ header Content-Disposition hoặc đặt tên mặc định
    const fileName =
      response.headers['content-disposition']?.match(
        /filename="?(.+)"?/
      )?.[1] || 'exported_file.csv';

    // Tạo thẻ <a> để tải xuống
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // Dọn dẹp URL và thẻ sau khi hoàn thành
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Failed to export topup history:', error);
    throw new Error('Failed to export topup history');
  }
};