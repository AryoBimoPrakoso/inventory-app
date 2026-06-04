"use client";

import { useState, useEffect } from "react";
import LetterHeadInput from "@/components/form/form-elements/LetterHeadInput";
import FileInput from "@/components/form/form-elements/FileInput";
import PurchaseInput from "@/components/form/form-elements/BuyInformation";
import ProductIdentification from "@/components/form/form-elements/ProductIdentification";
import CheckInput from "@/components/form/form-elements/CheckInput";
import InventoryForm from "@/components/form/form-elements/InventoryForm";
import Button from "@/components/ui/button/Button";
import ComponentCard from "@/components/common/ComponentCard";
import Modal from "@/components/ui/modal/Modal";
import { Trash2, Plus, Eye, Edit } from "lucide-react"; 

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Mendukung 3 mode modal: 'create', 'detail', dan 'edit'
  const [modalMode, setModalMode] = useState<"create" | "detail" | "edit">("create");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Initial form state untuk mempermudah reset
  const initialFormState = {
    nomor: "", tanggalTerbit: "", nomorRevisi: "", jumlahHalaman: null as number | null,
    nama: "", merk: "", type: "", sn: "",
    tanggalPembelian: "", tanggalTerimaBarang: "", kondisiSaatDiterima: "", klasifikasi: "",
    tanggalPengecekan: "", hasilPengecekan: "", namaPemeriksa: "",
    tanggalInventaris: "", nomorInventaris: "", lokasi: "", tanggalPemeliharaanKalibrasi: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  const fetchItems = async () => {
    try {
      setFetchLoading(true);
      const response = await fetch("/api/items");
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOpenCreate = () => {
    setModalMode("create");
    setSelectedItem(null);
    setFormData(initialFormState); // Reset form menjadi kosong
    setSelectedFiles(null);
    setIsModalOpen(true);
  };

  const handleOpenDetail = (item: any) => {
    setSelectedItem(item);
    setModalMode("detail");
    setIsModalOpen(true);
  };

  // Fungsi Pemicu Mode Edit (Mengisi form dengan data lama dari database)
  const handleOpenEdit = (item: any) => {
    setSelectedItem(item);
    setModalMode("edit");
    
    // Konversi objek Date dari DB ke format string YYYY-MM-DD agar dibaca oleh DatePicker
    const formatDate = (dateStr: string | null) => {
      if (!dateStr) return "";
      return new Date(dateStr).toISOString().split("T")[0];
    };

    setFormData({
      nomor: item.nomor || "",
      tanggalTerbit: formatDate(item.tanggalTerbit),
      nomorRevisi: item.nomorRevisi || "",
      jumlahHalaman: item.jumlahHalaman,
      nama: item.nama || "",
      merk: item.merk || "",
      type: item.type || "",
      sn: item.sn || "",
      tanggalPembelian: formatDate(item.tanggalPembelian),
      tanggalTerimaBarang: formatDate(item.tanggalTerimaBarang),
      kondisiSaatDiterima: item.kondisiSaatDiterima || "",
      klasifikasi: item.klasifikasi || "",
      tanggalPengecekan: formatDate(item.tanggalPengecekan),
      hasilPengecekan: item.hasilPengecekan || "",
      namaPemeriksa: item.namaPemeriksa || "",
      tanggalInventaris: formatDate(item.tanggalInventaris),
      nomorInventaris: item.nomorInventaris || "",
      lokasi: item.lokasi || "",
      tanggalPemeliharaanKalibrasi: formatDate(item.tanggalPemeliharaanKalibrasi),
    });
    setSelectedFiles(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, namaBarang: string) => {
    const konfirmasi = confirm(`Apakah Anda yakin ingin menghapus "${namaBarang}"?`);
    if (!konfirmasi) return;

    try {
      const response = await fetch(`/api/items/${id}`, { method: "DELETE" });
      if (response.ok) {
        alert("Data berhasil dihapus!");
        fetchItems();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handler Submit Tunggal (Bisa membedakan Create POST atau Edit PUT)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) dataToSend.append(key, value.toString());
      });
      if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) dataToSend.append("files", selectedFiles[i]);
      }

      // Tentukan URL dan HTTP Method berdasarkan mode modal
      const url = modalMode === "edit" ? `/api/items/${selectedItem.id}` : "/api/items";
      const method = modalMode === "edit" ? "PUT" : "POST";

      const response = await fetch(url, { method: method, body: dataToSend });
      
      if (response.ok) {
        alert(modalMode === "edit" ? "Data inventaris berhasil diperbarui!" : "Data inventaris berhasil disimpan!");
        setFormData(initialFormState);
        setSelectedFiles(null);
        setIsModalOpen(false);
        fetchItems();
      } else {
        const errorData = await response.json();
        alert(`Gagal: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateString = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <div className="space-y-6 w-full pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Master Stocks Inventaris</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Kelola dan pantau seluruh aset logistik barang</p>
        </div>
        <Button onClick={handleOpenCreate} className="flex items-center gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" /> Tambah Barang Baru
        </Button>
      </div>

      {/* DYNAMIC MODAL (FORM CREATE, FORM EDIT, ATAU VIEW DETAIL) */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={
          modalMode === "create" ? "Form Input Inventaris Baru" : 
          modalMode === "edit" ? `Edit Data Barang: ${selectedItem?.nama}` : 
          `Detail Spesifikasi: ${selectedItem?.nama}`
        }
      >
        {modalMode === "create" || modalMode === "edit" ? (
          /* KONDISI FORM (DIGUNAKAN BERSAMA OLEH CREATE & EDIT) */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex flex-col gap-6">
                <LetterHeadInput formData={formData} onChange={handleChange} />
                <PurchaseInput formData={formData} onChange={handleChange} />
                <InventoryForm formData={formData} onChange={handleChange} />
              </div>
              <div className="flex flex-col gap-6">
                <ProductIdentification formData={formData} onChange={handleChange} />
                <CheckInput formData={formData} onChange={handleChange} />
                <FileInput onFileChange={setSelectedFiles} />
                {modalMode === "edit" && selectedItem?.attachments?.length > 0 && (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">File Lampiran Saat Ini:</p>
                    <div className="space-y-1">
                      {selectedItem.attachments.map((file: any) => (
                        <p key={file.id} className="text-xs text-gray-600 dark:text-gray-300 truncate">📁 {file.fileName}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Menyimpan..." : modalMode === "edit" ? "Perbarui Data" : "Simpan Data"}
              </Button>
            </div>
          </form>
        ) : (
          /* KONDISI VIEW DETAIL (READ ONLY) */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                  <h3 className="font-bold text-sm text-gray-400 uppercase mb-3 tracking-wider">Kop Surat</h3>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-gray-500">Nomor:</span><span className="text-gray-900 dark:text-white font-medium">{selectedItem?.nomor || "-"}</span>
                    <span className="text-gray-500">Tanggal Terbit:</span><span className="text-gray-900 dark:text-white font-medium">{formatDateString(selectedItem?.tanggalTerbit)}</span>
                    <span className="text-gray-500">Nomor Revisi:</span><span className="text-gray-900 dark:text-white font-medium">{selectedItem?.nomorRevisi || "-"}</span>
                    <span className="text-gray-500">Jumlah Halaman:</span><span className="text-gray-900 dark:text-white font-medium">{selectedItem?.jumlahHalaman || "-"}</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                  <h3 className="font-bold text-sm text-gray-400 uppercase mb-3 tracking-wider">Informasi Pembelian</h3>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-gray-500">Tanggal Pembelian:</span><span className="text-gray-900 dark:text-white font-medium">{formatDateString(selectedItem?.tanggalPembelian)}</span>
                    <span className="text-gray-500">Tanggal Terima:</span><span className="text-gray-900 dark:text-white font-medium">{formatDateString(selectedItem?.tanggalTerimaBarang)}</span>
                    <span className="text-gray-500">Kondisi Diterima:</span><span className="capitalize text-gray-900 dark:text-white font-medium">{selectedItem?.kondisiSaatDiterima || "-"}</span>
                    <span className="text-gray-500">Klasifikasi Alat:</span><span className="capitalize text-gray-900 dark:text-white font-medium">{selectedItem?.klasifikasi || "-"}</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                  <h3 className="font-bold text-sm text-gray-400 uppercase mb-3 tracking-wider">Inventarisasi</h3>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-gray-500">Tanggal Inventaris:</span><span className="text-gray-900 dark:text-white font-medium">{formatDateString(selectedItem?.tanggalInventaris)}</span>
                    <span className="text-gray-500">Nomor Inventaris:</span><span className="text-gray-900 dark:text-white font-medium font-mono">{selectedItem?.nomorInventaris || "-"}</span>
                    <span className="text-gray-500">Lokasi Penempatan:</span><span className="text-gray-900 dark:text-white font-medium">{selectedItem?.lokasi || "-"}</span>
                    <span className="text-gray-500">Jadwal Kalibrasi:</span><span className="text-gray-900 dark:text-white font-medium">{formatDateString(selectedItem?.tanggalPemeliharaanKalibrasi)}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                  <h3 className="font-bold text-sm text-gray-400 uppercase mb-3 tracking-wider">Identitas Barang</h3>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-gray-500">Nama Alat:</span><span className="text-gray-900 dark:text-white font-semibold">{selectedItem?.nama}</span>
                    <span className="text-gray-500">Merk Pembuat:</span><span className="text-gray-900 dark:text-white font-medium">{selectedItem?.merk || "-"}</span>
                    <span className="text-gray-500">Type / Model:</span><span className="text-gray-900 dark:text-white font-medium">{selectedItem?.type || "-"}</span>
                    <span className="text-gray-500">Serial Number (S/N):</span><span className="text-gray-900 dark:text-white font-mono font-medium">{selectedItem?.sn || "-"}</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                  <h3 className="font-bold text-sm text-gray-400 uppercase mb-3 tracking-wider">Hasil Pemeriksaan</h3>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <span className="text-gray-500">Tanggal Cek:</span><span className="text-gray-900 dark:text-white font-medium">{formatDateString(selectedItem?.tanggalPengecekan)}</span>
                    <span className="text-gray-500">Nama Pemeriksa:</span><span className="text-gray-900 dark:text-white font-medium">{selectedItem?.namaPemeriksa || "-"}</span>
                    <span className="text-gray-500">Kondisi Kelayakan:</span>
                    <div>
                      <span className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
                        selectedItem?.hasilPengecekan === "baik" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                        selectedItem?.hasilPengecekan === "perlu-diperbaiki" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" :
                        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}>
                        {selectedItem?.hasilPengecekan || "Tidak Diketahui"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                  <h3 className="font-bold text-sm text-gray-400 uppercase mb-3 tracking-wider">Berkas Lampiran</h3>
                  {selectedItem?.attachments && selectedItem.attachments.length > 0 ? (
                    <div className="space-y-1.5 mt-2">
                      {selectedItem.attachments.map((file: any) => (
                        <a key={file.id} href={file.filePath} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-500 hover:underline text-sm truncate">
                          📁 {file.fileName}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">Tidak ada berkas yang diunggah</span>
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
        )}
      </Modal>

      {/* LIST TABEL DAFTAR DATA */}
      <ComponentCard title="Daftar Data Inventaris Aktif">
        <div className="overflow-x-auto w-full">
          {fetchLoading ? (
            <div className="text-center py-10 text-gray-500">Memuat data dari database...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-10 text-gray-500">Belum ada data inventaris ditemukan.</div>
          ) : (
            <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-4">Nama Alat</th>
                  <th className="px-6 py-4">Merk / Type</th>
                  <th className="px-6 py-4">No. Inventaris</th>
                  <th className="px-6 py-4">Lokasi</th>
                  <th className="px-6 py-4">Status Kelayakan</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {items.map((item) => (
                  <tr key={item.id} className="bg-white dark:bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{item.nama}</td>
                    <td className="px-6 py-4">{item.merk || "-"} / {item.type || "-"}</td>
                    <td className="px-6 py-4 font-mono text-xs">{item.nomorInventaris || "-"}</td>
                    <td className="px-6 py-4">{item.lokasi || "-"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        item.hasilPengecekan === "baik" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                        item.hasilPengecekan === "perlu-diperbaiki" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" :
                        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}>
                        {item.hasilPengecekan || "Tidak Diketahui"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center flex justify-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenDetail(item)}
                        className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4 inline" />
                      </button>
                      
                      {/* Tombol Edit Baru */}
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        className="text-amber-500 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                        title="Edit Data"
                      >
                        <Edit className="w-4 h-4 inline" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.nama)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                        title="Hapus Data"
                      >
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </ComponentCard>
    </div>
  );
}