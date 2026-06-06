"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import InputFile from "../input/FileInput";
import Label from "../Label";

interface FileInputProps {
  onFileChange: (files: FileList | null) => void;
}

export default function FormFileInput({ onFileChange }: FileInputProps) {
  // State untuk menyimpan daftar file yang di-upload
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Fungsi helper untuk mengubah Array File menjadi FileList dan mengirim ke parent
  const updateParentFiles = (filesArray: File[]) => {
    if (filesArray.length === 0) {
      onFileChange(null);
      return;
    }

    // Menggunakan DataTransfer API untuk membuat tiruan objek FileList
    const dataTransfer = new DataTransfer();
    filesArray.forEach((file) => {
      dataTransfer.items.add(file);
    });
    
    // Kirim FileList ke parent component
    onFileChange(dataTransfer.files);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    
    if (files && files.length > 0) {
      // Mengubah FileList dari input menjadi array biasa
      const newFilesArray = Array.from(files);

      // Gabungkan file lama dengan file baru (mengizinkan penambahan bertahap)
      const updatedFilesList = [...uploadedFiles, ...newFilesArray];
      
      setUploadedFiles(updatedFilesList);
      updateParentFiles(updatedFilesList);

      // Reset input value agar user bisa upload file dengan nama yang sama berturut-turut
      event.target.value = "";
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    const updatedFilesList = uploadedFiles.filter((_, index) => index !== indexToRemove);
    
    setUploadedFiles(updatedFilesList);
    updateParentFiles(updatedFilesList);
  };

  return (
    <ComponentCard title="Kelengkapan" className="h-max">
      <div className="mb-4">
        <Label htmlFor="attachments">Upload file</Label>
        <InputFile 
          id="attachments" 
          onChange={handleFileChange} 
          multiple // Izinkan upload banyak file sekaligus jika perlu
        />
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