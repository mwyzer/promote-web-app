import React, { useState } from 'react';
import { HistoryItem, ProductInfo } from '../types';
import Icon from './Icon';

interface HistoryListProps {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
  onRefill: (productInfo: ProductInfo) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ items, onSelect, onDelete, onClear, onRefill }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (items.length === 0) {
    return null;
  }

  const handleClear = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus semua riwayat? Tindakan ini tidak dapat diurungkan.")) {
      onClear();
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  return (
    <div className="mt-8">
      <div className="bg-gray-800/50 p-4 rounded-t-xl border border-b-0 border-gray-700 flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h2 className="text-xl font-bold flex items-center gap-3">
          <Icon name="history" className="w-6 h-6 text-purple-400" />
          Riwayat Promosi
        </h2>
        <div className='flex items-center gap-4'>
            {items.length > 0 && (
                <button 
                    onClick={(e) => { e.stopPropagation(); handleClear(); }} 
                    className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1">
                    <Icon name="trash" className="w-4 h-4"/>
                    <span>Hapus Semua</span>
                </button>
            )}
            <Icon name="chevronDown" className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>
      {isOpen && (
        <div className="border border-t-0 border-gray-700 rounded-b-xl p-4 space-y-3 max-h-96 overflow-y-auto">
          {items.map(item => (
            <div key={item.id} className="bg-gray-900/70 p-3 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className='flex-grow'>
                <p className="font-semibold text-white truncate">{item.productInfo.productName}</p>
                <p className="text-xs text-gray-400">{formatDate(item.createdAt)}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <ActionButton icon="view" text="Lihat Hasil" onClick={() => onSelect(item)} color="indigo" />
                <ActionButton icon="edit" text="Isi Ulang Form" onClick={() => onRefill(item.productInfo)} color="blue" />
                <button onClick={() => onDelete(item.id)} className="p-2 text-gray-400 hover:text-red-400 transition rounded-full hover:bg-red-900/50">
                   <Icon name="trash" className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

interface ActionButtonProps {
    icon: string;
    text: string;
    onClick: () => void;
    color: 'indigo' | 'blue';
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, text, onClick, color }) => {
    const colors = {
        indigo: 'bg-indigo-600 hover:bg-indigo-700',
        blue: 'bg-blue-600 hover:bg-blue-700',
    };

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md transition text-white ${colors[color]}`}
        >
            <Icon name={icon} className="w-4 h-4" />
            <span className='hidden sm:inline'>{text}</span>
        </button>
    )
}

export default HistoryList;
