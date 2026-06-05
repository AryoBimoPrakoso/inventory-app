import Modal from "@/components/ui/modal/Modal";
import BuyInformation from "../form-elements/BuyInformation";
import ProductIdentification from "../form-elements/ProductIdentification";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";

interface StockInput {
  formData: any;
  onChange: (field: string, value: any) => void;
  onSubmit: any;
  loading: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export default function CreateStockWrapper({
  formData,
  onChange,
  onSubmit,
  loading,
  setIsModalOpen
}: StockInput) {
  return (
    <form onSubmit={onSubmit}>
      <ComponentCard title="Tambah Produk">
        <ProductIdentification formData={formData} onChange={onChange} />
        <BuyInformation formData={formData} onChange={onChange} />
      </ComponentCard>
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
