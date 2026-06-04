"use client";
import Label from '../Label';
import Input from '../input/InputField';
import DatePicker from '@/components/form/date-picker';
import ComponentCard from '@/components/common/ComponentCard';

export default function LetterHeadInput() {
  return (
    <ComponentCard title="Kop Surat">
      <div className="space-y-6">
        <div>
          <Label>Nomor</Label>
          <Input type="number" />
        </div>
        <div>
          <DatePicker
            id="date-picker"
            label="Tanggal Terbit"
            placeholder="Pilih tanggal"
            onChange={(dates, currentDateString) => {
              // Handle your logic
              console.log({ dates, currentDateString });
            }}
          />
        </div>
        <div>
          <Label>Nomor Revisi</Label>
          <Input type="number" />
        </div>
        <div>
          <Label>Jumlah Halaman</Label>
          <Input type="number" />
        </div>

      </div>
    </ComponentCard>
  );
}
