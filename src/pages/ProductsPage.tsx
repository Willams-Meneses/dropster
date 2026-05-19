import ProductCarousel from "@/components/products/ProductCarousel";
import { mockProducts } from "@/utils/mocks/Products";
import { useMediaQuery, useTheme } from "@mui/material";

const ProductsPage = () => {
  const productosRegulares = mockProducts.slice(1);

  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));

  const count = isXl ? 5 : isLg ? 3 : isMd ? 3 : isSm ? 2 : 1;

  return (
    <>
      <ProductCarousel
        title="Nuevos Ingresos"
        products={productosRegulares}
        highlightedProduct={mockProducts[0]}
        visibleCount={count}
      />
    </>
  );
};

export default ProductsPage;