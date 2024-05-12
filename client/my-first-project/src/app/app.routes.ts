import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home-page', pathMatch: 'full' },
    { path: 'signup', loadComponent: () => import('./signup/signup.component').then((c) => c.SignupComponent) },
    { path: 'login', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent) },
    { path: 'home-page',loadComponent: () => import('./home-page/home-page.component').then((c)=> c.HomePageComponent)},
    { path: 'user-management', loadComponent: () => import('./user-management/user-management.component').then((c) => c.UserManagementComponent), canActivate: [authGuard] },
    { path: 'artist-menu', loadComponent: () => import('./artist-menu/artist-menu.component').then((c) => c.ArtistMenuComponent), canActivate: [authGuard] },
    { path: 'painting-watcher', loadComponent: () => import('./painting-watcher/painting-watcher.component').then((c) => c.PaintingWatcherComponent) },
    { path: 'events', loadComponent: () => import('./events/events.component').then((c) => c.EventsComponent) },
    { path: 'collections', loadComponent: () => import('./collections/collections.component').then((c) => c.CollectionsComponent) },
    { path: 'about', loadComponent: () => import('./about/about.component').then((c) => c.AboutComponent) },
    { path: 'news', loadComponent: () => import('./news/news.component').then((c) => c.NewsComponent) },
    { path: 'basket', loadComponent: () => import('./basket/basket.component').then((c) => c.BasketComponent), canActivate: [authGuard] },

    { path: '**', redirectTo: 'home-page' }
];
