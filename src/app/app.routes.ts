import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Portfolio | Michael Peter',
    loadComponent: () => import('./pages/landing/landing.component')
      .then(m => m.LandingComponent),
    data: {
      meta: {
        description: 'Hi, ich bin Michael! Entdecke mein Portfolio als Web Developer.'
      }
    }
  },
  {
    path: 'projects',
    title: 'Projects | Michael Peter',
    loadComponent: () => import('./pages/project-list/project-list.component')
      .then(m => m.ProjectListComponent),
    data: {
      meta: {
        description: 'Entdecke meine aktuellen Web Development Projekte und deren Umsetzung.'
      }
    }
  },
  {
    path: 'legal',
    children: [
      {
        path: 'imprint',
        loadComponent: () => import('./pages/imprint/imprint.component')
          .then(m => m.ImprintComponent),
        title: 'Imprint | Michael Peter',
        data: {
          meta: {
            description: 'Impressum und Kontaktinformationen.'
          }
        }
      },
      {
        path: 'privacy-policy',
        loadComponent: () => import('./pages/legal/legal.component')
          .then(m => m.LegalComponent),
        title: 'Privacy Policy | Michael Peter',
        data: {
          meta: {
            description: 'Rechtliche Hinweise und Datenschutzerklärung.'
          }
        }
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: '404 - Page Not Found | Michael Peter',
    data: {
      meta: {
        description: 'Die gesuchte Seite wurde leider nicht gefunden.'
      }
    }
  }
];