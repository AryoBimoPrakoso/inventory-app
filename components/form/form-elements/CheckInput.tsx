"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import DatePicker from "@/components/form/date-picker";
import Select from "../Select";
import { ChevronDownIcon } from "lucide-react";

interface CheckInputProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  namaOptions: { value: string; label: string }[];
}

export default function CheckInput({
  formData,
  onChange,
  namaOptions,
}: CheckInputProps) {
  const hasilPengecekanOptions = [
    { value: "baik", label: "Baik" },
    { value: "perlu-diperbaiki", label: "Perlu Diperbaiki" },
    { value: "rusak", label: "Rusak" },
  ];

  return (
    <ComponentCard title="Pemeriksaan">
      <div className="space-y-6">
        {/* SELECT NAMA DATA */}
        <div>
          <Label>Nama Data / Produk</Label>
          <div className="relative">
            <Select
              options={namaOptions}
              // GANTI dari formData.namaId menjadi formData.itemId agar sinkron dengan state parent
              defaultValue={formData.itemId || ""}
              placeholder="Pilih Nama Data"
              // SINKRONKAN field target menjadi "itemId"
              onChange={(value: string) => onChange("itemId", value)}
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>

        {/* TANGGAL PENGECEKAN */}
        <div>
          <DatePicker
            id="tanggalPengecekan"
            label="Tanggal Pengecekan"
            placeholder="Pilih Tanggal"
            defaultDate={formData.tanggalPengecekan || ""}
            onChange={(dates, currentDateString) => {
              onChange("tanggalPengecekan", currentDateString);
            }}
          />
        </div>

        {/* HASIL PENGECEKAN */}
        <div>
          <Label>Hasil Pengecekan</Label>
          <div className="relative">
            <Select
              options={hasilPengecekanOptions}
              placeholder="Pilih Hasil Pemeriksaan"
              defaultValue={formData.hasilPengecekan || ""}
              onChange={(value: string) => onChange("hasilPengecekan", value)}
              className="dark:bg-dark-900"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>

        {/* NAMA PEMERIKSA */}
        <div>
          <Label>Nama Pemeriksa</Label>
          <Input
            type="text"
            placeholder="Masukkan nama pemeriksa"
            value={formData.namaPemeriksa || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange("namaPemeriksa", e.target.value)
            }
          />
        </div>
      </div>
    </ComponentCard>
  );
}
