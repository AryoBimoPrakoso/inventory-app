import { formatCategory } from "@/utils/formatCategory";
import ComponentCard from "../ComponentCard";
import { Eye, Edit, Trash2 } from "lucide-react";

type propsTable = {
  initialItems: any[];
  handleOpenDetail: (item: any) => void;
  handleOpenEdit: (item: any) => void;
  handleDelete: (id: string, nama: string) => void;
};

export default function StockTable({
  initialItems,
  handleOpenDetail,
  handleOpenEdit,
  handleDelete,
}: propsTable) {
  return (
    <ComponentCard title="Daftar Data Inventaris Aktif">
      <div className="overflow-x-auto w-full">
        {initialItems.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Belum ada data inventaris ditemukan.
          </div>
        ) : (
          <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4">Nama Alat</th>
                <th className="px-6 py-4">Merk / Type</th>
                <th className="px-6 py-4">No Seri</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Status Kelayakan</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {initialItems.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.nama}
                  </td>
                  <td className="px-6 py-4">
                    {item.merk || "-"} / {item.type || "-"}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">
                    {item.sn || "-"}
                  </td>
                  <td className="px-6 py-4">
                    {formatCategory(item.klasifikasi || "-")}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.hasilPengecekan === "baik"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : item.hasilPengecekan === "perlu-diperbaiki"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {formatCategory(
                        item.hasilPengecekan || "Tidak Diketahui",
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenDetail(item)}
                      className="text-blue-500 border border-blue-700 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    >
                      Detail
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(item)}
                      className="text-amber-500 border border-amber-700 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id, item.nama)}
                      className="text-red-500 border border-red-700 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </ComponentCard>
  );
}
