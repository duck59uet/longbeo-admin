import authInstance from '../authInstance';

export const getTopupHistory = async ({
  page = 1,
  limit = 10
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

export const exportTopupHistoryDetail = async (
  startDate: string,
  endDate: string
): Promise<void> => {
  try {
    const response = await authInstance.get(
      `topup/admin/topup/exportHistory?startDate=${startDate}&endDate=${endDate}`,
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
