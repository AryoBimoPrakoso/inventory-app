"use client";
import React, { useState } from "react";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import {
  ChevronDown,
  EyeClosed,
  Eye,
  ChevronDownIcon,
  EyeIcon,
} from "lucide-react";
import DatePicker from "@/components/form/date-picker";
import ComponentCard from "@/components/common/ComponentCard";

export default function PurchaseInput() {
  const optionsConditions = [
    { value: "baru", label: "Baru" },
    { value: "bekas", label: "Bekas" },
  ];
  const optionsClassifications = [
    { value: "perlengkapan-kantor", label: "Perlengkapan kantor" },
    { value: "alat-standar-ruang-lingkup", label: "Alat standar ruang lingkup" },
    { value: "artefak", label: "Artefak" },
    { value: "lain-lain", label: "Lain-lain" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };
  return (
    <ComponentCard title="Informasi Pembelian">
      <div className="space-y-6">
        <div>
          <DatePicker
            id="date-picker"
            label="Tanggal Pembelian"
            placeholder="Pilih Tanggal"
            onChange={(dates, currentDateString) => {
              // Handle your logic
              console.log({ dates, currentDateString });
            }}
          />
        </div>
        <div>
          <DatePicker
            id="date-picker"
            label="Tanggal Terima Barang"
            placeholder="Pilih Tanggal"
            onChange={(dates, currentDateString) => {
              // Handle your logic
              console.log({ dates, currentDateString });
            }}
          />
        </div>
        <div>
          <Label>Kondisi saat Diterima</Label>
          <div className="relative">
            <Select
              options={optionsConditions}
              placeholder="Pilih"
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>
      </div>
      <div>
        <div>
          <Label>Kondisi saat Diterima</Label>
          <div className="relative">
            <Select
              options={optionsClassifications}
              placeholder="Pilih"
              onChange={handleSelectChange}
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
