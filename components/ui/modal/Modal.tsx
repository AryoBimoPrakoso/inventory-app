"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Mencegah halaman utama di belakangnya bisa di-scroll saat modal aktif
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    // Menggunakan z-[9999] dan w-screen h-screen penuh untuk mengisolasi backdrop dari kebocoran layout
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 h-screen w-screen overflow-hidden">
      
      {/* Backdrop Gelap - Pastikan menggunakan fixed inset-0 dan bg-black dengan opacity tinggi */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Konten Kotak Modal */}
      <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-10">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Modal */}
        <div className="p-6 overflow-y-auto space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}