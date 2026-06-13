-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nomor" TEXT,
    "tanggalTerbit" DATETIME,
    "nomorRevisi" TEXT,
    "jumlahHalaman" INTEGER,
    "nama" TEXT NOT NULL,
    "merk" TEXT,
    "type" TEXT,
    "sn" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "minimum_stock" INTEGER NOT NULL DEFAULT 0,
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
INSERT INTO "new_Item" ("createdAt", "hasilInventaris", "hasilPengecekan", "id", "jumlahHalaman", "klasifikasi", "kondisiSaatDiterima", "lokasi", "merk", "nama", "namaPemeriksa", "nomor", "nomorInventaris", "nomorRevisi", "sn", "stock", "tanggalInventaris", "tanggalPembelian", "tanggalPemeliharaanKalibrasi", "tanggalPengecekan", "tanggalTerbit", "tanggalTerimaBarang", "type", "updatedAt") SELECT "createdAt", "hasilInventaris", "hasilPengecekan", "id", "jumlahHalaman", "klasifikasi", "kondisiSaatDiterima", "lokasi", "merk", "nama", "namaPemeriksa", "nomor", "nomorInventaris", "nomorRevisi", "sn", "stock", "tanggalInventaris", "tanggalPembelian", "tanggalPemeliharaanKalibrasi", "tanggalPengecekan", "tanggalTerbit", "tanggalTerimaBarang", "type", "updatedAt" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
