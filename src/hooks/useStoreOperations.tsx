import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { storeService } from '@/services/store.service';

// ─── Type guard para errores HTTP de Axios ────────────────────────────────────

interface HttpError {
  response?: { status?: number };
}

function isHttpError(err: unknown): err is HttpError {
  return typeof err === 'object' && err !== null && 'response' in err;
}

function getHttpStatus(err: unknown): number | undefined {
  return isHttpError(err) ? err.response?.status : undefined;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useStoreOperations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdatingPrice, setIsUpdatingPrice] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleApiError = (
    err: unknown,
    action: string,
    customMessages?: Record<number, string>,
  ) => {
    const status = getHttpStatus(err);
    const defaultMessages: Record<number, string> = {
      401: 'Sesión expirada. Iniciá sesión nuevamente.',
      403: `No tenés permisos para ${action}`,
      404: `No se encontró el recurso para ${action}`,
    };
    const messages = { ...defaultMessages, ...customMessages };
    const errorMessage =
      (status !== undefined ? messages[status] : undefined) ??
      `Error al ${action}. Intentá de nuevo.`;
    enqueueSnackbar(errorMessage, { variant: 'error' });
  };

  const addProduct = async (productId: string): Promise<void> => {
    if (!productId.trim()) {
      enqueueSnackbar('ID de producto inválido', { variant: 'error' });
      return;
    }
    setIsLoading(true);
    try {
      await storeService.addProductToStore(productId);
      enqueueSnackbar('✅ Producto agregado a tu tienda', { variant: 'success' });
    } catch (err: unknown) {
      const status = getHttpStatus(err);
      if (status === 400) {
        enqueueSnackbar('El producto ya está en tu tienda', { variant: 'warning' });
      } else {
        handleApiError(err, 'agregar el producto');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = async (tiendanubeProductId: string): Promise<void> => {
    if (!tiendanubeProductId.trim()) {
      enqueueSnackbar('ID de producto inválido', { variant: 'error' });
      return;
    }
    setIsRemoving(true);
    try {
      await storeService.removeProductFromStore(tiendanubeProductId);
      enqueueSnackbar('✅ Producto eliminado de tu tienda', { variant: 'success' });
    } catch (err: unknown) {
      handleApiError(err, 'eliminar el producto');
    } finally {
      setIsRemoving(false);
    }
  };

  // sellPrice llega como number desde el input y se convierte a string con 2 decimales
  // para respetar el formato que espera el DTO del backend (ej: "2599.99")
  const updateSellPrice = async (
    dropshipperVariantId: string,
    sellPrice: number,
  ): Promise<void> => {
    setIsUpdatingPrice(true);
    try {
      await storeService.updateSellPrice(
        dropshipperVariantId,
        sellPrice.toFixed(2),
      );
      enqueueSnackbar('✅ Precio actualizado', { variant: 'success' });
    } catch (err: unknown) {
      handleApiError(err, 'actualizar el precio', {
        400: 'El precio ingresado no es válido',
      });
    } finally {
      setIsUpdatingPrice(false);
    }
  };

  return {
    addProduct,
    removeProduct,
    updateSellPrice,
    isLoading,
    isRemoving,
    isUpdatingPrice,
  };
};