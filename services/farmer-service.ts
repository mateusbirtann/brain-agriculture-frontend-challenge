import db from '@/lib/prisma';
import { Farmer, Crop } from '@/types';

export class FarmerService {
  async getAllFarmers(): Promise<Farmer[]> {
    try {
      const farmersWithCrops = await db.farmer.findMany({
        include: {
          crops: {
            include: {
              crop: true
            }
          }
        }
      });

      return this.mapFarmersData(farmersWithCrops);
    } catch (error) {
      console.error('Error fetching farmers:', error);
      throw new Error('Failed to fetch farmers');
    }
  }

  async createFarmer(farmerData: Omit<Farmer, 'id'>): Promise<Farmer> {
    const { crops, ...rest } = farmerData;

    try {
      const newFarmer = await db.$transaction(async (prisma) => {
        const farmer = await prisma.farmer.create({
          data: rest,
        });

        const cropPromises = crops.map(async (crop) => {
          return prisma.crop.upsert({
            where: { name: crop },
            update: {},
            create: { name: crop },
          });
        });
        const existingCrops = await Promise.all(cropPromises);

        await Promise.all(existingCrops.map((crop) =>
          prisma.farmerCrops.create({
            data: {
              farmerId: farmer.id,
              cropId: crop.id,
            },
          })
        ));

        return prisma.farmer.findUnique({
          where: { id: farmer.id },
          include: { crops: { include: { crop: true } } },
        });
      });

      return this.mapFarmerData(newFarmer);
    } catch (error) {
      console.error('Error creating farmer:', error);
      throw new Error('Failed to create farmer');
    }
  }

  async editFarmer(id: string, farmerData: Omit<Farmer, 'id'>): Promise<Farmer> {
    const { crops, ...rest } = farmerData;

    try {
      const updatedFarmer = await db.$transaction(async (prisma) => {
        const farmer = await prisma.farmer.update({
          where: { id },
          data: rest,
        });

        await prisma.farmerCrops.deleteMany({
          where: { farmerId: id },
        });

        const cropPromises = crops.map(async (crop) => {
          return prisma.crop.upsert({
            where: { name: crop },
            update: {},
            create: { name: crop },
          });
        });
        const existingCrops = await Promise.all(cropPromises);

        await Promise.all(existingCrops.map((crop) =>
          prisma.farmerCrops.create({
            data: {
              farmerId: farmer.id,
              cropId: crop.id,
            },
          })
        ));

        return prisma.farmer.findUnique({
          where: { id: farmer.id },
          include: { crops: { include: { crop: true } } },
        });
      });

      return this.mapFarmerData(updatedFarmer);
    } catch (error) {
      console.error('Error editing farmer:', error);
      throw new Error('Failed to edit farmer');
    }
  }

  async deleteFarmer(id: string): Promise<void> {
    try {
      await db.$transaction(async (prisma) => {
        await prisma.farmerCrops.deleteMany({
          where: { farmerId: id },
        });

        await prisma.farmer.delete({
          where: { id },
        });
      });
    } catch (error) {
      console.error('Error deleting farmer:', error);
      throw new Error('Failed to delete farmer');
    }
  }

  private mapFarmersData(farmersData: any[]): Farmer[] {
    return farmersData.map((farmerData) => this.mapFarmerData(farmerData));
  }

  private mapFarmerData(farmerData: any): Farmer {
    return {
      ...farmerData,
      crops: this.extractCropNames(farmerData.crops),
    };
  }

  private extractCropNames(farmerCrops: Array<{ crop: { name: Crop } }>): Crop[] {
    return farmerCrops.map(farmerCrop => farmerCrop.crop.name);
  }
}

export const farmerService = new FarmerService();