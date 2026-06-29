export const formatPrice = (price: string | number): string => {
  if (typeof price === 'string') {
    const withComma = price.replace('.', ',');
    return `$ ${withComma}`;
  }
  
  return `$ ${price.toLocaleString('es-AR', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  })}`;
};

export const formatPercentage = (value: string | number): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return `${Math.round(num)}`;
};