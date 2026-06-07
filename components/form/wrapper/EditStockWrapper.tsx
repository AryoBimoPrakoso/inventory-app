import React from "react";
import BuyInformation from "../form-elements/BuyInformation";
import ProductIdentification from "../form-elements/ProductIdentification";
import FormFileInput from "../form-elements/FormFileInput";
import Button from "@/components/ui/button/Button";

interface propsEditWrapper {
  handleSubmit: any;
  formData: any;
  handleChange: any;
  setSelectedFiles: (files: FileList | null) => void;
  selectedItem: any;
  setIsModalOpen: (value: boolean) => void;
  loading: boolean;
  modalMode: "create" | "detail" | "edit" | "pemeriksaan";
}

export default function EditStockWrapper({
  handleSubmit,
  formData,
  handleChange,
  setSelectedFiles,
  selectedItem,
  setIsModalOpen,
  loading,
  modalMode,
}: propsEditWrapper) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-6">
          <BuyInformation formData={formData} onChange={handleChange} />
          <ProductIdentification formData={formData} onChange={handleChange} />
        </div>
        <div className="flex flex-col gap-6">
          <FormFileInput onFileChange={setSelectedFiles} />
          {selectedItem?.attachments?.length > 0 && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                File Lampiran Saat Ini:
              </p>
              <div className="space-y-1">
                {selectedItem.attachments.map((file: any) => (
                  <p
                    key={file.id}
                    className="text-xs text-gray-600 dark:text-gray-300 truncate"
                  >
                    📁 {file.fileName}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsModalOpen(false)}
        >
          Batal
        </Button>
        <Button type="submit" disabled={loading}>
          {loading
            ? "Menyimpan..."
            : modalMode === "edit"
              ? "Perbarui Data"
              : "Simpan Data"}
        </Button>
      </div>
    </form>
  );
}
