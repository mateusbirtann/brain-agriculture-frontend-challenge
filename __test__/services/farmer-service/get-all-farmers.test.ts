import { FarmerService } from '@/services/farmer-service';
import { FarmerDataMock } from '@/__mock__/farmerDataMock';

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    farmer: {
      findMany: jest.fn(),
    },
    $transaction: jest.fn(),
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

  describe('getAllFarmers', () => {
    it('should return all farmers with their crops', async () => {
      const mockFarmersData = FarmerDataMock.map(farmer => ({
        ...farmer,
        crops: farmer.crops.map(crop => ({ crop: { name: crop } }))
      }));

      (mockDb.farmer.findMany as jest.Mock).mockResolvedValue(mockFarmersData);

      const result = await farmerService.getAllFarmers();

      expect(mockDb.farmer.findMany).toHaveBeenCalledWith({
        include: {
          crops: {
            include: {
              crop: true,
            },
          },
        },
      });

      expect(result).toEqual(FarmerDataMock);
    });

    it('should return an empty array when no farmers are found', async () => {
      (mockDb.farmer.findMany as jest.Mock).mockResolvedValue([]);

      const result = await farmerService.getAllFarmers();

      expect(mockDb.farmer.findMany).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should throw an error when the database query fails', async () => {
      const errorMessage = 'Database error';
      (mockDb.farmer.findMany as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(farmerService.getAllFarmers()).rejects.toThrow('Failed to fetch farmers');

      expect(mockDb.farmer.findMany).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching farmers:', expect.any(Error));
    });
  });
});