import { createFarmer, updateFarmer, deleteFarmer } from '@/requests/farmer';
import { postRequest } from "@/requests/post";
import { putRequest } from "@/requests/put";
import { deleteRequest } from "@/requests/delete";
import { FarmerDataMock } from '@/__mock__/farmerDataMock';

jest.mock("@/requests/post");
jest.mock("@/requests/put");
jest.mock("@/requests/delete");

describe('Farmer API Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const farmer = FarmerDataMock[0];

  describe('createFarmer', () => {
    it('should create a farmer successfully', async () => {
      const mockResponse = { ok: true, data: { id: '123', name: 'John Doe' } };
      (postRequest as jest.Mock).mockResolvedValue(mockResponse);


      const result = await createFarmer(farmer);

      expect(postRequest).toHaveBeenCalledWith('/api/farmer/create', farmer);
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error when creation fails', async () => {
      const mockResponse = { ok: false };
      (postRequest as jest.Mock).mockResolvedValue(mockResponse);

      const body = { name: 'John Doe', age: 30 };
      await expect(createFarmer(farmer)).rejects.toThrow('Failed to create farmer');
    });
  });

  describe('updateFarmer', () => {
    it('should update a farmer successfully', async () => {
      const mockResponse = { ok: true, data: farmer };
      (putRequest as jest.Mock).mockResolvedValue(mockResponse);

      const farmerId = '123';
      const body = farmer
      const result = await updateFarmer(farmerId, farmer);

      expect(putRequest).toHaveBeenCalledWith(`/api/farmer/update/${farmerId}`, body);
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error when update fails', async () => {
      const mockResponse = { ok: false };
      (putRequest as jest.Mock).mockResolvedValue(mockResponse);

      const farmerId = '123';
      const body = { name: 'John Updated' };
      await expect(updateFarmer(farmerId, farmer)).rejects.toThrow('Failed to update farmer');
    });
  });

  describe('deleteFarmer', () => {
    it('should delete a farmer successfully', async () => {
      const mockResponse = { ok: true, data: { message: 'Farmer deleted' } };
      (deleteRequest as jest.Mock).mockResolvedValue(mockResponse);

      const farmerId = '123';
      const result = await deleteFarmer(farmerId);

      expect(deleteRequest).toHaveBeenCalledWith(`/api/farmer/delete/${farmerId}`);
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error when deletion fails', async () => {
      const mockResponse = { ok: false };
      (deleteRequest as jest.Mock).mockResolvedValue(mockResponse);

      const farmerId = '123';
      await expect(deleteFarmer(farmerId)).rejects.toThrow('Failed to delete farmer');
    });
  });
});