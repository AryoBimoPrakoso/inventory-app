"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";

interface ProductIdentificationProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export default function ProductIdentification({
  formData,
  onChange,
}: ProductIdentificationProps) {
  return (
    <ComponentCard title="Identifikasi Produk">
      <div className="space-y-6">
        <div>
          <Label>Nama Alat/Fasilitas/Sistem</Label>
          <Input
            type="text"
            value={formData.nama || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange("nama", e.target.value)
            }
          />
        </div>
        <div>
          <Label>Jumlah Barang</Label>
          <Input
            type="text"
            value={formData.stock ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange("stock", e.target.value.replace(/\D/g, ""))
            }
          />
        </div>
        <div>
          <Label>Merk/Pabrik Pembuat</Label>
          <Input
            type="text"
            value={formData.merk || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange("merk", e.target.value)
            }
          />
        </div>
        <div>
          <Label>Type/Model</Label>
          <Input
            type="text"
            value={formData.type || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange("type", e.target.value)
            }
          />
        </div>
        <div>
          <Label>Nomor Seri (S/N)</Label>
          <Input
            type="text"
            value={formData.sn || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange("sn", e.target.value)
            }
          />
        </div>
      </div>
    </ComponentCard>
  );
}
