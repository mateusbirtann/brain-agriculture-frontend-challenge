import { FarmerService } from '@/services/farmer-service';
import { FarmerDataMock } from '@/__mock__/farmerDataMock';

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    $transaction: jest.fn(),
    farmerCrops: {
      deleteMany: jest.fn(),
    },
    farmer: {
      delete: jest.fn(),
    },
  },
}));

import mockDb from '@/lib/prisma';

describe('FarmerService', () => {
  let farmerService: FarmerService;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    farmerService = new FarmerService();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('deleteFarmer', () => {
    it('should delete a farmer and their crop associations', async () => {
      const farmerIdToDelete = FarmerDataMock[0].id;

      (mockDb.$transaction as jest.Mock).mockImplementation(async (callback) => {
        (mockDb.farmerCrops.deleteMany as jest.Mock).mockResolvedValue({ count: 2 });
        (mockDb.farmer.delete as jest.Mock).mockResolvedValue({ id: farmerIdToDelete });

        return callback(mockDb);
      });

      await farmerService.deleteFarmer(farmerIdToDelete);

      expect(mockDb.$transaction).toHaveBeenCalled();
      expect(mockDb.farmerCrops.deleteMany).toHaveBeenCalledWith({
        where: { farmerId: farmerIdToDelete },
      });
      expect(mockDb.farmer.delete).toHaveBeenCalledWith({
        where: { id: farmerIdToDelete },
      });
    });

    it('should throw an error when the database operation fails', async () => {
      const farmerIdToDelete = FarmerDataMock[0].id;
      const errorMessage = 'Database error';

      (mockDb.$transaction as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(farmerService.deleteFarmer(farmerIdToDelete)).rejects.toThrow('Failed to delete farmer');

      expect(mockDb.$transaction).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error deleting farmer:', expect.any(Error));
    });

    it('should handle the case when no farmer is found to delete', async () => {
      const nonExistentFarmerId = 'non-existent-id';

      (mockDb.$transaction as jest.Mock).mockImplementation(async (callback) => {
        (mockDb.farmerCrops.deleteMany as jest.Mock).mockResolvedValue({ count: 0 });
        (mockDb.farmer.delete as jest.Mock).mockRejectedValue(new Error('Farmer not found'));

        return callback(mockDb);
      });

      await expect(farmerService.deleteFarmer(nonExistentFarmerId)).rejects.toThrow('Failed to delete farmer');

      expect(mockDb.$transaction).toHaveBeenCalled();
      expect(mockDb.farmerCrops.deleteMany).toHaveBeenCalledWith({
        where: { farmerId: nonExistentFarmerId },
      });
      expect(mockDb.farmer.delete).toHaveBeenCalledWith({
        where: { id: nonExistentFarmerId },
      });
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error deleting farmer:', expect.any(Error));
    });
  });
});