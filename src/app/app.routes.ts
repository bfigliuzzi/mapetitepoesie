import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout.component';
import { PoemEditorComponent } from './features/editor/poem-editor.component';
import { PoemLearningComponent } from './features/learning/poem-learning.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)
      },
      {
        path: 'poems',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'editor',
        component: PoemEditorComponent
      },
      {
        path: 'editor/:id',
        component: PoemEditorComponent
      },
      {
        path: 'learning/:id',
        component: PoemLearningComponent
      },
      {
        path: 'legal/:type',
        loadComponent: () => import('./features/legal/legal.component').then(m => m.LegalComponent)
      }
    ]
  }
];
