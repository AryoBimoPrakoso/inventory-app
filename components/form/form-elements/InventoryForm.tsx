"use client";
import Label from "../Label";
import Input from "../input/InputField";
import DatePicker from "@/components/form/date-picker";
import ComponentCard from "@/components/common/ComponentCard";
import Select from "../Select";
import { ChevronDownIcon } from "lucide-react";

export default function InventoryForm() {
  const optionsFixing = [
    { value: "berfungsi-baik", label: "Berfungsi Baik" },
    { value: "perlu-diperbaiki", label: "Perlu Diperbaiki" },
    { value: "rusak", label: "Rusak" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };
  return (
    <ComponentCard title="Inventaris">
      <div className="space-y-6">
        <div>
          <DatePicker
            id="date-picker"
            label="Tanggal Inventaris"
            placeholder="Pilih Tanggal"
            onChange={(dates, currentDateString) => {
              // Handle your logic
              console.log({ dates, currentDateString });
            }}
          />
        </div>
        <div>
          <Label>Nomor Inventaris</Label>
          <Input type="number" />
        </div>
        <div>
          <Label>Lokasi</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>Hasil</Label>
          <div className="relative">
            <Select
              options={optionsFixing}
              placeholder="Pilih"
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>
        <div>
          <DatePicker
            id="date-picker"
            label="Tanggal Pemeliharaan/Kalibrasi"
            placeholder="Pilih Tanggal"
            onChange={(dates, currentDateString) => {
              // Handle your logic
              console.log({ dates, currentDateString });
            }}
          />
        </div>
      </div>
    </ComponentCard>
  );
}
