> **Note:** This project serves as a technical showcase for my portfolio.

### 🔗 [View Live Demo](https://blobbo-prjct-vercel.vercel.app/)

## Technical Highlights

The core of this project is the custom parsing engine located in `src/lib/DocEngine.tsx`.

*   **Custom XML Parser:** Instead of using heavy Markdown libraries, I implemented a parser using the native browser `DOMParser` API.
*   **Optimization:** Heavy parsing operations are wrapped in `useMemo` hooks. This ensures the UI remains responsive and prevents unnecessary re-renders when navigating between tabs.
*   **Dynamic Routing:** The application reads the configuration file and automatically generates the sidebar navigation and routes.

## Key Features

*   **Rich Text Rendering:** Supports custom tags like `<warning>`, `<info>`, and `<code-block>` designed specifically for technical documentation.
*   **Responsive Design:** Fully adaptive layout for mobile and desktop devices.
*   **Type Safety:** Strict TypeScript configuration for better maintainability.

## Tech Stack

*   **Core:** React 18, TypeScript, Vite
*   **Styling:** Styled-Components (CSS-in-JS)
*   **Deployment:** Vercel (CI/CD)
