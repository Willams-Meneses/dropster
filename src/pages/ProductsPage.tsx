import ProductCarousel from "@/components/products/ProductCarousel";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { useProducts } from "@/hooks/useProducts";
import { mockProducts } from "@/utils/mocks/Products";
import { useMediaQuery, useTheme } from "@mui/material";

const ProductsPage = () => {
  const USE_MOCK = false;
  const { products: apiProducts, isLoading: apiLoading, error: apiError } = useProducts();

  // Si usamos mock, los datos vienen de acá
  const mockData = {
    products: mockProducts,
    isLoading: false,
    error: null,
  };

  const products = USE_MOCK ? mockData.products : apiProducts;
  const isLoading = USE_MOCK ? false : apiLoading;
  const error = USE_MOCK ? null : apiError;


  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));

  const count = isXl ? 5 : isLg ? 3 : isMd ? 3 : isSm ? 2 : 1;

  if (isLoading) {
    return <LoadingScreen message="Cargando productos..." />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={typeof error === 'string' ? error : 'Error al cargar los productos'}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <ProductCarousel
      title="Nuevos Ingresos"
      products={products.slice(1)}
      highlightedProduct={products[0]}
      visibleCount={count}
    />
  );
};

export default ProductsPage;