import { NextRequest, NextResponse } from 'next/server';
import { farmerService } from '@/services/farmer-service';
import { revalidatePath } from 'next/cache';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await farmerService.deleteFarmer(id);

    revalidatePath('/dashboard/farmers', 'page');
    revalidatePath('/dashboard', 'page');

    return NextResponse.json(
      { revalidated: true, message: 'Farmer deletado com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Erro interno do servidor, ${error}` },
      { status: 500 }
    );
  }
}