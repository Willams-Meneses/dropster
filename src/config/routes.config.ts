export interface RouteConfig {
  title?: string;
  showSearch: boolean;
  showBackButton?: boolean;
}

export const routesConfig: Record<string, RouteConfig> = {
  '/dashboard': { title: 'Productos', showSearch: true },
  '/dashboard/my-stores': { title: 'Mis tiendas', showSearch: false },
  '/dashboard/my-stores/detail': { showSearch: false, showBackButton: true },
  '/dashboard/pedidos': { title: 'Pedidos', showSearch: false },
  '/dashboard/devoluciones': { title: 'Devoluciones', showSearch: false },
  '/dashboard/my-listings': { title: 'Mis Publicaciones', showSearch: false },
  '/dashboard/resumen': { title: 'Resumen', showSearch: false },
  '/dashboard/mis-ventas': { title: 'Mis ventas', showSearch: false },
  '/dashboard/my-profile': { title: 'Mi cuenta', showSearch: false },
  '/dashboard/my-profile/personal-data': { title: '', showSearch: false, showBackButton: true },
  '/dashboard/my-profile/dispatch-address': { title: '', showSearch: false, showBackButton: true },
};