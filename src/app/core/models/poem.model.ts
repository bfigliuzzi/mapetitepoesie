export interface Word {
  id: string;
  text: string;
  cleanText: string; // Text without punctuation for checking
  isHidden: boolean;
  isFirstLetter: boolean; // For difficulty level 3
}

export interface Line {
  id: string;
  words: Word[];
}

export interface Stanza {
  id: string;
  lines: Line[];
}

export interface Poem {
  id: string;
  title: string;
  stanzas: Stanza[];
  originalText: string;
  createdAt: number;
  lastDifficulty?: number;
}
