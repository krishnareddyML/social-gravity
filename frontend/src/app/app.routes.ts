import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { MainLayoutComponent } from './components/layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ComposeComponent } from './pages/compose/compose.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'compose', component: ComposeComponent },
            { path: 'calendar', component: CalendarComponent },
            { path: 'analytics', component: AnalyticsComponent },
            { path: 'accounts', loadComponent: () => import('./pages/dashboard/accounts/accounts.component').then(m => m.AccountsComponent) },
        ]
    }
];
