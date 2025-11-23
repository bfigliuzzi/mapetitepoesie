import { Component, computed, input, signal } from '@angular/core';
import { Word } from '../../core/models/poem.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-word-token',
  imports: [NgClass],
  template: `
    <span
      class="word-token"
      [ngClass]="{
        'hidden-word': isHidden(),
        'initial-only': isInitialOnly(),
        'revealed': isRevealed()
      }"
      (click)="reveal()"
      [attr.aria-label]="word().text"
      role="button"
      tabindex="0"
      (keydown.enter)="reveal()"
      (keydown.space)="reveal()"
    >
      @if (isRevealed() || !isHidden()) {
        {{ word().text }}
      } @else if (isInitialOnly()) {
        {{ word().text.charAt(0) }}{{ getPlaceholder(word().text.length - 1) }}
      } @else {
        {{ getPlaceholder(word().text.length) }}
      }
    </span>
  `,
  styles: [`
    .word-token {
      display: inline-block;
      margin: 0 4px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: 'Roboto', sans-serif;
      font-size: 1.2rem;
      min-width: 1em;
      text-align: center;
      padding: 2px 4px;
      border-radius: 4px;
    }

    .hidden-word {
      color: transparent;
      background-color: #e0e0e0;
      border-radius: 4px;
      border-bottom: none;
      box-shadow: inset 0 0 4px rgba(0,0,0,0.1);
    }

    .initial-only {
      color: #2c3e50;
      letter-spacing: 2px;
    }
    
    .revealed {
      color: #2c3e50 !important;
      background-color: #fff3cd !important; /* Highlight revealed words */
      animation: fadeOutHighlight 1s forwards 1s;
    }

    @keyframes fadeOutHighlight {
      to {
        background-color: transparent;
      }
    }
  `]
})
export class WordTokenComponent {
  readonly word = input.required<Word>();
  readonly difficulty = input.required<number>();
  
  // Temporary reveal state
  readonly isRevealed = signal(false);

  readonly isHidden = computed(() => {
    const d = this.difficulty();
    if (d === 0) return false;
    if (d === 4) return true;
    
    return this.word().isHidden; 
  });

  readonly isInitialOnly = computed(() => {
    return this.difficulty() === 3;
  });

  getPlaceholder(length: number): string {
    return '_'.repeat(length);
  }

  reveal() {
    if (this.isHidden() || this.isInitialOnly()) {
      this.isRevealed.set(true);
      setTimeout(() => this.isRevealed.set(false), 1500); // Auto-hide after 1.5s
    }
  }
}
