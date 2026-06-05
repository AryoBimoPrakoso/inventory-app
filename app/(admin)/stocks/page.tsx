// app/inventaris/page.tsx (Atau lokasi page Anda)
import { prisma } from "@/lib/prisma"; // Sesuaikan path prisma client Anda
import StockInventaris from "./StockWrapperA";
import Button from "@/components/ui/button/Button";
import { Plus } from "lucide-react";

// Mengatur agar halaman selalu mengambil data terbaru (Dynamic Rendering)
export const revalidate = 0;

async function getInventoryItems() {
  try {
    const items = await prisma.item.findMany({
      include: {
        attachments: true, // Sesuaikan dengan relasi schema Prisma Anda jika ada
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
    // Serialisasi objek Date agar aman dikirim dari Server ke Client Component
    return JSON.parse(JSON.stringify(items));
  } catch (error) {
    console.error("Gagal mengambil data dari database:", error);
    return [];
  }
}

export default async function Page() {
  const initialItems = await getInventoryItems();

  return (
    <div className="space-y-6 w-full pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Master Stocks Inventaris</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Kelola dan pantau seluruh aset logistik barang</p>
        </div>
      </div>

      {/* Oper data dari Prisma langsung ke Client Wrapper */}
      <StockInventaris initialItems={initialItems} />
    </div>
  );
}