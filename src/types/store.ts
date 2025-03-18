
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  seller: string;
  materials: string[];
  inStock: boolean;
  rating: number;
  dateAdded: Date;
  sustainability: {
    percentRecycled: number;
    carbonSaved: number; // in kg of CO2
    wasteDiverted: string;
  };
}
