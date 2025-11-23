import { Component, inject } from '@angular/core';
import { PoemService } from '../../core/services/poem.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule, DatePipe],
  template: `
    <div class="home-container">
      <header>
        <h1>Mes Poésies</h1>
        <button mat-fab extended color="primary" routerLink="/editor">
          <mat-icon>add</mat-icon>
          Ajouter
        </button>
      </header>

      <div class="poem-grid">
        @for (poem of poemService.poems(); track poem.id) {
          <mat-card appearance="outlined" class="poem-card" [routerLink]="['/learning', poem.id]">
            <mat-card-header>
              <mat-card-title>{{ poem.title }}</mat-card-title>
              <mat-card-subtitle>Ajouté le {{ poem.createdAt | date:'mediumDate' }}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-content>
              <p>{{ poem.stanzas.length }} strophes</p>
            </mat-card-content>
            <mat-card-actions align="end">
              <button mat-button color="primary" [routerLink]="['/editor', poem.id]" (click)="$event.stopPropagation()">Modifier</button>
              <button mat-button color="warn" (click)="$event.stopPropagation(); delete(poem.id)">Supprimer</button>
            </mat-card-actions>
          </mat-card>
        } @empty {
          <div class="empty-state">
            <p>Aucune poésie pour le moment.</p>
            <p>Commencez par en ajouter une !</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
      line-height: 1;

    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
    }
    h1 {
      font-size: 2.5rem;
      color: #2c3e50;
      margin: 0;
    }
    .poem-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
    }
    .poem-card {
      cursor: pointer;
      transition: transform 0.2s;
    }
    .poem-card:hover {
      transform: translateY(-4px);
    }
    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      color: #666;
      font-size: 1.2rem;
      margin-top: 4rem;
    }
  `]
})
export class HomeComponent {
  poemService = inject(PoemService);

  delete(id: string) {
    if (confirm('Voulez-vous vraiment supprimer cette poésie ?')) {
      this.poemService.deletePoem(id);
    }
  }
}
