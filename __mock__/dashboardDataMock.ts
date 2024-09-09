import { CropType, Farmer } from '../types/index';
import { FarmerDataMock } from './farmerDataMock';

export const mockDb = {
  farmer: {
    count: () => {
      return FarmerDataMock.length;
    },

    aggregate: (params: any) => {
      if (params._sum) {
        const result: any = { _sum: {} };
        for (const key in params._sum) {
          result._sum[key] = FarmerDataMock.reduce((sum, farmer) => sum + (farmer as any)[key], 0);
        }
        return result;
      }
      return {};
    },

    groupBy: (params: any) => {
      if (params.by && params.by.includes('state')) {
        const groupedByState = FarmerDataMock.reduce((acc, farmer) => {
          acc[farmer.state] = (acc[farmer.state] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        return Object.entries(groupedByState).map(([state, count]) => ({
          state,
          _count: { _all: count }
        }));
      }
      return [];
    }
  },

  crop: {
    findMany: (params: any) => {
      if (params.select && params.select.name && params.select._count?.select?.farmers) {
        const cropCounts = FarmerDataMock.reduce((acc, farmer) => {
          farmer.crops.forEach(crop => {
            acc[crop] = (acc[crop] || 0) + 1;
          });
          return acc;
        }, {} as Record<CropType, number>);

        return Object.entries(cropCounts).map(([name, count]) => ({
          name,
          _count: { farmers: count }
        }));
      }
      return [];
    }
  }
};

export async function getMockNumbers() {
  const totalFarms = await mockDb.farmer.count();

  const totalArea = await mockDb.farmer.aggregate({
    _sum: {
      totalArea: true
    }
  });
  const totalHectares = totalArea._sum.totalArea || 0;

  const farmsByState = await mockDb.farmer.groupBy({
    by: ['state'],
    _count: {
      _all: true
    }
  });

  const farmsByCrop = await mockDb.crop.findMany({
    select: {
      name: true,
      _count: {
        select: {
          farmers: true
        }
      }
    }
  });

  const landUse = await mockDb.farmer.aggregate({
    _sum: {
      arableArea: true,
      vegetationArea: true
    }
  });

  return {
    totalFarms,
    totalHectares,
    farmsByState,
    farmsByCrop,
    landUse
  };
}