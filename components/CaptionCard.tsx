
import React, { useState, useEffect } from 'react';
import Icon from './Icon';

interface CaptionCardProps {
  platform: { id: string; name: string; icon: string };
  caption: string;
}

const CaptionCard: React.FC<CaptionCardProps> = ({ platform, caption }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 flex flex-col h-full">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Icon name={platform.icon} className="w-6 h-6" />
          <h3 className="font-bold text-lg text-white">{platform.name}</h3>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full transition ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
          }`}
        >
          <Icon name={copied ? 'check' : 'copy'} className="w-4 h-4" />
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <p className="text-gray-300 whitespace-pre-wrap text-sm flex-grow">{caption}</p>
    </div>
  );
};

export default CaptionCard;
