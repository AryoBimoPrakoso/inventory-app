"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import DatePicker from "@/components/form/date-picker";

interface LetterHeadInputProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export default function LetterHeadInput({ formData, onChange }: LetterHeadInputProps) {
  return (
    <ComponentCard title="Kop Surat">
      <div className="space-y-6">
        <div>
          <Label>Nomor</Label>
          <Input 
            type="text" 
            value={formData.nomor || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("nomor", e.target.value)}
          />
        </div>
        <div>
          <DatePicker
            id="tanggalTerbit"
            label="Tanggal Terbit"
            placeholder="Pilih Tanggal"
            onChange={(dates, currentDateString) => {
              onChange("tanggalTerbit", currentDateString);
            }}
          />
        </div>
        <div>
          <Label>Nomor Revisi</Label>
          <Input 
            type="text" 
            value={formData.nomorRevisi || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange("nomorRevisi", e.target.value)}
          />
        </div>
        <div>
          <Label>Jumlah Halaman</Label>
          <Input 
            type="number" 
            value={formData.jumlahHalaman ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const val = e.target.value;
              onChange("jumlahHalaman", val === "" ? null : Number(val));
            }}
          />
        </div>
      </div>
    </ComponentCard>
  );
}