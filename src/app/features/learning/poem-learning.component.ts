import { Component, computed, inject, input, signal, effect, untracked, DestroyRef } from '@angular/core';
import { PoemService } from '../../core/services/poem.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { WordTokenComponent } from './word-token.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-poem-learning',
  imports: [MatButtonToggleModule, WordTokenComponent, FormsModule, RouterLink, MatButtonModule, MatIconModule],
  template: `
    @if (poem(); as p) {
      <div class="learning-container">
        <header>
          <button mat-icon-button routerLink="/">
            <mat-icon>arrow_back</mat-icon>
          </button>
          <h1>{{ p.title }}</h1>
        </header>

        <div class="intro-box">
          <p>Bienvenue ! Ici, tu vas apprendre ta poésie petit à petit.</p>
          <p>Utilise les boutons ci-dessous pour cacher de plus en plus de mots. Si tu es bloqué, clique sur un mot caché pour le voir !</p>
        </div>

        <div class="controls">
          <mat-button-toggle-group [ngModel]="difficulty()" (ngModelChange)="updateDifficulty($event)" exclusive class="difficulty-toggles">
            <mat-button-toggle [value]="0">0</mat-button-toggle>
            <mat-button-toggle [value]="1">1</mat-button-toggle>
            <mat-button-toggle [value]="2">2</mat-button-toggle>
            <mat-button-toggle [value]="3">3</mat-button-toggle>
            <mat-button-toggle [value]="4">4</mat-button-toggle>
          </mat-button-toggle-group>
          <p class="hint">{{ getDifficultyLabel() }}</p>
          
          <div class="guidance-box">
            <p class="instruction">{{ getGuidanceMessage() }}</p>
            @if (difficulty() > 0) {
              <p class="interaction-hint">
                <mat-icon inline>lightbulb</mat-icon> 
                Astuce : Clique sur un mot caché pour le voir un court instant.
              </p>
            }
          </div>
        </div>

        <div class="poem-content">
          @for (stanza of processedStanzas(); track stanza.id) {
            <div class="stanza">
              @for (line of stanza.lines; track line.id) {
                <div class="line">
                  @for (word of line.words; track word.id) {
                    <app-word-token [word]="word" [difficulty]="difficulty()" />
                  }
                </div>
              }
            </div>
          }
        </div>
      </div>
    } @else {
      <p>Poésie introuvable.</p>
    }
  `,
  styles: [`
    .learning-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 1rem;
    }
    header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      line-height: 1;
    }
    .intro-box {
      background-color: #e3f2fd;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 2rem;
      color: #0d47a1;
    }
    .intro-box p {
      margin: 0.5rem 0;
    }
    .controls {
      background: #f5f5f5;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    }
    .difficulty-toggles {
      width: 100%;
      overflow-x: auto;
      display: flex;
    }
    .difficulty-toggles mat-button-toggle {
      flex: 1;
      min-width: 48px;
    }
    .stanza {
      margin-bottom: 2rem;
    }
    .line {
      line-height: 2;
      min-height: 2em;
      margin-bottom: 0.5rem;
    }
    .hint {
      font-style: italic;
      color: #666;
      margin-top: 0.5rem;
    }
    .guidance-box {
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid #e0e0e0;
    }
    .instruction {
      font-weight: 500;
      color: #2c3e50;
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }
    .interaction-hint {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: #7f8c8d;
      background: #fff;
      padding: 0.5rem;
      border-radius: 4px;
      width: fit-content;
    }
  `]
})
export class PoemLearningComponent {
  private poemService = inject(PoemService);
  
  readonly id = input<string>();
  
  readonly poem = computed(() => {
    const poemId = this.id();
    return poemId ? this.poemService.getPoem(poemId) : undefined;
  });
  
  readonly difficulty = signal(0);

  constructor() {
    effect(() => {
      const p = this.poem();
      if (p && p.lastDifficulty !== undefined && untracked(this.difficulty) === 0) {
        this.difficulty.set(p.lastDifficulty);
      }
    });
  }

  updateDifficulty(value: number) {
    this.difficulty.set(value);
    const p = this.poem();
    if (p) {
      this.poemService.updatePoemDifficulty(p.id, value);
    }
  }

  readonly processedStanzas = computed(() => {
    const p = this.poem();
    if (!p) return [];
    
    const diff = this.difficulty();
    
    let wordCounter = 0;

    return p.stanzas.map(stanza => ({
      ...stanza,
      lines: stanza.lines.map(line => ({
        ...line,
        words: line.words.map((word) => {
          let isHidden = false;
          const index = wordCounter++; // Use global counter
          
          if (diff === 1) {
            const isShort = word.cleanText.length <= 3;
            if (isShort) {
               isHidden = index % 2 === 0;
            } else {
               isHidden = index % 10 === 0;
            }
          } else if (diff === 2) {
            isHidden = index % 2 === 0;
          } else if (diff === 3) {
            isHidden = true; 
          } else if (diff === 4) {
            isHidden = true;
          }

          return {
            ...word,
            isHidden
          };
        })
      }))
    }));
  });

  getDifficultyLabel(): string {
    switch (this.difficulty()) {
      case 0: return 'Lecture complète';
      case 1: return 'Gruyère (~25%)';
      case 2: return 'Damier (50%)';
      case 3: return 'Initiales';
      case 4: return 'Récitation (Tout masqué)';
      default: return '';
    }
  }

  getGuidanceMessage(): string {
    switch (this.difficulty()) {
      case 0: return 'Lis la poésie plusieurs fois pour bien la découvrir.';
      case 1: return 'Des petits mots se sont cachés. Essaie de les deviner en lisant !';
      case 2: return 'Il manque beaucoup de mots maintenant. Peux-tu retrouver le texte ?';
      case 3: return 'Tu ne vois que la première lettre de chaque mot. C\'est le moment de réciter !';
      case 4: return 'Tout est caché ! Récite ta poésie comme un grand.';
      default: return '';
    }
  }
}
