"use client";

import Label from "../Label";
import Input from "../input/InputField";
import DatePicker from "@/components/form/date-picker";
import ComponentCard from "@/components/common/ComponentCard";

interface InventoryFormProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export default function InventoryForm({ formData, onChange }: InventoryFormProps) {
  return (
    <ComponentCard title="Inventaris">
      <div className="space-y-6">
        <div>
          <DatePicker
            id="tanggalInventaris"
            label="Tanggal Inventaris"
            placeholder="Pilih Tanggal"
            onChange={(dates, currentDateString) => {
              onChange("tanggalInventaris", currentDateString);
            }}
          />
        </div>
        <div>
          <Label>Nomor Inventaris</Label>
          <Input 
            type="text" 
            value={formData.nomorInventaris || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("nomorInventaris", e.target.value)}
          />
        </div>
        <div>
          <Label>Lokasi</Label>
          <Input 
            type="text" 
            value={formData.lokasi || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("lokasi", e.target.value)}
          />
        </div>
        
        {/* Input Hasil Pengecekan telah dihapus/dipindahkan dari komponen ini */}

        <div>
          <DatePicker
            id="tanggalPemeliharaanKalibrasi"
            label="Tanggal Pemeliharaan/Kalibrasi"
            placeholder="Pilih Tanggal"
            onChange={(dates, currentDateString) => {
              onChange("tanggalPemeliharaanKalibrasi", currentDateString);
            }}
          />
        </div>
      </div>
    </ComponentCard>
  );
}