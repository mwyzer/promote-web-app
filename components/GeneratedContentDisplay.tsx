
import React from 'react';
import { GeneratedContent, Platform } from '../types';
import { PLATFORMS_CONFIG } from '../constants';
import CaptionCard from './CaptionCard';
import Icon from './Icon';

interface GeneratedContentDisplayProps {
  content: GeneratedContent;
}

const GeneratedContentDisplay: React.FC<GeneratedContentDisplayProps> = ({ content }) => {
  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    // You could add a toast notification here for better UX
  };
  
  return (
    <div className="mt-12 space-y-12 animate-fade-in">
      {/* Poster Section */}
      <Section title="Poster Promosi" icon="image">
        <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
            <img src={content.posterImageUrl} alt="Generated promotional poster" className="rounded-lg shadow-lg w-full max-w-lg mx-auto" />
             <a 
                href={content.posterImageUrl} 
                download="poster_promosi_larisin.jpg"
                className="mt-4 w-full md:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
                <Icon name="download" className="w-5 h-5" />
                Download Poster
            </a>
        </div>
      </Section>

      {/* Captions Section */}
      <Section title="Caption Siap Pakai" icon="text">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PLATFORMS_CONFIG.map(platform => (
            <CaptionCard
              key={platform.id}
              platform={platform}
              caption={content.captions[platform.id as Platform]}
            />
          ))}
        </div>
      </Section>

      {/* Calendar Section */}
      <Section title="Kalender Konten 7 Hari" icon="calendar">
        <div className="space-y-4">
            {content.calendar.map((day) => (
                <div key={day.day} className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex-shrink-0 bg-purple-600/50 text-purple-200 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                        {day.day}
                    </div>
                    <div>
                        <h4 className="font-semibold text-white">{day.idea}</h4>
                        <p className="text-gray-400 text-sm">{day.hint}</p>
                    </div>
                </div>
            ))}
        </div>
      </Section>
      
       {/* WhatsApp Link Section */}
      <Section title="Link WhatsApp" icon="link">
        <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <p className="text-gray-400 mb-2 text-sm">Bagikan link ini agar pelanggan bisa langsung menghubungi Anda.</p>
          <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-gray-900 p-2 rounded-lg">
             <input type="text" readOnly value={content.whatsappLink} className="flex-grow bg-transparent text-green-400 p-2 border-0 focus:ring-0" />
             <button onClick={() => handleCopyLink(content.whatsappLink)} className="flex-shrink-0 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition">
                <Icon name="copy" className="w-5 h-5" />
                <span>Copy Link</span>
             </button>
          </div>
        </div>
      </Section>
    </div>
  );
};

interface SectionProps {
    title: string;
    icon: string;
    children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, icon, children }) => (
    <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="bg-gray-800 p-2 rounded-full">
                <Icon name={icon} className="w-6 h-6 text-purple-400" />
            </span>
            {title}
        </h2>
        {children}
    </section>
);


export default GeneratedContentDisplay;
