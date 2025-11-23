# Ma Petite Poésie

"Ma Petite Poésie" is a Progressive Web App (PWA) designed to help children learn poems by heart. It digitizes classic classroom memorization techniques, offering a fun and autonomous way to practice.

## 🌟 Features

*   **Progressive Learning**:
    *   **Level 0**: Full text reading.
    *   **Level 1 (Gruyère)**: Hides ~25% of words, prioritizing short words and articles.
    *   **Level 2 (Damier)**: Hides 50% of words (checkerboard pattern).
    *   **Level 3 (Initials)**: Displays only the first letter of each word.
    *   **Level 4 (Recitation)**: All words are hidden.
*   **Interactive Hints**: Click on any hidden word to reveal it momentarily.
*   **Privacy First**: **Zero-Knowledge Architecture**. All data (poems, progress) is stored locally in the browser (`LocalStorage`). No data is sent to any server.
*   **Offline Ready**: Works offline as a PWA.
*   **Custom Poems**: Add and edit your own poems.

## 🛠️ Tech Stack

*   **Framework**: Angular 21 (Zoneless, Signals)
*   **UI Library**: Angular Material 3
*   **Styling**: CSS (Material Design)
*   **Testing**: Vitest
*   **Build Tool**: Angular CLI (Esbuild)

## 🚀 Getting Started

### Prerequisites

*   Node.js (Latest LTS recommended)
*   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/bfigliuzzi/mapetitepoesie.git
    cd mapetitepoesie
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Development Server

Run the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

Run unit tests with Vitest:

```bash
npm test
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
