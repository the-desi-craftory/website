// ============================================================
// BUSINESS CONFIGURATION — edit these values
// ============================================================
export const BUSINESS_CONFIG = {
  name: "The Desi Craftory",
  tagline: "Handcrafted with love, one stitch at a time",
  description:
    "Each piece is lovingly handcrafted to bring warmth, beauty, and joy into your everyday life.",
  whatsappNumber: "918141816990", // country code + number, no + or spaces
  instagramHandle: "the.desi.craftory",
  instagramUrl: "https://instagram.com/the.desi.craftory",
  email: "the.desi.craftory@gmail.com",

  // Google Sheets JSON URL — set via .env.local or GitHub secret
  // Sheet name must be: Products
  // Spreadsheet name: Business Portfolio
  sheetsUrl:
    process.env.NEXT_PUBLIC_SHEETS_URL ||
    "https://docs.google.com/spreadsheets/d/1-HOeO3AyOgQG5vvi6GXU3cxZvrIRZS82keJbsWd6nXQ/gviz/tq?tqx=out:json&sheet=Products",
};

// ── WhatsApp message builder ──────────────────────────────────
// orderFields: comma-separated list e.g. "Color of thread, Size"
export function buildWhatsAppMessage(
  productId: string,
  productName: string,
  discountedPrice: number,
  originalPrice?: number,
  orderFields?: string
): string {
  const priceLine =
    originalPrice && originalPrice > discountedPrice
      ? `Price: ₹${discountedPrice} (base variant — was ₹${originalPrice})`
      : `Price: ₹${discountedPrice} (base variant)`;

  // Parse orderFields into individual placeholder lines
  const fieldLines = orderFields
    ? orderFields
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean)
        .map((f) => `${f}: `)
        .join("\n")
    : "";

  const customSection = fieldLines
    ? `\nPlease fill in the details below:\n${fieldLines}`
    : "";

  return (
    `Hi! I would like to order:\n\n` +
    `Product: ${productName} (${productId})\n` +
    `${priceLine}\n` +
    `${customSection}\n` +
    `\nNote: Final price may vary based on specific requirements.`
  );
}

export function buildWhatsAppUrl(
  productId: string,
  productName: string,
  discountedPrice: number,
  originalPrice?: number,
  orderFields?: string
): string {
  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    buildWhatsAppMessage(productId, productName, discountedPrice, originalPrice, orderFields)
  )}`;
}

// ── Google Drive URL → embed URL ─────────────────────────────
// Handles all common Drive share URL formats
export function driveImageUrl(raw: string): string {
  if (!raw) return "";

  // Already a direct image URL (imgur, unsplash, etc.)
  if (!raw.includes("drive.google.com") && !raw.includes("docs.google.com")) {
    return raw;
  }

  // Extract the file ID from any Drive URL format:
  // /file/d/FILE_ID/view
  // /open?id=FILE_ID
  // /uc?id=FILE_ID
  // /thumbnail?id=FILE_ID
  let fileId = "";

  const filePathMatch = raw.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (filePathMatch) {
    fileId = filePathMatch[1];
  } else {
    const paramMatch = raw.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (paramMatch) fileId = paramMatch[1];
  }

  if (!fileId) return raw; // Return as-is if we can't parse it

  // print the fileId for debugging
  // console.log("Parsed Drive file ID:", fileId);
  // Use the thumbnail endpoint which serves images without auth
  // return `https://drive.google.com/uc?export=view&id=${fileId}`;
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
}
