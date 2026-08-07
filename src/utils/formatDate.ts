export const formatDate = (iso: string): string => {
  const date = new Date(iso);
  return `${date.toLocaleString('es-AR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 👈 fuerza formato 24hs, así "hs" tiene sentido y no queda duplicado
  })} hs`;
};