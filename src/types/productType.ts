export type IProducts = {
    _id?: number;
    productName: string;
  mrp: number;
  sku: string;
  barcode?: string;
  brand?: string;
  keywords?: string;
  minQty: number;
  weight?: number;
  height?: number;
  length?: number;
  width?: number;
  dimensions?: string;
  taxSlab?: SelectOption[];
  status: boolean;
  todaysDeal: boolean;
  description?: string;
  isCess: boolean;
  cess?: SelectOption[];
  featured: boolean;

//   files section
galleryImages: File[];
thumbnails: File[];
variations: { image: File; colorCode: string; colorName: string, details:IVariants[] }[];
sizeImages: File[];

// === price stock ===
basePrice: number;
samplePrice: number;
discount: number;
discountType: string;
pricePerPieces: IPricePerPieces[];
selectWise: "size" | "bundle";
store:""

} 

export type IPricePerPieces = {
    _id?: string;
    min_Piece?: number;
    max_Piece?: number;
    discount: number;
}

export type IVariants = {
    _id?: string;
    size: number;
    stock: number;
    discount: number;
    sellingPrice: number;
    skuId: string;
    sample:boolean;
}

export interface SelectOption {
    _id: string;
    name: string;
  }