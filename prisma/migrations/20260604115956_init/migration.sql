-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nomor" TEXT,
    "tanggalTerbit" DATETIME,
    "nomorRevisi" TEXT,
    "jumlahHalaman" INTEGER,
    "nama" TEXT NOT NULL,
    "merk" TEXT,
    "type" TEXT,
    "sn" TEXT,
    "tanggalPembelian" DATETIME,
    "tanggalTerimaBarang" DATETIME,
    "kondisiSaatDiterima" TEXT,
    "klasifikasi" TEXT,
    "tanggalPengecekan" DATETIME,
    "hasilPengecekan" TEXT,
    "namaPemeriksa" TEXT,
    "tanggalInventaris" DATETIME,
    "nomorInventaris" TEXT,
    "lokasi" TEXT,
    "hasilInventaris" TEXT,
    "tanggalPemeliharaanKalibrasi" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Attachment_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
