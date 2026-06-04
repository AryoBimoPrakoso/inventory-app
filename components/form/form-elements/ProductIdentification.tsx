"use client";
import Label from '../Label';
import Input from '../input/InputField';
import DatePicker from '@/components/form/date-picker';
import ComponentCard from '@/components/common/ComponentCard';

export default function ProductIdentification() {
  return (
    <ComponentCard title="Identitas Barang">
      <div className="space-y-6">
        <div>
          <Label>Nama</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>Merk</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>Type</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>SN</Label>
          <Input type="text" />
        </div>
      </div>
    </ComponentCard>
  );
}
