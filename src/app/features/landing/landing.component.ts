import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule],
  template: `
    <div class="landing-container">
      <section class="hero">
        <h1>Apprenez vos poésies par cœur, sans effort.</h1>
        <p class="subtitle">Une méthode progressive basée sur les sciences cognitives pour mémoriser durablement.</p>
        <button mat-raised-button color="primary" routerLink="/poems" class="cta-button">Commencer</button>
      </section>

      <section class="features">
        <mat-card appearance="outlined" class="feature-card">
          <mat-card-header>
            <mat-icon mat-card-avatar color="primary">visibility_off</mat-icon>
            <mat-card-title>Effacement Progressif</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Faites disparaître les mots petit à petit pour stimuler votre mémoire active.</p>
          </mat-card-content>
        </mat-card>

        <mat-card appearance="outlined" class="feature-card">
          <mat-card-header>
            <mat-icon mat-card-avatar color="primary">text_fields</mat-icon>
            <mat-card-title>Méthode des Initiales</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Ne gardez que la première lettre de chaque mot pour vous guider sans tout dévoiler.</p>
          </mat-card-content>
        </mat-card>

        <mat-card appearance="outlined" class="feature-card">
          <mat-card-header>
            <mat-icon mat-card-avatar color="primary">view_column</mat-icon>
            <mat-card-title>Découpage par Strophes</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Apprenez bloc par bloc. L'application respecte la structure de votre poème.</p>
          </mat-card-content>
        </mat-card>
      </section>
    </div>
  `,
  styles: [`
    .landing-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
    }
    .hero {
      text-align: center;
      padding: 4rem 0;
    }
    h1 {
      font-size: 3rem;
      line-height: 1;
      margin-bottom: 1rem;
      color: #2c3e50;
    }
    .subtitle {
      font-size: 1.5rem;
      line-height: 1;
      color: #666;
      margin-bottom: 2rem;
    }
    .cta-button {
      font-size: 1.2rem;
      padding: 0.5rem 2rem;
    }
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 4rem;
    }
    .feature-card {
      height: 100%;
    }
    mat-icon {
      font-size: 2rem;
      height: 2rem;
      width: 2rem;
    }
  `]
})
export class LandingComponent {}
