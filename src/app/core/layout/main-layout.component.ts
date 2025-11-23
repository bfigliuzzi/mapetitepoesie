import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule],
  template: `
    <div class="layout-container">
      <mat-toolbar color="primary">
        <span routerLink="/" class="logo">Ma Petite Poésie</span>
        <span class="spacer"></span>
        <button mat-button routerLink="/poems">Mes Poésies</button>
        <button mat-button routerLink="/editor">Ajouter</button>
      </mat-toolbar>

      <main class="content">
        <router-outlet></router-outlet>
      </main>

      <footer>
        <div class="footer-content">
          <p>&copy; 2025 Ma Petite Poésie. Fait avec ❤️ afin d'aider les enfants à apprendre leurs poésies.</p>
          <nav>
            <a routerLink="/legal/mentions">Mentions Légales</a>
            <a routerLink="/legal/privacy">Confidentialité</a>
            <a routerLink="/legal/cgu">CGU</a>
            <a href="https://github.com/bfigliuzzi/mapetitepoesie" target="_blank" rel="noopener noreferrer">Code Source</a>
          </nav>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .layout-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    .logo {
      cursor: pointer;
      font-weight: 500;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .content {
      flex: 1;
      padding: 1rem;
    }
    footer {
      background-color: #f5f5f5;
      padding: 1rem;
      margin-top: auto;
    }
    .footer-content {
      max-width: 1000px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    @media (max-width: 600px) {
      .footer-content {
        flex-direction: column;
        text-align: center;
      }
      footer nav a {
        margin: 0 0.5rem;
      }
    }
    footer nav a {
      margin-left: 1rem;
      color: #666;
      text-decoration: none;
    }
    footer nav a:hover {
      text-decoration: underline;
    }
  `]
})
export class MainLayoutComponent {}
