import LetterHeadInput from "@/components/form/form-elements/LetterHeadInput";
import FileInput from "@/components/form/form-elements/FileInput";
import PurchaseInput from "@/components/form/form-elements/BuyInformation";
import ProductIdentification from "@/components/form/form-elements/ProductIdentification";
import CheckInput from "@/components/form/form-elements/CheckInput";
import InventoryForm from "@/components/form/form-elements/InventoryForm";
export default function page() {
  return (
    <div className="flex w-full gap-4">
      <div className="flex flex-col w-full gap-4">
        <LetterHeadInput />
        <PurchaseInput />
        <InventoryForm/>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <ProductIdentification />
        <CheckInput/>
        <FileInput />
      </div>
    </div>
  );
}
