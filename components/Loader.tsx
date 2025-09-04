
import React from 'react';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-4 text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
      <div className="w-10 h-10 border-4 border-t-purple-500 border-r-purple-500 border-b-purple-500 border-l-transparent rounded-full animate-spin"></div>
      <p className="font-medium text-purple-300">{message || 'Memproses...'}</p>
    </div>
  );
};

export default Loader;
