import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ProductInfo, GeneratedContent, HistoryItem } from './types';
import { generateAllContent } from './services/geminiService';
import ProductInputForm from './components/ProductInputForm';
import GeneratedContentDisplay from './components/GeneratedContentDisplay';
import Loader from './components/Loader';
import Icon from './components/Icon';
import HistoryList from './components/HistoryList';

const App: React.FC = () => {
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [refillFormData, setRefillFormData] = useState<ProductInfo | null>(null);
  
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('larisinHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Failed to parse history from localStorage", e);
      localStorage.removeItem('larisinHistory');
    }
  }, []);

  const handleGenerate = useCallback(async (productInfo: ProductInfo) => {
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    setRefillFormData(null);

    try {
      const content = await generateAllContent(productInfo, setLoadingMessage);
      setGeneratedContent(content);

      // Add to history
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        productInfo: productInfo,
        generatedContent: content,
      };
      const updatedHistory = [newHistoryItem, ...history];
      setHistory(updatedHistory);
      localStorage.setItem('larisinHistory', JSON.stringify(updatedHistory));
      
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak diketahui.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [history]);

  const handleSelectHistory = (item: HistoryItem) => {
    setError(null);
    setGeneratedContent(item.generatedContent);
    setRefillFormData(null);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleDeleteHistory = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('larisinHistory', JSON.stringify(updatedHistory));
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('larisinHistory');
  };

  const handleRefillForm = (productInfo: ProductInfo) => {
    setRefillFormData(productInfo);
    setGeneratedContent(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <div className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 p-1 rounded-lg">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gray-900 p-2 rounded-md">
                <span className="flex items-center justify-center gap-3">
                    <Icon name="sparkles" className="w-8 h-8 text-purple-400"/>
                    LARISin
                </span>
              </h1>
          </div>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Copilot Promosi AI untuk UMKM Anda. Buat caption, poster, dan kalender konten dalam sekejap.
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <ProductInputForm onGenerate={handleGenerate} disabled={isLoading} initialData={refillFormData} />
          
          <HistoryList 
            items={history}
            onSelect={handleSelectHistory}
            onDelete={handleDeleteHistory}
            onClear={handleClearHistory}
            onRefill={handleRefillForm}
          />

          {isLoading && <Loader message={loadingMessage} />}

          {error && (
            <div className="mt-8 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
              <p className="font-semibold">Oops! Terjadi Kesalahan</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
          <div ref={resultsRef}>
            {generatedContent && !isLoading && (
              <GeneratedContentDisplay content={generatedContent} />
            )}
          </div>
        </div>
      </main>

       <footer className="text-center py-6 mt-12 border-t border-gray-800">
        <p className="text-gray-500 text-sm">Dibuat dengan ❤️ untuk kemajuan UMKM Indonesia.</p>
      </footer>
    </div>
  );
};

export default App;
