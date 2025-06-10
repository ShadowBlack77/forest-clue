export interface Product {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly inStock: number;
  readonly imageUrl: string;
  readonly featured: boolean;
}