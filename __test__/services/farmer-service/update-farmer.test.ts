import { FarmerService } from '@/services/farmer-service';
import { FarmerDataMock } from '@/__mock__/farmerDataMock';
import { Farmer, CropType } from '@/types';

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    $transaction: jest.fn(),
    farmer: {
      update: jest.fn(),
      findUnique: jest.fn(),
    },
    farmerCrops: {
      deleteMany: jest.fn(),
      create: jest.fn(),
    },
    crop: {
      upsert: jest.fn(),
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

  describe('editFarmer', () => {
    it('should update an existing farmer and their crops', async () => {
      const existingFarmer = FarmerDataMock[0];
      const updatedFarmerData: Omit<Farmer, 'id'> = {
        ...existingFarmer,
        name: 'Updated Farmer Name',
        totalArea: 2500,
        crops: [CropType.Soja, CropType.CanaDeAcucar],
      };

      const updatedFarmer = { id: existingFarmer.id, ...updatedFarmerData };
      const mockCrops = updatedFarmerData.crops.map(crop => ({ id: `crop-${crop}`, name: crop }));

      (mockDb.$transaction as jest.Mock).mockImplementation(async (callback) => {
        (mockDb.farmer.update as jest.Mock).mockResolvedValue(updatedFarmer);
        (mockDb.farmerCrops.deleteMany as jest.Mock).mockResolvedValue({ count: existingFarmer.crops.length });
        mockCrops.forEach(crop => {
          (mockDb.crop.upsert as jest.Mock).mockResolvedValueOnce(crop);
        });
        (mockDb.farmerCrops.create as jest.Mock).mockResolvedValue({ farmerId: existingFarmer.id, cropId: expect.any(String) });
        (mockDb.farmer.findUnique as jest.Mock).mockResolvedValue({
          ...updatedFarmer,
          crops: mockCrops.map(crop => ({ crop })),
        });

        return callback(mockDb);
      });

      const result = await farmerService.editFarmer(existingFarmer.id, updatedFarmerData);

      expect(mockDb.$transaction).toHaveBeenCalled();
      expect(mockDb.farmer.update).toHaveBeenCalledWith({
        where: { id: existingFarmer.id },
        data: expect.objectContaining({
          name: updatedFarmerData.name,
          totalArea: updatedFarmerData.totalArea,
        }),
      });

      expect(mockDb.farmerCrops.deleteMany).toHaveBeenCalledWith({
        where: { farmerId: existingFarmer.id },
      });

      updatedFarmerData.crops.forEach(crop => {
        expect(mockDb.crop.upsert).toHaveBeenCalledWith({
          where: { name: crop },
          update: {},
          create: { name: crop },
        });
      });

      expect(mockDb.farmerCrops.create).toHaveBeenCalledTimes(updatedFarmerData.crops.length);

      expect(mockDb.farmer.findUnique).toHaveBeenCalledWith({
        where: { id: existingFarmer.id },
        include: { crops: { include: { crop: true } } },
      });

      expect(result).toEqual(updatedFarmer);
    });

    it('should throw an error when the database operation fails', async () => {
      const existingFarmer = FarmerDataMock[0];
      const updatedFarmerData: Omit<Farmer, 'id'> = {
        ...existingFarmer,
        name: 'Updated Farmer Name',
      };

      const errorMessage = 'Database error';
      (mockDb.$transaction as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(farmerService.editFarmer(existingFarmer.id, updatedFarmerData)).rejects.toThrow('Failed to edit farmer');

      expect(mockDb.$transaction).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error editing farmer:', expect.any(Error));
    });
  });
});