export type Product = {
  id: number;
  title: string;
  category: string;
  description?: string;
  price?: number;
};

export type ProductsResponse = {
  total: number;
  products: Product[];
};
