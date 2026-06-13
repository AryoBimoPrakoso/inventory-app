import Button from "@/components/ui/button/Button";
import { formatCategory } from "@/utils/formatCategory";
import { formatDateString } from "@/utils/formatDateString";

interface DetailProps {
    selectedItem? : any | null,
    setIsModalOpen: (value: boolean) => void;
}

export default function DetailCardStock({ selectedItem, setIsModalOpen }: DetailProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-sm text-gray-400 uppercase mb-3 tracking-wider">
              Kop Surat
            </h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-gray-500">Nomor:</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {selectedItem?.nomor || "-"}
              </span>
              <span className="text-gray-500">Tanggal Terbit:</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {formatDateString(selectedItem?.tanggalTerbit)}
              </span>
              <span className="text-gray-500">Nomor Revisi:</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {selectedItem?.nomorRevisi || "-"}
              </span>
              <span className="text-gray-500">Jumlah Halaman:</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {selectedItem?.jumlahHalaman || "-"}
              </span>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-sm text-gray-400 uppercase mb-3 tracking-wider">
              Informasi Pembelian
            </h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-gray-500">Tanggal Pembelian:</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {formatDateString(selectedItem?.tanggalPembelian)}
              </span>
              <span className="text-gray-500">Tanggal Terima:</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {formatDateString(selectedItem?.tanggalTerimaBarang)}
              </span>
              <span className="text-gray-500">Kondisi Diterima:</span>
              <span className="capitalize text-gray-900 dark:text-white font-medium">
                {formatCategory(selectedItem?.kondisiSaatDiterima || "-")}
              </span>
              <span className="text-gray-500">Klasifikasi Alat:</span>
              <span className="capitalize text-gray-900 dark:text-white font-medium">
                {formatCategory(selectedItem?.klasifikasi || "-")}
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-sm text-gray-400 uppercase mb-3 tracking-wider">
              Identitas Barang
            </h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-gray-500">Nama Alat:</span>
              <span className="text-gray-900 dark:text-white font-semibold">
                {selectedItem?.nama}
              </span>
              <span className="text-gray-500">Merk Pembuat:</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {selectedItem?.merk || "-"}
              </span>
              <span className="text-gray-500">Type / Model:</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {selectedItem?.type || "-"}
              </span>
              <span className="text-gray-500">Serial Number (S/N):</span>
              <span className="text-gray-900 dark:text-white font-mono font-medium">
                {selectedItem?.sn || "-"}
              </span>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-sm text-gray-400 uppercase mb-3 tracking-wider">
              Hasil Pemeriksaan
            </h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-gray-500">Tanggal Cek:</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {formatDateString(selectedItem?.tanggalPengecekan)}
              </span>
              <span className="text-gray-500">Nama Pemeriksa:</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {selectedItem?.namaPemeriksa || "-"}
              </span>
              <span className="text-gray-500">Kondisi Kelayakan:</span>
              <div>
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
                    selectedItem?.hasilPengecekan === "baik"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : selectedItem?.hasilPengecekan === "perlu-diperbaiki"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {formatCategory(selectedItem?.hasilPengecekan || "Tidak Diketahui")}
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-sm text-gray-400 uppercase mb-3 tracking-wider">
              Berkas Lampiran
            </h3>
            {selectedItem?.attachments &&
            selectedItem.attachments.length > 0 ? (
              <div className="space-y-1.5 mt-2">
                {selectedItem.attachments.map((file: any) => (
                  <a
                    key={file.id}
                    href={file.filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-500 hover:underline text-sm truncate"
                  >
                    📁 {file.fileName}
                  </a>
                ))}
              </div>
            ) : (
              <span className="text-gray-400 text-sm">
                Tidak ada berkas yang diunggah
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-800">
        <Button type="button" onClick={() => setIsModalOpen(false)}>
          Tutup Detail
        </Button>
      </div>
    </div>
  );
}
