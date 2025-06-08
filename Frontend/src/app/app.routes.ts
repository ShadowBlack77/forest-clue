import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@lib/forest-clue/layouts').then((c) => c.RootLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home-page.component').then((c) => c.HomePageComponent)
      },
      {
        path: 'shop',
        loadComponent: () => import('./pages/shop/shop-page.component').then((c) => c.ShopPageComponent)
      },
      {
        path: 'about',
        loadComponent: () => import('./pages/about/about-page.component').then((c) => c.AboutPageComponent)
      },
      {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart-page.component').then((c) => c.CartPageComponent)
      },
      {
        path: 'account',
        loadComponent: () => import('./pages/account/account-page.component').then((c) => c.AccountPageComponent)
      }
    ]
  },
  {
    path: 'admin',
    loadComponent: () => import('@lib/forest-clue/layouts').then((c) => c.AdminLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/admin/dashboard/dashboard-page.component').then((c) => c.DashboardPageComponent)
      },
      {
        path: 'orders',
        loadComponent: () => import('./pages/admin/orders/orders-page.component').then((c) => c.OrdersPageComponent)
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/admin/products/products-page.component').then((c) => c.ProductsPageComponent)
      }
    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login-page.component').then((c) => c.LoginPageComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/auth/register/register-page.component').then((c) => c.RegisterPageComponent)
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./pages/auth/reset-password/reset-password-page.component').then((c) => c.ResetPasswordPageComponent)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found-page.component').then((c) => c.NotFoundPageComponent)
  }
];
