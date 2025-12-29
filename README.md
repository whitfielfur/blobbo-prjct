# blobbo

[View Live Demo](https://blobbo-prjct-vercel.vercel.app/)

## The XML Documentation Engine (DocEngine.tsx)

The core of this project is a proprietary rendering engine. It utilizes the native browser DOMParser API to transform XML-structured data into optimized React components.

### Core Architecture
*   **Native Parsing:** Uses DOMParser for high-speed XML tree construction without external dependencies.
*   **Recursive Mapping:** A specialized traversal algorithm maps XML nodes to memoized Tailwind-styled components.
*   **Performance Layer:** 
    *   **Global Caching:** A Map-based cache stores parsed documents to eliminate redundant parsing operations.
    *   **Component Memoization:** All rendered blocks (Cards, Tabs, Commands) are wrapped in React.memo to prevent unnecessary re-renders during navigation.

### Supported Markup Tags
The engine processes a wide range of custom tags defined in docsContent.ts:

| Category | Tags |
| :--- | :--- |
| **Structure** | section, grid, col, separator |
| **Typography** | h1, h2, h3, p, quote, b, i, kbd, badge, link |
| **Tech/API** | cmd, usage, param, codeblock, api |
| **Interactive** | tabs, tab, details, tooltip |
| **UI/Alerts** | alert (info/warn/danger/success), card, step |
| **Media** | img (avif support), video |

### Content Workflow
Documentation is managed via the DOCS_XML constant in src/data/docsContent.ts. The engine automatically handles:
1. XML syntax validation and error reporting.
2. Metadata extraction for sidebar navigation.
3. Synchronized rendering with scroll-into-view support.

## Design Systems

The visual identity of Blobbo is built on a minimalist dark aesthetic, emphasizing data clarity and fluid user interactions.

### Aesthetics
*   **Visual Style:** Modern Dark interface utilizing a deep charcoal palette with orange accents.
*   **Glassmorphism:** Extensive use of backdrop-blur filters and translucent border-stroke (white/5) to create depth without visual clutter.
*   **Ambient Lighting:** Dynamic background gradients and blurred radial overlays.

### Typography
*   **Primary UI/Headings:** Geist Sans -- chosen for its high legibility and geometric precision in technical interfaces.
*   **Technical/Data:** Geist Mono -- used for command outputs, API endpoints, and code blocks.

## Performance Optimizations

*   **Code Splitting:** Implementation of React.lazy and Suspense for Documentation and Premium modules, significantly reducing the initial bundle size.
*   **GPU Acceleration:** Integrated will-change properties for background animations to offload rendering tasks to the hardware.
*   **Next-Gen Assets:** Migration to AVIF image format, optimizing the Largest Contentful Paint (LCP) and reducing payload weight.

## Tech Stack

*   **Framework:** React 19
*   **Build Tool:** Vite
*   **Language:** TypeScript
*   **Animations:** Framer Motion
*   **Styling:** Tailwind CSS V4.1
*   **Icons:** Lucide React
*   **Deployment:** Vercel (CI/CD)