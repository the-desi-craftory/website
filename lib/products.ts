import { Product, SheetData } from "./types";
import { driveImageUrl } from "./config";

// Sheet column indices (0-based) matching schema:
// Product ID | Product Name | Category | Discounted Price | Original Price |
// Description | Image URL | Available | Featured | Make Time | Order Fields
const COL = {
  productId:      0,
  name:           1,
  category:       2,
  discountedPrice:3,
  originalPrice:  4,
  description:    5,
  imageUrl:       6,
  available:      7,
  featured:       8,
  makeTime:       9,
  orderFields:    10,
};

function cell(row: SheetData["table"]["rows"][0], idx: number): string {
  return row.c?.[idx]?.v?.toString().trim() ?? "";
}

function parseSheetData(raw: string): Product[] {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON found in Sheets response");

  const data: SheetData = JSON.parse(raw.slice(start, end + 1));

  return data.table.rows
    .filter((row) => row.c && cell(row, COL.name) !== "")   // skip empty rows
    .map((row) => {
      const discountedPrice = parseFloat(cell(row, COL.discountedPrice)) || 0;
      const originalPriceRaw = parseFloat(cell(row, COL.originalPrice));
      const originalPrice =
        !isNaN(originalPriceRaw) && originalPriceRaw > discountedPrice
          ? originalPriceRaw
          : undefined;

      const rawImageUrl = cell(row, COL.imageUrl);

      return {
        id:             cell(row, COL.productId) || `P${Math.random().toString(36).slice(2,6).toUpperCase()}`,
        name:           cell(row, COL.name),
        category:       cell(row, COL.category),
        discountedPrice,
        originalPrice,
        description:    cell(row, COL.description),
        imageUrl:       driveImageUrl(rawImageUrl),
        available:      cell(row, COL.available).toLowerCase() === "yes",
        featured:       cell(row, COL.featured).toLowerCase() === "yes",
        makeTime:       cell(row, COL.makeTime) || undefined,
        orderFields:    cell(row, COL.orderFields) || undefined,
      } as Product;
    })
    .filter((p) => p.available && p.name);
}

export async function fetchProducts(): Promise<Product[]> {
  const { BUSINESS_CONFIG } = await import("./config");
  const url = BUSINESS_CONFIG.sheetsUrl;

  if (!url || url.includes("YOUR_SHEET_ID")) return [];

  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const raw = await res.text();
    return parseSheetData(raw);
  } catch (e) {
    console.error("Failed to fetch/parse sheet:", e);
    return [];
  }
}

export function getCategories(products: Product[]): string[] {
  return Array.from(new Set(products.map((p) => p.category))).sort();
}

export function getFeaturedProducts(products: Product[]): Product[] {
  const featured = products.filter((p) => p.featured);
  return featured.length ? featured : products.slice(0, 4);
}