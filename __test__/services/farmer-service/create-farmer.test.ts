import { FarmerService } from '@/services/farmer-service';
import { Farmer, Crops } from '@/types';

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    $transaction: jest.fn(),
    farmer: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
    crop: {
      upsert: jest.fn(),
    },
    farmerCrops: {
      create: jest.fn(),
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

  describe('createFarmer', () => {
    it('should create a new farmer with crops', async () => {
      const newFarmerData: Omit<Farmer, 'id'> = {
        cpfCnpj: '12345678901',
        name: 'New Farmer',
        farmName: 'New Farm',
        city: 'New City',
        state: 'NS',
        totalArea: 1000,
        arableArea: 800,
        vegetationArea: 200,
        crops: [Crops.Soja, Crops.Milho],
      };

      const createdFarmer = { id: 'new-id', ...newFarmerData };
      const mockCrops = newFarmerData.crops.map(crop => ({ id: `crop-${crop}`, name: crop }));

      (mockDb.$transaction as jest.Mock).mockImplementation(async (callback) => {
        (mockDb.farmer.create as jest.Mock).mockResolvedValue({ id: 'new-id', ...newFarmerData });
        mockCrops.forEach(crop => {
          (mockDb.crop.upsert as jest.Mock).mockResolvedValueOnce(crop);
        });
        (mockDb.farmer.findUnique as jest.Mock).mockResolvedValue({
          ...createdFarmer,
          crops: mockCrops.map(crop => ({ crop })),
        });

        return callback(mockDb);
      });

      const result = await farmerService.createFarmer(newFarmerData);

      expect(mockDb.$transaction).toHaveBeenCalled();
      expect(mockDb.farmer.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          cpfCnpj: newFarmerData.cpfCnpj,
          name: newFarmerData.name,
          farmName: newFarmerData.farmName,
          city: newFarmerData.city,
          state: newFarmerData.state,
          totalArea: newFarmerData.totalArea,
          arableArea: newFarmerData.arableArea,
          vegetationArea: newFarmerData.vegetationArea,
        }),
      });

      newFarmerData.crops.forEach(crop => {
        expect(mockDb.crop.upsert).toHaveBeenCalledWith({
          where: { name: crop },
          update: {},
          create: { name: crop },
        });
      });

      expect(mockDb.farmerCrops.create).toHaveBeenCalledTimes(newFarmerData.crops.length);

      expect(mockDb.farmer.findUnique).toHaveBeenCalledWith({
        where: { id: 'new-id' },
        include: { crops: { include: { crop: true } } },
      });

      expect(result).toEqual(createdFarmer);
    });

    it('should throw an error when the database operation fails', async () => {
      const newFarmerData: Omit<Farmer, 'id'> = {
        cpfCnpj: '12345678901',
        name: 'New Farmer',
        farmName: 'New Farm',
        city: 'New City',
        state: 'NS',
        totalArea: 1000,
        arableArea: 800,
        vegetationArea: 200,
        crops: [Crops.Soja, Crops.Milho],
      };

      const errorMessage = 'Database error';
      (mockDb.$transaction as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(farmerService.createFarmer(newFarmerData)).rejects.toThrow('Failed to create farmer');

      expect(mockDb.$transaction).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error creating farmer:', expect.any(Error));
    });
  });
});