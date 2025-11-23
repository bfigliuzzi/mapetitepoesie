import { Injectable, signal } from '@angular/core';
import { Poem, Stanza, Word, Line } from '../models/poem.model';

@Injectable({
  providedIn: 'root',
})
export class PoemService {
  private readonly STORAGE_KEY = 'ma-petite-poesie-poems';
  readonly poems = signal<Poem[]>(this.loadPoems());

  savePoem(title: string, text: string): void {
    const newPoem: Poem = this.parseText(title, text);
    const currentPoems = this.poems();
    const updatedPoems = [...currentPoems, newPoem];
    this.poems.set(updatedPoems);
    this.persistPoems(updatedPoems);
  }

  getPoem(id: string): Poem | undefined {
    return this.poems().find((p) => p.id === id);
  }

  deletePoem(id: string): void {
    const updatedPoems = this.poems().filter((p) => p.id !== id);
    this.poems.set(updatedPoems);
    this.persistPoems(updatedPoems);
  }

  updatePoemDifficulty(id: string, difficulty: number): void {
    const currentPoems = this.poems();
    const updatedPoems = currentPoems.map(p => 
      p.id === id ? { ...p, lastDifficulty: difficulty } : p
    );
    this.poems.set(updatedPoems);
    this.persistPoems(updatedPoems);
  }

  updatePoemContent(id: string, title: string, text: string): void {
    const newStructure = this.parseText(title, text);
    const currentPoems = this.poems();
    const updatedPoems = currentPoems.map(p => {
      if (p.id === id) {
        return {
          ...newStructure,
          id: p.id, // Keep original ID
          createdAt: p.createdAt, // Keep original creation date
          lastDifficulty: p.lastDifficulty // Keep difficulty preference
        };
      }
      return p;
    });
    this.poems.set(updatedPoems);
    this.persistPoems(updatedPoems);
  }

  private loadPoems(): Poem[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private persistPoems(poems: Poem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(poems));
  }

  private parseText(title: string, text: string): Poem {
    const stanzas: Stanza[] = text
      .split(/\n\s*\n/) // Split by double newline for stanzas
      .filter((s) => s.trim().length > 0)
      .map((stanzaText, sIndex) => {
        const lines: Line[] = stanzaText
          .split(/\n/) // Split by newline for lines
          .map((lineText, lIndex) => {
            const words: Word[] = lineText
              .trim()
              .split(/\s+/) // Split by whitespace for words
              .filter((w) => w.length > 0)
              .map((wordText, wIndex) => ({
                id: `s${sIndex}-l${lIndex}-w${wIndex}`,
                text: wordText,
                cleanText: wordText.replace(/[^\w\u00C0-\u00FF]/g, ''),
                isHidden: false,
                isFirstLetter: false,
              }));
            return {
              id: `s${sIndex}-l${lIndex}`,
              words,
            };
          });

        return {
          id: `s${sIndex}`,
          lines,
        };
      });

    return {
      id: crypto.randomUUID(),
      title,
      originalText: text,
      stanzas,
      createdAt: Date.now(),
    };
  }
}
