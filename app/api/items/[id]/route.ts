import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { unlink, writeFile } from "fs/promises";
import path from "path";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // 1. Ubah tipe data params menjadi Promise
) {
  try {
    // 2. Unwrapped params menggunakan await terlebih dahulu
    const resolvedParams = await params;
    const itemId = resolvedParams.id;

    if (!itemId) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    // 3. Cari berkas lampiran (attachments) yang terkait dengan item ini jika ada
    const attachments = await prisma.attachment.findMany({
      where: { itemId: itemId },
    });

    // 4. Hapus berkas fisik dari folder public/uploads di server lokal
    for (const file of attachments) {
      try {
        const absolutePath = path.join(process.cwd(), "public", file.filePath);
        await unlink(absolutePath);
      } catch (err) {
        console.error("Gagal menghapus file fisik di server:", err);
      }
    }

    // 5. Hapus relasi attachment di database
    await prisma.attachment.deleteMany({
      where: { itemId: itemId },
    });

    // 6. Hapus item utama dari database
    await prisma.item.delete({
      where: { id: itemId },
    });

    return NextResponse.json({ message: "Data inventaris berhasil dihapus" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json(
      { message: "Gagal menghapus data dari database" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const itemId = resolvedParams.id;

    if (!itemId) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    const formData = await req.formData();

    // 1. Ekstraksi text fields & parsing tipe data
    const nomor = formData.get("nomor") as string | null;
    const nomorRevisi = formData.get("nomorRevisi") as string | null;
    
    const jumlahHalamanRaw = formData.get("jumlahHalaman");
    const jumlahHalaman = jumlahHalamanRaw ? parseInt(jumlahHalamanRaw as string, 10) : null;

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

    const parseDate = (key: string) => {
      const val = formData.get(key);
      return val ? new Date(val as string) : null;
    };

    // 2. Perbarui record Item utama di database
    const updatedItem = await prisma.item.update({
      where: { id: itemId },
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
        tanggalPemeliharaanKalibrasi: parseDate("tanggalPemeliharaanKalibrasi"),
      },
    });

    // 3. Proses Berkas Lampiran Baru (jika ada file baru yang diunggah)
    const uploadedFiles = formData.getAll("files") as File[];
    
    if (uploadedFiles && uploadedFiles.length > 0 && uploadedFiles[0].size > 0) {
      for (const file of uploadedFiles) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filename = `${Date.now()}-${file.name.replaceAll(" ", "_")}`;
        const filePath = path.join(process.cwd(), "public/uploads", filename);

        await writeFile(filePath, buffer);

        await prisma.attachment.create({
          data: {
            fileName: file.name,
            filePath: `/uploads/${filename}`,
            itemId: updatedItem.id,
          },
        });
      }
    }

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.error("Error updating item:", error);
    return NextResponse.json(
      { message: "Gagal memperbarui data" },
      { status: 500 }
    );
  }
}