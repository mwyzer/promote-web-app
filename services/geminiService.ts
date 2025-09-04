
import { GoogleGenAI, Type } from "@google/genai";
import { ProductInfo, GeneratedContent, Captions, CalendarDay, Platform } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = (file: File): Promise<{ mimeType: string, data: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64Data = dataUrl.split(',')[1];
      resolve({
        mimeType: file.type,
        data: base64Data
      });
    };
    reader.onerror = error => reject(error);
  });
};


const generateWhatsAppLink = (info: ProductInfo): string => {
  const number = info.whatsappNumber.replace(/[^0-9]/g, '');
  const internationalNumber = number.startsWith('0') ? `62${number.substring(1)}` : number;
  const message = `Halo, saya tertarik dengan produk "${info.productName}" dari toko ${info.storeName} di ${info.storeAddress}. Apakah produk ini masih tersedia?`;
  return `https://wa.me/${internationalNumber}?text=${encodeURIComponent(message)}`;
}


export const generateAllContent = async (
  productInfo: ProductInfo,
  setLoadingMessage: (message: string) => void
): Promise<GeneratedContent> => {
  try {
    // Step 1: Generate Text Content (Captions, Calendar, Poster Prompt)
    setLoadingMessage("Menganalisis info produk & membuat teks promosi...");

    const textGenerationPrompt = `
      Anda adalah LARISin, asisten marketing AI ahli untuk UMKM di Indonesia. 
      Tugas Anda adalah membuat konten promosi yang menarik dan persuasif dalam Bahasa Indonesia.

      Informasi Produk:
      - Nama Toko: ${productInfo.storeName}
      - Alamat Toko: ${productInfo.storeAddress}
      - Nama Produk: ${productInfo.productName}
      - Deskripsi Produk: ${productInfo.productDescription}
      - Tema Promosi: ${productInfo.promoTheme}

      Berdasarkan informasi di atas, hasilkan JSON dengan struktur yang SAMA PERSIS seperti skema yang diberikan.
    `;

    const textResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: textGenerationPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            captions: {
              type: Type.OBJECT,
              properties: {
                [Platform.WhatsApp]: { type: Type.STRING, description: "Caption untuk status atau broadcast WhatsApp." },
                [Platform.Instagram]: { type: Type.STRING, description: "Caption untuk post Instagram, lengkap dengan hashtag." },
                [Platform.Facebook]: { type: Type.STRING, description: "Caption untuk post Facebook." },
                [Platform.Threads]: { type: Type.STRING, description: "Caption singkat dan engaging untuk Threads." },
                [Platform.Marketplace]: { type: Type.STRING, description: "Deskripsi produk untuk platform marketplace." },
              },
              required: Object.values(Platform),
            },
            calendar: {
              type: Type.ARRAY,
              description: "Rencana posting konten 7 hari.",
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.INTEGER },
                  idea: { type: Type.STRING, description: "Ide atau jenis konten untuk hari itu." },
                  hint: { type: Type.STRING, description: "Saran singkat untuk caption atau visual." },
                },
                required: ["day", "idea", "hint"],
              },
            },
            posterPrompt: {
              type: Type.STRING,
              description: "Prompt dalam Bahasa Inggris untuk AI image generator (seperti Imagen) untuk membuat poster promosi."
            }
          },
          required: ["captions", "calendar", "posterPrompt"],
        },
      }
    });

    const textResult = JSON.parse(textResponse.text);
    const { captions, calendar, posterPrompt } = textResult;

    // Step 2: Generate Image Content
    setLoadingMessage("Mendesain poster promosi yang menarik...");

    const imageResponse = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: posterPrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
    });

    const base64ImageBytes = imageResponse.generatedImages[0].image.imageBytes;
    const posterImageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
    
    // Step 3: Generate WhatsApp Link
    const whatsappLink = generateWhatsAppLink(productInfo);

    setLoadingMessage("Menyusun semua hasil...");

    return {
      captions,
      calendar,
      posterImageUrl,
      whatsappLink
    };

  } catch (error) {
    console.error("Error generating content:", error);
    if (error instanceof Error) {
        throw new Error(`Gagal berkomunikasi dengan AI. Detail: ${error.message}`);
    }
    throw new Error("Terjadi kesalahan yang tidak diketahui saat membuat konten.");
  }
};