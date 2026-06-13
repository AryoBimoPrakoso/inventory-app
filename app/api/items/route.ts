import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// Jika Anda ingin menyimpan file ke direktori lokal (public/uploads), pasang module fs & path bawaan Node.js
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    // 1. Mengubah pembacaan menjadi formData agar mendukung file biner dari FileInput
    const formData = await req.formData();

    // 2. Ekstraksi text fields & parsing tipe data yang sesuai
    const nomor = formData.get("nomor") as string | null;
    const nomorRevisi = formData.get("nomorRevisi") as string | null;
    
    // Pastikan jumlahHalaman di-parse ke Integer karena skema database mewajibkan Int
    const jumlahHalamanRaw = formData.get("jumlahHalaman");
    const jumlahHalaman = jumlahHalamanRaw ? parseInt(jumlahHalamanRaw as string, 10) : null;

    const stockValue = formData.get("stock");
    const stock = stockValue ? parseInt(stockValue as string, 10) : null;

    const nama = formData.get("nama") as string;
    const merk = formData.get("merk") as string | null;
    const type = formData.get("type") as string | null;
    const sn = formData.get("sn") as string | null;
    const kondisiSaatDiterima = formData.get("kondisiSaatDiterima") as string | null;
    const klasifikasi = formData.get("klasifikasi") as string | null;
    const hasilPengecekan = formData.get("hasilPengecekan") as string | null;
    const namaPemeriksa = formData.get("namaPemeriksa") as string | null;
    const nomorInventaris = formData.get("nomorInventaris") as string | null;
    const lokasi = formData.get("lokasi") as string | null;
    const hasilInventaris = formData.get("hasilInventaris") as string | null;

    const parseDate = (key: string) => {
      const val = formData.get(key);
      return val ? new Date(val as string) : null;
    };

    const item = await prisma.item.create({
      data: {
        nomor,
        tanggalTerbit: parseDate("tanggalTerbit"),
        nomorRevisi,
        jumlahHalaman,
        nama,
        merk,
        type,
        sn,
        tanggalPembelian: parseDate("tanggalPembelian"),
        tanggalTerimaBarang: parseDate("tanggalTerimaBarang"),
        kondisiSaatDiterima,
        klasifikasi,
        tanggalPengecekan: parseDate("tanggalPengecekan"),
        hasilPengecekan,
        namaPemeriksa,
        tanggalInventaris: parseDate("tanggalInventaris"),
        nomorInventaris,
        lokasi,
        hasilInventaris,
        stock,
        tanggalPemeliharaanKalibrasi: parseDate("tanggalPemeliharaanKalibrasi"),
      },
    });

    // 4. Proses File Attachment (jika ada file yang diunggah)
    const uploadedFiles = formData.getAll("files") as File[];
    
    if (uploadedFiles && uploadedFiles.length > 0 && uploadedFiles[0].size > 0) {
      for (const file of uploadedFiles) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Tentukan lokasi penyimpanan file (misal: dimasukkan ke folder public/uploads/)
        // Buat folder 'uploads' di dalam folder 'public' Anda terlebih dahulu
        const filename = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
        const filePath = path.join(process.cwd(), "public/uploads", filename);

        // Tulis file ke penyimpanan server lokal
        await writeFile(filePath, buffer);

        // Hubungkan data attachment ke Item ID yang baru saja dibuat (Relasi Prisma Cascade)
        await prisma.attachment.create({
          data: {
            fileName: file.name,
            filePath: `/uploads/${filename}`,
            itemId: item.id, // ID referensi ke model Item
          },
        });
      }
    }

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Error creating item:", error);

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
    // Sekaligus lakukan include attachments agar ketika data ditarik, file lampirannya ikut terbawa
    const items = await prisma.item.findMany({
      include: {
        attachments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);

    return NextResponse.json(
      { message: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}