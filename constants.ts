
import { Platform } from './types';

export const THEMES = [
  "Diskon Spesial",
  "Produk Baru",
  "Giveaway",
  "Flash Sale",
  "Stok Terbatas",
  "Beli 1 Gratis 1",
  "Gratis Ongkir",
  "Testimoni Pelanggan"
];

export const PLATFORMS_CONFIG: { id: Platform; name: string; icon: string; }[] = [
    { id: Platform.Instagram, name: "Instagram", icon: "instagram" },
    { id: Platform.Facebook, name: "Facebook", icon: "facebook" },
    { id: Platform.WhatsApp, name: "WhatsApp", icon: "whatsapp" },
    { id: Platform.Threads, name: "Threads", icon: "threads" },
    { id: Platform.Marketplace, name: "Marketplace", icon: "marketplace" },
];
