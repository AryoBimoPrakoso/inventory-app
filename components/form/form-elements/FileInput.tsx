"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import FileInput from "../input/FileInput";
import Label from "../Label";

export default function FileInputExample() {
  // State untuk menyimpan daftar file yang di-upload
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      // Menambahkan file baru ke dalam array state tanpa menghapus file sebelumnya
      setUploadedFiles((prevFiles) => [...prevFiles, file]);
      
      // Reset input value agar user bisa upload file dengan nama yang sama berturut-turut jika dibutuhkan
      event.target.value = "";
    }
  };

  // Fungsi opsional jika Anda ingin memberikan fitur hapus file dari list
  const handleRemoveFile = (indexToRemove: number) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <ComponentCard title="Kelengkapan" className="h-max">
      <div className="mb-4">
        <Label>Upload file</Label>
        <FileInput onChange={handleFileChange} className="custom-class" />
      </div>

      {/* Bagian List Urutan File */}
      <div className="mt-4">
        <Label className="text-sm font-semibold mb-2 block">Daftar Dokumen Lampiran:</Label>
        
        {uploadedFiles.length === 0 ? (
          <p className="text-sm text-gray-400 italic">Belum ada file yang di-upload.</p>
        ) : (
          <ul className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <li 
                key={`${file.name}-${index}`} 
                className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200 text-sm"
              >
                <div className="flex items-center gap-2">
                  {/* Membuat urutan manual (1, 2, 3...) */}
                  <span className="font-medium text-gray-500">{index + 1}.</span>
                  <span className="text-gray-700 truncate max-w-[200px] lg:max-w-xs">
                    {file.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>

                {/* Tombol Hapus File */}
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1"
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ComponentCard>
  );
}