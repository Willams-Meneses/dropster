export interface Product {
  id: string;
  name: string;
  price: number;
  suggestedPrice: number;
  profitPercentage: number;
  stock: 'En stock' | 'Sin stock' | 'Pocas unidades';
  imageUrl: string;
  category: string;
  isHighlighted?: boolean;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Termometro Digital Lcd Bipper Niños/Adultos',
    price: 1955,
    suggestedPrice: 2400,
    profitPercentage: 78,
    stock: 'En stock',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80',
    category: 'Salud',
    isHighlighted: true,
  },
  {
    id: '2',
    name: 'Tensiómetro Digital de Brazo Automático',
    price: 4200,
    suggestedPrice: 5500,
    profitPercentage: 65,
    stock: 'En stock',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80',
    category: 'Salud',
  },
  {
    id: '3',
    name: 'Nebulizador Ultrasónico Portátil Silencioso',
    price: 6800,
    suggestedPrice: 9000,
    profitPercentage: 55,
    stock: 'En stock',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80',
    category: 'Salud',
  },
  {
    id: '4',
    name: 'Oxímetro de Pulso Digital OLED Clip',
    price: 2800,
    suggestedPrice: 3600,
    profitPercentage: 71,
    stock: 'En stock',
    imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&q=80',
    category: 'Salud',
  },
  {
    id: '5',
    name: 'Estetoscopio Profesional Doble Campana Acero',
    price: 3500,
    suggestedPrice: 4800,
    profitPercentage: 60,
    stock: 'Pocas unidades',
    imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&q=80',
    category: 'Salud',
  },
  {
    id: '6',
    name: 'Glucómetro Digital con Tiras Reactivas x50',
    price: 5100,
    suggestedPrice: 6900,
    profitPercentage: 82,
    stock: 'En stock',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
    category: 'Salud',
  },
  {
    id: '7',
    name: 'Masajeador Muscular Percusión 6 Cabezales',
    price: 8900,
    suggestedPrice: 12000,
    profitPercentage: 73,
    stock: 'En stock',
    imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=80',
    category: 'Bienestar',
  },
  {
    id: '8',
    name: 'Lámpara de Terapia de Luz Solar 10000 Lux',
    price: 7200,
    suggestedPrice: 9500,
    profitPercentage: 68,
    stock: 'Sin stock',
    imageUrl: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=400&q=80',
    category: 'Bienestar',
  },
];

export const highlightedProduct: Product = mockProducts[0];
export const newArrivalsProducts: Product[] = mockProducts.slice(1);