# Prompt Architect v2.1

**Prompt Architect** is an advanced AI image prompt generator designed to help you craft precise, high-quality prompts for tools like Midjourney, Stable Diffusion, and DALL-E.

It goes beyond simple descriptions, offering deep customization for artistic styles, camera settings, lighting, and now **document & layout design**.

## ✨ Features

### 🎨 Comprehensive Prompt Building
*   **Core Aesthetics:** Select from extensive lists of mediums (Oil on Canvas, 3D Render), styles (Cyberpunk, Surrealism), and artist references.
*   **Lighting & Atmosphere:** Control the mood with specific lighting types (Volumetric Fog, Golden Hour), time of day, and seasons.
*   **Camera & Technical:** Define the visual look with camera models, lenses, aspect ratios, and resolution settings.

### 📰 **NEW: Design & Layout Support**
Create detailed prompts for specific document types and commercial designs:
*   **Document Types:** Vintage Newspaper, Tabloid Front Page, Movie Poster, Magazine Ad, etc.
*   **Typography:** Specify font styles like "Bold Sans-Serif", "Neon Signage", or "Retro 50s Script".
*   **Era / Aesthetic:** Target specific time periods like "1920s Art Deco", "1950s Americana", or "Y2K Aesthetic".
*   **Material:** Define the texture of the medium (Yellowed Newsprint, Crumpled Paper, Holographic Foil).
*   **Advanced Composition:** New layouts including "Grid Layout", "Infographic Style", and "Knolling".

### 🤖 AI "Magic Polish"
*   Integrates with Google's **Gemini API** to intelligently rewrite and enhance your raw prompts.
*   Adds descriptive adjectives and vivid details automatically.
*   (Requires a valid API key).

### 🛠 Utilities
*   **Multi-Format Export:** View and copy your configuration in JSON, YAML, or XML.
*   **Randomizers:** "Feeling lucky?" Randomize individual fields or the entire prompt for inspiration.
*   **One-Click Copy:** Easily copy the compiled text prompt or the structured data.

## 🚀 Getting Started

### Prerequisites
*   Node.js (v14 or higher)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/deva-hari/prompt-architect.git
    cd prompt-architect
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser at `http://localhost:5173` (or the port shown in your terminal).

## 🔑 API Configuration (Optional)

To use the **Magic Polish** feature:
1.  Click the **Settings** (Cpu/Gear icon) button in the top right.
2.  Enter your Google Gemini API Key.
3.  Select your preferred model (e.g., `gemini-2.5-flash`).
4.  The key is stored locally in your browser (`localStorage`).

## 🛠 Built With
*   [React](https://react.dev/) - UI Library
*   [Vite](https://vitejs.dev/) - Build tool
*   [Tailwind CSS](https://tailwindcss.com/) - Styling
*   [Lucide React](https://lucide.dev/) - Icons
*   [Google Gemini API](https://ai.google.dev/) - AI Text Enhancement

## 📄 License
This project is open source and available under the [MIT License](LICENSE).