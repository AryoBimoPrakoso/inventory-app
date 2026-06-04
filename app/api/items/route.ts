import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const item = await prisma.item.create({
      data: {
        nomor: body.nomor,
        tanggalTerbit: body.tanggalTerbit
          ? new Date(body.tanggalTerbit)
          : null,
        nomorRevisi: body.nomorRevisi,
        jumlahHalaman: body.jumlahHalaman,

        nama: body.nama,
        merk: body.merk,
        type: body.type,
        sn: body.sn,

        tanggalPembelian: body.tanggalPembelian
          ? new Date(body.tanggalPembelian)
          : null,

        tanggalTerimaBarang: body.tanggalTerimaBarang
          ? new Date(body.tanggalTerimaBarang)
          : null,

        kondisiSaatDiterima: body.kondisiSaatDiterima,
        klasifikasi: body.klasifikasi,

        tanggalPengecekan: body.tanggalPengecekan
          ? new Date(body.tanggalPengecekan)
          : null,

        hasilPengecekan: body.hasilPengecekan,
        namaPemeriksa: body.namaPemeriksa,

        tanggalInventaris: body.tanggalInventaris
          ? new Date(body.tanggalInventaris)
          : null,

        nomorInventaris: body.nomorInventaris,
        lokasi: body.lokasi,

        hasilInventaris: body.hasilInventaris,

        tanggalPemeliharaanKalibrasi:
          body.tanggalPemeliharaanKalibrasi
            ? new Date(body.tanggalPemeliharaanKalibrasi)
            : null,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Gagal membuat data",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    const items = await prisma.item.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}