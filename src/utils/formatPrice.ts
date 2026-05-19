export const formatPrice = (price: string | number): string => {
  // Si ya es string, lo usamos directamente (viene de la DB)
  if (typeof price === 'string') {
    // Reemplazar punto por coma para locale argentino
    const withComma = price.replace('.', ',');
    return `$ ${withComma}`;
  }
  
  // Si es número (caso edge, ej: cálculo en frontend)
  return `$ ${price.toLocaleString('es-AR', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  })}`;
};