"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Label from "../Label";
import DatePicker from "@/components/form/date-picker";
import Select from "../Select";
import { ChevronDownIcon } from "lucide-react";

interface PurchaseInputProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export default function BuyInformation({ formData, onChange }: PurchaseInputProps) {
  // Opsi untuk Kondisi Saat Diterima
  const kondisiOptions = [
    { value: "baru", label: "Baru" },
    { value: "bekas", label: "Bekas" },
  ];

  // Opsi untuk Klasifikasi Alat (bisa Anda tambahkan opsinya di sini sesuai kebutuhan)
  const klasifikasiOptions = [
    { value: "artefak", label: "Artefak" },
    { value: "perlengkapan-kantor", label: "Perlengkapan Kantor" },
    { value: "alat-standar-ruang-lingkup", label: "Alat Standar Ruang Lingkup" },
    { value: "lain-lain", label: "Lain-lain" },
  ];

  return (
    <ComponentCard title="Informasi Pembelian">
      <div className="space-y-6">
        <div>
          <DatePicker
            id="tanggalPembelian"
            label="Tanggal Pembelian"
            placeholder="Pilih Tanggal"
            onChange={(dates, currentDateString) => {
              onChange("tanggalPembelian", currentDateString);
            }}
          />
        </div>
        <div>
          <DatePicker
            id="tanggalTermaBarang"
            label="Tanggal Terima Barang"
            placeholder="Pilih Tanggal"
            onChange={(dates, currentDateString) => {
              onChange("tanggalTerimaBarang", currentDateString);
            }}
          />
        </div>
        
        {/* Mengubah Kondisi Saat Diterima menjadi Select */}
        <div>
          <Label>Kondisi Saat Diterima</Label>
          <div className="relative">
            <Select
              options={kondisiOptions}
              placeholder="Pilih Kondisi"
              onChange={(value: string) => onChange("kondisiSaatDiterima", value)}
              className="dark:bg-dark-900"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>

        {/* Mengubah Klasifikasi Alat menjadi Select */}
        <div>
          <Label>Klasifikasi Alat</Label>
          <div className="relative">
            <Select
              options={klasifikasiOptions}
              placeholder="Pilih Klasifikasi"
              onChange={(value: string) => onChange("klasifikasi", value)}
              className="dark:bg-dark-900"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}