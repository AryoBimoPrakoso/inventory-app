import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const item = await prisma.item.findUnique({
    where: {
      id,
    },
  });

  return NextResponse.json(item);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const item = await prisma.item.update({
      where: {
        id,
      },
      data: {
        nama: body.nama,
        merk: body.merk,
        type: body.type,
        sn: body.sn,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Gagal update data",
      },
      {
        status: 500,
      }
    );
  }
}