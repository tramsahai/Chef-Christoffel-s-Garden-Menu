export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: 'Starters' | 'Mains' | 'Dessert';
  price: number;
}