"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CheckInput from "@/components/form/form-elements/CheckInput";
import Button from "@/components/ui/button/Button";
import Modal from "@/components/ui/modal/Modal";
import { Plus, Toolbox, ArrowRightLeft } from "lucide-react";
import CreateProductWrapper from "@/components/form/wrapper/CreateStockWrapper";
import StockTable from "@/components/common/table/StockTable";
import DetailCardStock from "@/components/common/card/DetailCardStock";
import EditStockWrapper from "@/components/form/wrapper/EditStockWrapper";

interface ClientProps {
  initialItems: any[];
}

export default function StockWrapper({ initialItems }: ClientProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<
    "create" | "detail" | "edit" | "pemeriksaan"
  >("create");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const initialFormState = {
    itemId: "", 
    nomor: "",
    tanggalTerbit: "",
    nomorRevisi: "",
    jumlahHalaman: null as number | null,
    nama: "",
    merk: "",
    type: "",
    sn: "",
    stock: 0,
    minimum_stock: 0,
    tanggalPembelian: "",
    tanggalTerimaBarang: "",
    kondisiSaatDiterima: "",
    klasifikasi: "",
    tanggalPengecekan: "",
    hasilPengecekan: "",
    namaPemeriksa: "",
    tanggalInventaris: "",
    nomorInventaris: "",
    lokasi: "",
    tanggalPemeliharaanKalibrasi: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const namaOptions = initialItems.map((item) => ({
    value: item.id, 
    label: item.nama,
  }));

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => {
      const updatedForm = { ...prev, [field]: value };

      if (field === "itemId" && modalMode === "pemeriksaan") {
        const barangTerpilih = initialItems.find((item) => item.id === value);

        if (barangTerpilih) {
          // Amankan seluruh data lama agar tidak menjadi string kosong/null saat PUT ke route.ts
          updatedForm.nomor = barangTerpilih.nomor || "";
          updatedForm.tanggalTerbit = barangTerpilih.tanggalTerbit ? new Date(barangTerpilih.tanggalTerbit).toISOString().split("T")[0] : "";
          updatedForm.nomorRevisi = barangTerpilih.nomorRevisi || "";
          updatedForm.jumlahHalaman = barangTerpilih.jumlahHalaman ?? null;
          updatedForm.nama = barangTerpilih.nama || "";
          updatedForm.merk = barangTerpilih.merk || "";
          updatedForm.type = barangTerpilih.type || "";
          updatedForm.stock = barangTerpilih.stock ?? 0;
          updatedForm.minimum_stock = barangTerpilih.minimum_stock ?? 0;
          updatedForm.sn = barangTerpilih.sn || "";
          updatedForm.tanggalPembelian = barangTerpilih.tanggalPembelian ? new Date(barangTerpilih.tanggalPembelian).toISOString().split("T")[0] : "";
          updatedForm.tanggalTerimaBarang = barangTerpilih.tanggalTerimaBarang ? new Date(barangTerpilih.tanggalTerimaBarang).toISOString().split("T")[0] : "";
          updatedForm.kondisiSaatDiterima = barangTerpilih.kondisiSaatDiterima || "";
          updatedForm.klasifikasi = barangTerpilih.klasifikasi || "";
          updatedForm.tanggalInventaris = barangTerpilih.tanggalInventaris ? new Date(barangTerpilih.tanggalInventaris).toISOString().split("T")[0] : "";
          updatedForm.nomorInventaris = barangTerpilih.nomorInventaris || "";
          updatedForm.lokasi = barangTerpilih.lokasi || "";
          updatedForm.tanggalPemeliharaanKalibrasi = barangTerpilih.tanggalPemeliharaanKalibrasi ? new Date(barangTerpilih.tanggalPemeliharaanKalibrasi).toISOString().split("T")[0] : "";

          // Set default field pemeriksaan
          updatedForm.tanggalPengecekan = new Date().toISOString().split("T")[0];
          updatedForm.hasilPengecekan = barangTerpilih.hasilPengecekan || "baik";
          updatedForm.namaPemeriksa = barangTerpilih.namaPemeriksa || "";
        }
      }

      return updatedForm;
    });
  };

  const handleOpenCreate = () => {
    setModalMode("create");
    setSelectedItem(null);
    setFormData(initialFormState);
    setSelectedFiles(null);
    setIsModalOpen(true);
  };

  const handleOpenChecking = () => {
    setModalMode("pemeriksaan");
    setSelectedItem(null);
    setFormData(initialFormState); 
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
      itemId: item.id || "",
      nomor: item.nomor || "",
      tanggalTerbit: formatDate(item.tanggalTerbit),
      nomorRevisi: item.nomorRevisi || "",
      jumlahHalaman: item.jumlahHalaman,
      nama: item.nama || "",
      merk: item.merk || "",
      type: item.type || "",
      stock: item.stock ?? 0,
      minimum_stock: item.minimum_stock ?? 0,
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
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi proteksi: Jangan biarkan submit berjalan jika id barang belum dipilih di mode pemeriksaan
    if (modalMode === "pemeriksaan" && !formData.itemId) {
      alert("Silakan pilih nama data / produk terlebih dahulu!");
      return;
    }

    setLoading(true);

    try {
      const dataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined)
          dataToSend.append(key, value.toString());
      });
      if (selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++)
          dataToSend.append("files", selectedFiles[i]);
      }

      let url = "/api/items";
      let method = "POST";

      if (modalMode === "edit") {
        url = `/api/items/${selectedItem?.id}`;
        method = "PUT";
      } else if (modalMode === "pemeriksaan") {
        url = `/api/items/${formData.itemId}`; 
        method = "PUT";
      }

      const response = await fetch(url, { method: method, body: dataToSend });

      if (response.ok) {
        alert(
          modalMode === "edit"
            ? "Data inventaris berhasil diperbarui!"
            : modalMode === "pemeriksaan"
              ? "Data pemeriksaan berhasil disimpan!"
              : "Data inventaris berhasil disimpan!",
        );
        setFormData(initialFormState);
        setSelectedFiles(null);
        setIsModalOpen(false);
        router.refresh();
      } else {
        // PERTAHANAN KUNCI: Cek Content-Type sebelum memanggil .json() agar tidak memicu SyntaxError
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          alert(`Gagal: ${errorData.message}`);
        } else {
          const rawText = await response.text();
          console.error("Server Error Response Raw:", rawText);
          alert(`Gagal dengan status HTTP ${response.status}. Hubungi backend / cek console log server.`);
        }
      }
    } catch (error) {
      console.error("Terjadi error pada client request:", error);
      alert("Terjadi kegagalan koneksi atau error internal browser.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-end gap-3 -mt-14 mb-8">
        <Button
          variant="secondary"
          onClick={handleOpenChecking}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <ArrowRightLeft className="w-4 h-4" /> Barang Masuk / Keluar
        </Button>
        <Button
          variant="outline"
          onClick={handleOpenChecking}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <Toolbox className="w-4 h-4" /> Cek Kelayakan Barang
        </Button>
        <Button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" /> Tambah Barang Baru
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          modalMode === "create"
            ? "Form Input Inventaris Baru"
            : modalMode === "edit"
              ? `Edit Data Barang: ${selectedItem?.nama}`
              : modalMode === "pemeriksaan"
                ? "Form Pemeriksaan Kondisi Barang"
                : `Detail Spesifikasi: ${selectedItem?.nama}`
        }
      >
        {modalMode === "create" ? (
          <CreateProductWrapper
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            setIsModalOpen={setIsModalOpen}
            loading={loading}
            setSelectedFiles={setSelectedFiles}
          />
        ) : modalMode === "edit" ? (
          <EditStockWrapper
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
            setSelectedFiles={setSelectedFiles}
            setIsModalOpen={setIsModalOpen}
            selectedItem={selectedItem}
            loading={loading}
            modalMode={modalMode}
          />
        ) : modalMode === "pemeriksaan" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <CheckInput
              formData={formData}
              onChange={handleChange}
              namaOptions={namaOptions}
            />
            <div className="flex justify-end gap-3 JSON">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Batal
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan Pemeriksaan"}
              </Button>
            </div>
          </form>
        ) : (
          <DetailCardStock
            selectedItem={selectedItem}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </Modal>

      <StockTable
        initialItems={initialItems}
        handleDelete={handleDelete}
        handleOpenDetail={handleOpenDetail}
        handleOpenEdit={handleOpenEdit}
      />
    </>
  );
} 