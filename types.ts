export interface ProductInfo {
  storeName: string;
  storeAddress: string;
  whatsappNumber: string;
  productName: string;
  productDescription: string;
  promoTheme: string;
  productImage: {
    mimeType: string;
    data: string;
  } | null;
}

export enum Platform {
  WhatsApp = "whatsapp",
  Instagram = "instagram",
  Facebook = "facebook",
  Threads = "threads",
  Marketplace = "marketplace",
}

export type Captions = {
  [key in Platform]: string;
};

export interface CalendarDay {
  day: number;
  idea: string;
  hint: string;
}

export interface GeneratedContent {
  captions: Captions;
  calendar: CalendarDay[];
  posterImageUrl: string;
  whatsappLink: string;
}

export interface HistoryItem {
  id: string;
  createdAt: string;
  productInfo: ProductInfo;
  generatedContent: GeneratedContent;
}
