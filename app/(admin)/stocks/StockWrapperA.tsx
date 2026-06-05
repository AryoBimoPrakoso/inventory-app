"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Digunakan untuk refresh data server
import LetterHeadInput from "@/components/form/form-elements/LetterHeadInput";
import FileInput from "@/components/form/form-elements/FileInput";
import BuyInformation from "@/components/form/form-elements/BuyInformation";
import ProductIdentification from "@/components/form/form-elements/ProductIdentification";
import CheckInput from "@/components/form/form-elements/CheckInput";
import InventoryForm from "@/components/form/form-elements/InventoryForm";
import Button from "@/components/ui/button/Button";
import ComponentCard from "@/components/common/ComponentCard";
import Modal from "@/components/ui/modal/Modal";
import { Trash2, Plus, Eye, Edit } from "lucide-react";
import CreateProductWrapper from "@/components/form/wrapper/CreateStockWrapper";
import StockTable from "@/components/common/table/StockTable";
import DetailCardStock from "@/components/common/card/DetailCardStock";

interface ClientProps {
  initialItems: any[];
}

export default function StockInventaris({ initialItems }: ClientProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "detail" | "edit">("create");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const initialFormState = {
    nomor: "", tanggalTerbit: "", nomorRevisi: "", jumlahHalaman: null as number | null,
    nama: "", merk: "", type: "", sn: "",
    tanggalPembelian: "", tanggalTerimaBarang: "", kondisiSaatDiterima: "", klasifikasi: "",
    tanggalPengecekan: "", hasilPengecekan: "", namaPemeriksa: "",
    tanggalInventaris: "", nomorInventaris: "", lokasi: "", tanggalPemeliharaanKalibrasi: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOpenCreate = () => {
    setModalMode("create");
    setSelectedItem(null);
    setFormData(initialFormState);
    setSelectedFiles(null);
    setIsModalOpen(true);
  };

  const handleOpenDetail = (item: any) => {
    setSelectedItem(item);
    setModalMode("detail");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setSelectedItem(item);
    setModalMode("edit");
    
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
        router.refresh(); // Memicu server component untuk mengambil data ulang lewat Prisma
      }
    } catch (error) {
      console.error(error);
    }
  };

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

      const url = modalMode === "edit" ? `/api/items/${selectedItem.id}` : "/api/items";
      const method = modalMode === "edit" ? "PUT" : "POST";

      const response = await fetch(url, { method: method, body: dataToSend });
      
      if (response.ok) {
        alert(modalMode === "edit" ? "Data inventaris berhasil diperbarui!" : "Data inventaris berhasil disimpan!");
        setFormData(initialFormState);
        setSelectedFiles(null);
        setIsModalOpen(false);
        router.refresh(); // Memicu server component untuk mengambil data terbaru dari database
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
    <>
      {/* Tombol diletakkan di wrapper agar sinkron dengan state open modal */}
      <div className="flex justify-end -mt-14 mb-8">
        <Button onClick={handleOpenCreate} className="flex items-center gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" /> Tambah Barang Baru
        </Button>
      </div>

      {/* DYNAMIC MODAL */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={
          modalMode === "create" ? "Form Input Inventaris Baru" : 
          modalMode === "edit" ? `Edit Data Barang: ${selectedItem?.nama}` : 
          `Detail Spesifikasi: ${selectedItem?.nama}`
        }
      >
        {modalMode === "create" ? (
          <CreateProductWrapper formData={formData} onChange={handleChange} onSubmit={handleSubmit} setIsModalOpen={setIsModalOpen} loading={loading}/>
        ) : modalMode === "edit" ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex flex-col gap-6">
                <LetterHeadInput formData={formData} onChange={handleChange} />
                <BuyInformation formData={formData} onChange={handleChange} />
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
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Batal</Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Menyimpan..." : modalMode === "edit" ? "Perbarui Data" : "Simpan Data"}
              </Button>
            </div>
          </form>
        ) : (
          <DetailCardStock selectedItem={selectedItem} setIsModalOpen={setIsModalOpen}/>
        )}
      </Modal>

      <StockTable initialItems={initialItems} handleDelete={handleDelete} handleOpenDetail={handleOpenDetail} handleOpenEdit={handleOpenEdit}/>
    </>
  );
}