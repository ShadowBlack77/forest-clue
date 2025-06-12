import { Routes } from '@angular/router';
import { AuthGuard, ProtectedGuard, RoleGuard } from '@lib/auth';
import { LoadCartResolver } from '@lib/forest-clue/cart';
import { LoadProductsResolver } from '@lib/forest-clue/products';

export const routes: Routes = [
  {
    path: '',
    resolve: [LoadProductsResolver],
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
        resolve: [
          LoadCartResolver
        ],
        loadComponent: () => import('./pages/cart/cart-page.component').then((c) => c.CartPageComponent)
      },
      {
        path: 'account',
        canActivate: [ProtectedGuard],
        loadComponent: () => import('./pages/account/account-page.component').then((c) => c.AccountPageComponent)
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [RoleGuard],
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
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadComponent: () => import('@lib/forest-clue/layouts').then((c) => c.AuthLayoutComponent),
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
