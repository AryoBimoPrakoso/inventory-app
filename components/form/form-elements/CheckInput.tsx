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
}

export default function CheckInput({ formData, onChange }: CheckInputProps) {
  // Opsi Hasil Pengecekan yang dipindahkan
  const hasilPengecekanOptions = [
    { value: "baik", label: "Baik" },
    { value: "perlu-diperbaiki", label: "Perlu Diperbaiki" },
    { value: "rusak", label: "Rusak" },
  ];

  return (
    <ComponentCard title="Pemeriksaan">
      <div className="space-y-6">
        <div>
          <DatePicker
            id="tanggalPengecekan"
            label="Tanggal Pengecekan"
            placeholder="Pilih Tanggal"
            onChange={(dates, currentDateString) => {
              onChange("tanggalPengecekan", currentDateString);
            }}
          />
        </div>

        {/* Pindahan dari Inventaris Form & Diubah menjadi Select */}
        <div>
          <Label>Hasil Pengecekan</Label>
          <div className="relative">
            <Select
              options={hasilPengecekanOptions}
              placeholder="Pilih Hasil Pemeriksaan"
              onChange={(value: string) => onChange("hasilPengecekan", value)}
              className="dark:bg-dark-900"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>

        <div>
          <Label>Nama Pemeriksa</Label>
          <Input 
            type="text" 
            value={formData.namaPemeriksa || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("namaPemeriksa", e.target.value)}
          />
        </div>
      </div>
    </ComponentCard>
  );
}