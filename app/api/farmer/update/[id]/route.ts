import { NextRequest, NextResponse } from 'next/server';
import { farmerSchema, FarmerData } from '@/schemas/farmerSchema';
import { z } from 'zod';
import { farmerService } from '@/services/farmer-service';
import { revalidatePath } from 'next/cache';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();

    const validatedData: FarmerData = farmerSchema.parse(body);

    const updatedFarmer = await farmerService.editFarmer(id, validatedData);
    
    revalidatePath('/dashboard/farmers', 'page');
    revalidatePath('/dashboard', 'page');

    return NextResponse.json({ revalidated: true, updatedFarmer }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}