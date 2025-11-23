import { Component, inject, signal, computed, input, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PoemService } from '../../core/services/poem.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poem-editor',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="editor-container">
      <h2>{{ id() ? 'Modifier' : 'Ajouter' }} une Poésie</h2>
      
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Titre</mat-label>
        <input matInput [(ngModel)]="title" name="title" required placeholder="Le Cancre">
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Texte de la poésie</mat-label>
        <textarea matInput [(ngModel)]="text" name="text" rows="15" required placeholder="Collez votre texte ici..."></textarea>
        <mat-hint>Double saut de ligne = Nouvelle strophe</mat-hint>
      </mat-form-field>

      <div class="actions">
        <button mat-raised-button color="primary" (click)="save()" [disabled]="!isValid()">Enregistrer</button>
      </div>
    </div>
  `,
  styles: [`
    .editor-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 1rem;
    }
    .full-width {
      width: 100%;
      margin-bottom: 1rem;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class PoemEditorComponent {
  private poemService = inject(PoemService);
  private router = inject(Router);

  readonly id = input<string>(); // Optional ID for editing

  title = signal('');
  text = signal('');

  constructor() {
    effect(() => {
      const poemId = this.id();
      if (poemId) {
        const poem = this.poemService.getPoem(poemId);
        if (poem) {
          this.title.set(poem.title);
          // Use originalText if available, otherwise reconstruct (fallback for old data)
          if (poem.originalText) {
            this.text.set(poem.originalText);
          } else {
            // Reconstruct from structure
            const reconstructed = poem.stanzas
              .map(s => s.lines
                .map(l => l.words.map(w => w.text).join(' '))
                .join('\n')
              )
              .join('\n\n');
            this.text.set(reconstructed);
          }
        }
      }
    });
  }

  isValid = computed(() => this.title().trim().length > 0 && this.text().trim().length > 0);

  save() {
    if (this.isValid()) {
      const poemId = this.id();
      if (poemId) {
        this.poemService.updatePoemContent(poemId, this.title(), this.text());
      } else {
        this.poemService.savePoem(this.title(), this.text());
      }
      this.router.navigate(['/poems']); // Go back to list
    }
  }
}
