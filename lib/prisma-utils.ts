import { PrismaClient, Crop } from '@prisma/client';
import { Crops, CropsMapping } from '@/types';

export async function upsertCrop(prisma: PrismaClient, crop: Crops): Promise<Crop> {
  const cropType = CropsMapping[crop];
  return prisma.crop.upsert({
    where: { name: cropType },
    update: {},
    create: { name: cropType },
  });
}

export async function createFarmerCrops(
  prisma: PrismaClient,
  farmerId: string,
  crops: Crop[]
): Promise<void> {
  await Promise.all(
    crops.map((crop) =>
      prisma.farmerCrops.create({
        data: {
          farmerId,
          cropId: crop.id,
        },
      })
    )
  );
}