import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ProductInfo } from '../types';
import { THEMES } from '../constants';
import Icon from './Icon';

interface ProductInputFormProps {
  onGenerate: (productInfo: ProductInfo) => void;
  disabled: boolean;
  initialData?: ProductInfo | null;
}

const ProductInputForm: React.FC<ProductInputFormProps> = ({ onGenerate, disabled, initialData }) => {
  const [formData, setFormData] = useState<Omit<ProductInfo, 'productImage'>>({
    storeName: '',
    storeAddress: '',
    whatsappNumber: '',
    productName: '',
    productDescription: '',
    promoTheme: THEMES[0],
  });
  const [productImageFile, setProductImageFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData) {
        // Don't set the image, as we can't reconstruct the File object
        const { productImage, ...rest } = initialData;
        setFormData(rest);
        setProductImageFile(null);
        setFileName(initialData.productImage ? 'Gambar sebelumnya digunakan' : null);
    }
  }, [initialData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProductImageFile(file);
      setFileName(file.name);
    }
  };

  const fileToBase64 = (file: File): Promise<{ mimeType: string; data: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const base64Data = dataUrl.split(',')[1];
        resolve({ mimeType: file.type, data: base64Data });
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imagePart = null;
    if (productImageFile) {
        imagePart = await fileToBase64(productImageFile);
    } else if (initialData?.productImage) {
        // Use image from history if no new image is selected
        imagePart = initialData.productImage;
    }
    onGenerate({ ...formData, productImage: imagePart });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800/50 p-6 md:p-8 rounded-2xl border border-gray-700 shadow-2xl shadow-purple-900/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Nama Toko/UMKM" name="storeName" value={formData.storeName} onChange={handleChange} placeholder="Contoh: Kopi Kenangan" required />
        <InputField label="Alamat Toko" name="storeAddress" value={formData.storeAddress} onChange={handleChange} placeholder="Contoh: Jakarta" required />
      </div>
      <InputField label="No. WhatsApp (Format 08...)" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} placeholder="081234567890" required />
      <InputField label="Nama Produk" name="productName" value={formData.productName} onChange={handleChange} placeholder="Es Kopi Susu Gula Aren" required />
      
      <div>
        <label htmlFor="productDescription" className="block text-sm font-medium text-gray-300 mb-1">Deskripsi Singkat Produk</label>
        <textarea id="productDescription" name="productDescription" value={formData.productDescription} onChange={handleChange} rows={4} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" placeholder="Jelaskan keunggulan produk Anda..." required></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        <div>
          <label htmlFor="promoTheme" className="block text-sm font-medium text-gray-300 mb-1">Pilih Tema Promosi</label>
          <select id="promoTheme" name="promoTheme" value={formData.promoTheme} onChange={handleChange} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition">
            {THEMES.map(theme => <option key={theme} value={theme}>{theme}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Foto Produk (Opsional)</label>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg px-3 py-2 text-sm transition">
            <Icon name="upload" className="w-4 h-4" />
            <span className="truncate">{fileName || 'Pilih Gambar'}</span>
          </button>
        </div>
      </div>
      
      <button type="submit" disabled={disabled} className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100">
        <Icon name="sparkles" className="w-6 h-6" />
        {disabled ? 'Sedang Membuat...' : 'Buat Konten Promosi'}
      </button>
    </form>
  );
};

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <input id={name} name={name} {...props} className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition" />
  </div>
);

export default ProductInputForm;
