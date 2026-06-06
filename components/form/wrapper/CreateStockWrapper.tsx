import Modal from "@/components/ui/modal/Modal";
import BuyInformation from "../form-elements/BuyInformation";
import ProductIdentification from "../form-elements/ProductIdentification";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import FormFileInput from "../form-elements/FormFileInput";

interface StockInput {
  formData: any;
  onChange: (field: string, value: any) => void;
  onSubmit: any;
  loading: boolean;
  setIsModalOpen: (value: boolean) => void;
  setSelectedFiles: (files: FileList | null) => void;
}

export default function CreateStockWrapper({
  formData,
  onChange,
  onSubmit,
  loading,
  setIsModalOpen,
  setSelectedFiles,
}: StockInput) {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <ProductIdentification formData={formData} onChange={onChange} />
          <BuyInformation formData={formData} onChange={onChange} />
        </div>
        <FormFileInput onFileChange={setSelectedFiles} />
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
          {loading ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </form>
  );
}
