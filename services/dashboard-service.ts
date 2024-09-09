import db from '@/lib/prisma';
import { DashboardData, FarmsByState, FarmsByCrop, LandUse } from '@/types';

export class DashboardService {
  async getDashboardData(): Promise<DashboardData> {
    try {
      const [
        totalFarms,
        totalArea,
        farmsByState,
        farmsByCrop,
        landUse
      ] = await Promise.all([
        this.getTotalFarms(),
        this.getTotalArea(),
        this.getFarmsByState(),
        this.getFarmsByCrop(),
        this.getLandUse()
      ]);

      return {
        totalFarms,
        totalHectares: totalArea,
        farmsByState,
        farmsByCrop,
        landUse
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw new Error('Failed to fetch dashboard data');
    }
  }

  private async getTotalFarms(): Promise<number> {
    return db.farmer.count();
  }

  private async getTotalArea(): Promise<number> {
    const result = await db.farmer.aggregate({
      _sum: {
        totalArea: true
      }
    });
    return result._sum.totalArea || 0;
  }

  private async getFarmsByState(): Promise<FarmsByState[]> {
    const result = await db.farmer.groupBy({
      by: ['state'],
      _count: {
        _all: true
      }
    });
    return result.map(item => ({
      state: item.state,
      count: item._count._all
    }));
  }

  private async getFarmsByCrop(): Promise<FarmsByCrop[]> {
    const result = await db.crop.findMany({
      select: {
        name: true,
        _count: {
          select: {
            farmers: true
          }
        }
      }
    });
    return result.map(item => ({
      name: item.name,
      count: item._count.farmers
    }));
  }

  private async getLandUse(): Promise<LandUse> {
    const result = await db.farmer.aggregate({
      _sum: {
        arableArea: true,
        vegetationArea: true
      }
    });
    return {
      arableArea: result._sum.arableArea || 0,
      vegetationArea: result._sum.vegetationArea || 0
    };
  }
}

export const dashboardService = new DashboardService();